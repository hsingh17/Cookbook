const express = require('express')
const router = express.Router()
const filter_controller = require('../controllers/filter')

/*
GET (/api/filter?f=): 
    PURPOSE
            Return meals filtered by optional query param 
    QUERY PARAMS
            f = {
                'a' = filter meals by area, 
                'c' = filter meals by category,
                }             
                If not 'a' or 'c' default to ABC order
    PATH PARAMS
            None
*/
router.get('/', filter_controller.filter_meals) 
module.exports = router