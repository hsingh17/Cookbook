const fetch = require('node-fetch')
const URL = 'https://www.themealdb.com/api/json/v1/1/'

/*
    FUNCTION: 
            filter_meals
    PURPOSE:
            Filter meals based on query param (ABC, area, or category) and send a JSON response
*/
const filter_meals = async (req, res, next) => {
    const filter_type = req.query.f
    const valid_filter = (filter_type == 'a' || filter_type == 'c')
    let meals = {}, filters = {}
    
    // If we're filtering by the area or category, then we need to get those filters from API
    if (valid_filter) {
        const response = await fetch(`${URL}list.php?${filter_type}=list`)
        const data = await response.json()
        filters = data.meals.map(e => {
            return Object.values(e)[0]
        })
    } else {
        filters = Array.from(Array(26), (e,i) => {       
            return String.fromCharCode('a'.charCodeAt()+i)
        })
    }
    filters.forEach(e => meals[e] = '')
    
    // Rather than doing a for loop and running fetches in series,
    // Execute requests in parallel to complete job faster.
    // .map function lets us run each fetch in parallel
    await Promise.all(Object.keys(meals).map(async filter  => {
        const search = (valid_filter) ? `filter.php?${filter_type}=${filter}` : `search.php?f=${filter}`
        const response = await fetch(`${URL}/${search}`)
        const data = await response.json()
        meals[filter] = data
    }))

    res.json(meals)
}

module.exports = {
    filter_meals
}