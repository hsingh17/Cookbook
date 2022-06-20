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
GET (/db/users?user=&pass=): 
    PURPOSE
            Confirm if a user is in the db
    QUERY PARAMS
            user: user's name
            pass: password of user
    PATH PARAMS
            NONE
*/
router.get('/users', db_controller.login_user)

/*
DELETE (/db/users): 
    PURPOSE
            Log a user out by deleting their cookie and session 
    QUERY PARAMS
           None
    PATH PARAMS
            NONE
*/
router.delete('/users', db_controller.logout_user)

/*
POST (/db/favorites): 
    PURPOSE
            Add a favorite meal to a user
    QUERY PARAMS
           
    PATH PARAMS
            NONE
*/
router.post('/favorites', db_controller.add_favorite)


/*
GET (/db/favorites): 
    PURPOSE
            Get favorite meals for a user
    QUERY PARAMS
           None
    PATH PARAMS
            NONE
*/
router.get('/favorites', db_controller.get_favorite)


/*
DELETE (/db/favorites): 
    PURPOSE
            Delete from user's favorite meals
    QUERY PARAMS
           None
    PATH PARAMS
            NONE
*/
router.delete('/favorites', db_controller.delete_favorites)

module.exports = router