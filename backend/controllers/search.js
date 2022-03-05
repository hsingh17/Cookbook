const fetch = require('node-fetch')
const URL = 'https://www.themealdb.com/api/json/v1/1/'

/*
    FUNCTION: 
            search_meal
    PURPOSE:
            Search for a meal based on its name or id and send a JSON response
*/
const search_meal = async (req, res, next) => {
    const search_type = req.query.type
    const meal = (search_type == 's') ?  req.query.name : req.query.id
    const api_path = (search_type == 's') ? 'search' : 'lookup'
    const response = await fetch(`${URL}${api_path}.php?${search_type}=${meal}`)
    const data = await response.json()
    res.json(data)
}

module.exports = {
    search_meal
}