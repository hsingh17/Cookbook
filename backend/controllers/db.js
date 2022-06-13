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
    const today = new Date()
    const username = req.body.user
    const password = req.body.pass

    try {
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
    } catch (err) {
        console.log(err)
        res.status(500).send()
        return
    }

    res.status(200).send()
}

const login_user = async (req, res, _) => {
    const username = req.query.user
    const password = req.query.pass
    const session_id = crypto.randomBytes(18).toString('base64') // 18 bytes so no padding when going to base64

    try {
        const user = await pool.query( 
            'SELECT password, id FROM users WHERE name = $1',
            [username]
        )   // Get the user with this username
        
        if (user.rows.length === 0) {   // No user with that name exists
            res.status(404).send()
            return
        }
        
        const hash = user.rows[0].password
        const user_id = user.rows[0].id

        const match = await bcrypt.compare(password, hash)
        if (!match) {
            res.status(404).send()
            return
        }
                
        // Add user to session table
        await pool.query(
            'INSERT INTO sessions(user_id, session_id) VALUES($1, $2);', 
            [user_id, session_id]
        )
    } catch (err) {
        console.log(err)
        res.status(500).send()
        return
    }
    
    // Send cookie back with sessionID
    res
        .status(200)
        .cookie('sessionID', session_id, {
            sameSite: 'Strict'
        })
        .send()
}

const user_in_fav = async user_id => {
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
}

const user_from_session = async cookie => {
    const session_cookie = cookie.split('; ').find(e => e.includes('sessionID'))
    const session_id = session_cookie.split('=')[1]
    const response = await pool.query(  // Get user_id associated with this session
        'SELECT user_id FROM sessions WHERE session_id = $1',
        [session_id]
    )

    return response.rows[0].user_id
}

const add_favorite = async (req, res, _) => {
    const meal_id = req.body.meal_id
    const user_id = await user_from_session(req.headers.cookie)

    user_in_fav(user_id)   // Insert user into favorites if not in there

    await pool.query(   // Add new favorite meal to user's favorite meals
        'UPDATE favorites SET meals = array_append(meals, $1) WHERE user_id = $2',
        [Number(meal_id), user_id]
    )

    res.status(200).send()
}

const get_favorite = async (req, res, _) => {
    const user_id = await user_from_session(req.headers.cookie)
    const response = await pool.query(
        'SELECT meals FROM favorites WHERE user_id = $1',
        [user_id]
    )
    const meals = response.rows[0]
    res
        .json(meals)
        .status(200)
}

module.exports = {
    create_user,
    login_user,
    add_favorite,
    get_favorite
}