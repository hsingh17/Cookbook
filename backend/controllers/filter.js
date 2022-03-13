const fetch = require('node-fetch')
const URL = 'https://www.themealdb.com/api/json/v1/1/'
const CATEGORIES = [
        'Beef',
        'Breakfast',
        'Chicken',
        'Dessert',
        'Goat',
        'Lamb',
        'Miscellaneous',
        'Pasta',
        'Pork',
        'Seafood',
        'Side',
        'Starter',
        'Vegan',
        'Vegetarian'
    ]
const AREAS = [
        'American',
        'British',
        'Canadian',
        'Chinese',
        'Croatian',
        'Dutch',
        'Egyptian',
        'French',
        'Greek',
        'Indian',
        'Irish',
        'Italian',
        'Jamaican',
        'Japanese',
        'Kenyan',
        'Malaysian',
        'Mexican',
        'Moroccan',
        'Polish',
        'Portuguese',
        'Russian',
        'Spanish',
        'Thai',
        'Tunisian',
        'Turkish',
        'Unknown',
        'Vietnamese'
    ]
/*
    FUNCTION: 
            filter_meals
    PURPOSE:
            Filter meals based on query param (ABC, area, or category) and send a JSON response
*/
const filter_meals = async (req, res, _) => {
    const filter_type = req.query.f
    const valid_filter = (filter_type == 'a' || filter_type == 'c')
    let meals = {}, filters = []
    
    if (valid_filter) {
        if (filter_type == 'a') { filters = AREAS }
        else { filters = CATEGORIES }
    } else {
        filters = Array.from(Array(26), (_, i) => {       
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
    res.status(200).json(meals)
}

module.exports = {
    filter_meals
}