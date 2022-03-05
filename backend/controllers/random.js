const fetch = require('node-fetch')
const URL = 'https://www.themealdb.com/api/json/v1/1/'

/*
    FUNCTION: 
            get_random_meal
    PURPOSE:
            Fetch a random meal from the API and send a JSON response
*/
const get_random_meal = async (req, res, next) => {
    const response = await fetch(`${URL}random.php`)
    const data = await response.json()
    res.json(data)
}

module.exports = {
    get_random_meal
}