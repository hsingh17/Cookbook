const crypto = require('crypto')
const bcrypt = require('bcryptjs')
const { Pool } = require('pg')

// Set up the pool (https://node-postgres.com/features/pooling)
const pool = new Pool({
    user        :   process.env.DB_USER,
    host        :   (process.env.NODE_ENV === 'developement') ? 
                    process.env.DB_HOST_DEV : process.env.DB_HOST_PROD,
    database    :   process.env.DB_NAME,
    password    :   process.env.DB_PASSWORD,
    port        :   process.env.DB_PORT 
})

const create_user = async (req, res, _) => {
    try {
        const today = new Date()
        const username = req.body.user
        const password = req.body.pass
        const user = await pool.query(  // Check to see if username is duplicate
            'SELECT name FROM users WHERE name = $1', 
            [username]
        )

        if (user.rows.length !== 0) {    // User with that name already exists 
            res.status(409).send()
            return 
        }

        // https://www.npmjs.com/package/bcryptjs
        const salt = await bcrypt.genSalt(10)
        const hashed_pass = await bcrypt.hash(password, salt)

        await pool.query(   // Insert new user into the users table
            'INSERT INTO users(name, password, salt, date_created) VALUES($1, $2, $3, $4);',
            [username, hashed_pass, salt, today.toISOString()]
        )

        res.status(200).send()
    } catch (err) {
        console.log(err)
        return res.status(500).send()
    }

}

const login_user = async (req, res, _) => {
    try {
        const username = req.query.user
        const password = req.query.pass
        const session_id = crypto.randomBytes(18).toString('base64url') // 18 bytes so no padding when going to base64
        const user = await pool.query( 
            'SELECT password, id FROM users WHERE name = $1',
            [username]
        )   // Get the user with this username
        
        if (user.rows.length === 0) {   // No user with that name exists
            return res.status(404).send()
        }
        
        const hash = user.rows[0].password
        const user_id = user.rows[0].id

        const match = await bcrypt.compare(password, hash)
        if (!match) {
            return res.status(404).send()
        }
                
        // Add user to session table
        await pool.query(
            'INSERT INTO sessions(user_id, session_id) VALUES($1, $2);', 
            [user_id, session_id]
        )

        // Send cookie back with sessionID
        res
            .status(200)
            .cookie('sessionID', session_id, {
                sameSite : 'Strict'
            })
            .send()
    } catch (err) {
        console.log(err)
        return res.status(500).send()
    }
    
}

const logout_user = async (req, res, _) => {
    try {
        const user_id = await user_from_session(req.headers.cookie)
        await pool.query(
            'DELETE FROM sessions * WHERE user_id = $1',
            [user_id]
        )   // Remove user from session table

        res
            .clearCookie('sessionID', {
                sameSite : 'Strict'
            })   // clear out the sessionID cookie
            .status(205)    // 205 = refresh page
            .send()
    } catch (err) {
        console.error(err)
        return res.status(500).send()
    }
}

const user_in_fav = async user_id => {
    try {
        const response = await pool.query(
            'SELECT user_id FROM favorites WHERE user_id = $1',
            [user_id]
        )
        
        if (response.rows.length === 0) {   // User is not in favorites table
            await pool.query(   // Add user to favorites table
                'INSERT INTO favorites(user_id) VALUES($1)',
                [user_id]
            )
        }
    } catch (err) {
        throw err
    }
}

const meal_in_fav = async meal_id => {
    try {
        const response = await pool.query(
            'SELECT meal FROM favorite_meals WHERE meal = $1',
            [meal_id]
        )
        
        if (response.rows.length === 0) {   // Meal is not in favorites table
            await pool.query(   // Add meal to favorites table
                'INSERT INTO favorite_meals(meal) VALUES($1)',
                [meal_id]
            )
        }
    } catch (err) {
        throw err
    }
}

const user_from_session = async cookie => {
    try {
        const session_cookie = cookie.split('; ').find(e => e.includes('sessionID'))
        const session_id = session_cookie.split('=')[1]
        const response = await pool.query(  // Get user_id associated with this session
            'SELECT user_id FROM sessions WHERE session_id = $1',
            [session_id]
        )
    
        return response.rows[0].user_id
    } catch (err) {
        throw err
    }
}

const add_favorite = async (req, res, _) => {
    const client = await pool.connect()
    try {
        const meal_id = Number(req.body.meal_id)
        const user_id = await user_from_session(req.headers.cookie)

        await client.query('BEGIN')
        const response = await client.query(    // Check if meal already favorited by user
            'SELECT * FROM FAVORITES WHERE user_id = $1 and $2 = ANY(meals)',
            [user_id, meal_id]
        )
        
        if (response.rows.length !== 0) {   // Meal already favorited
            res.status(409).send()
            return
        }
        
        await user_in_fav(user_id)   // Insert user into favorites if not in there
    
        await client.query(   // Add new favorite meal to user's favorite meals
            'UPDATE favorites SET meals = array_append(meals, $1) WHERE user_id = $2',
            [meal_id, user_id]
        )


        await meal_in_fav(meal_id)    // Insert meal into favorite's counter table if not there

        await client.query (    // Update this meal's favorite counter
            'UPDATE favorite_meals SET fav_cnt = fav_cnt + 1 WHERE meal = $1',
            [meal_id]
        )
        
        await client.query('COMMIT')
        res.status(200).send()
    } catch (err) {
        await client.query('ROLLBACK')
        console.error(err)
        return res.status(500).send()
    } finally {
        client.release()
    }
}

const get_favorite = async (req, res, _) => {
    try {
        const user_id = await user_from_session(req.headers.cookie)
        // https://dba.stackexchange.com/questions/226456/how-can-i-get-a-unique-array-in-postgresql
        const response = await pool.query(
            'SELECT meals FROM favorites WHERE user_id = $1',
            [user_id]
        )
        
        let meals = response.rows[0]
        if (meals === undefined) {  // In case user has no favorited meals yet
            meals = { meals : [] }
        }
        res
            .json(meals)
            .status(200)
    } catch (err) {
        console.error(err)
        return res.status(500).send()
    }
}

const delete_favorites = async (req, res, _) => {
    const client = await pool.connect()
    try {
        const user_id = await user_from_session(req.headers.cookie)
        const delete_meals = Array.from(req.body.meals).map(id => Number(id))
        
        await client.query('BEGIN')
        const response = await client.query(
            'SELECT ARRAY(SELECT meals FROM (SELECT UNNEST(meals) AS meals FROM favorites WHERE user_id = $1) AS meal_row WHERE meals <> ALL($2)) AS meals;',
            [user_id, delete_meals]
        )
    
        const updated_meals = response.rows[0]
        await client.query(   // Update user's favorite meals post-deletion
            'UPDATE favorites SET meals = $1 WHERE user_id = $2',
            [updated_meals.meals, user_id]
        )

        await Promise.all(delete_meals.map(async meal => {
            await client.query(
                'UPDATE favorite_meals SET fav_cnt = fav_cnt - 1 WHERE meal = $1',
                [meal]
            )
        }))
        
        await client.query('COMMIT')

        res
            .json(updated_meals)
            .status(200)
    } catch (err) {
        await client.query('ROLLBACK')
        console.error(err)
        return res.status(500).send()
    } finally {
        client.release()
    }
}

const get_meal_fav_cnt = async (req, res, _) => {
    try {
        const meal_id = Number(req.query.meal_id)
        const response = await pool.query(
            'SELECT fav_cnt FROM favorite_meals WHERE meal = $1',
            [meal_id]
        )
        
        const ret = (response.rows[0] === undefined) ? { fav_cnt : 0 } : (response.rows[0])

        res
            .status(200)
            .json(ret)
    } catch (err) {
        console.error(err)
        return res.status(500).send()
    }
}

module.exports = {
    create_user,
    login_user,
    logout_user,
    add_favorite,
    get_favorite,
    delete_favorites,
    get_meal_fav_cnt
}