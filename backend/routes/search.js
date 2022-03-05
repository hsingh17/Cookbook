const express = require('express')
const router = express.Router()
const search_controller = require('../controllers/search')


/*
GET (/api/search?name=''&id=''&type=''): 
    PURPOSE
            Search for a meal based on its name or id
    QUERY PARAMS
            type = {
                    'name' = name of  meal,
                    'id' = id of meal,
                    'type' = {
                            'i' = search by id
                            's' = search by name
                        } 
                }
    PATH PARAMS
            None
*/
router.get('/', search_controller.search_meal)

module.exports = router