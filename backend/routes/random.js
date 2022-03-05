const express = require('express')
const router = express.Router()
const random_controller = require('../controllers/random')

/*
GET (/api/random/): 
    PURPOSE
            Return a random meal 
    QUERY PARAMS
            None 
    PATH PARAMS
            None        
*/
router.get('/', random_controller.get_random_meal)
module.exports = router