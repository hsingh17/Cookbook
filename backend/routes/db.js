const express = require('express')
const router = express.Router()
const db_controller = require('../controllers/db')

/*
POST (/db/users): 
    PURPOSE
            Create a new user if not already created 
    QUERY PARAMS

    PATH PARAMS
            NONE
*/
router.post('/users', db_controller.create_user)

/*
GET (/db/users): 
    PURPOSE
            Confirm if a user is in the db
    QUERY PARAMS

    PATH PARAMS
            NONE
*/
router.get('/users', db_controller.get_user)

module.exports = router