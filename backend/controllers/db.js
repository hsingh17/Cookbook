const bcrypt = require('bcryptjs')
const { Pool } = require('pg')

// Set up the pool (https://node-postgres.com/features/pooling)
const pool = new Pool({
    user        :   'postgres',
    host        :   'localhost',
    database    :   'COOKBOOK_DB',
    password    :   'nice_password',
    port        :   '5432'   
})

const create_user = async (req, res, _) => {
    const today = new Date()
    const username = req.body.user
    const password = req.body.pass
    
    try {
        const user = await pool.query(  // Check to see if username is duplicate
            'SELECT name FROM users where name = $1', 
            [username]
        )

        if (user.rows.length !== 0) {    // User with that name already exists 
            res.status(409).send()
            return 
        }

        // https://www.npmjs.com/package/bcryptjs
        const salt = await bcrypt.genSalt(10)
        const hashed_pass = await bcrypt.hash(password, salt)

        await pool.query(   // Insert new user into the DB
            'INSERT INTO users(name, password, salt, date_created) VALUES($1, $2, $3, $4);',
            [username, hashed_pass, salt, today.toISOString()]
        )
    } catch (err) {
        console.log(err)
    }

    res.status(200).send()
}

const get_user = async (req, res, _) => {
    const username = req.query.user
    const password = req.query.pass
    
    try {
        const user = await pool.query( 
            'SELECT password FROM users WHERE name = $1',
            [username]
        )   // Get the user with this username
        
        if (user.rows.length === 0) {   // No user with that name exists
            res.status(404).send()
            return
        }

        const hash = user.rows[0].password
        const match = await bcrypt.compare(password, hash)
        if (!match) {
            res.status(404).send()
            return
        }
    } catch (err) {
        console.log(err)
    }

    res.status(200).send()
}

module.exports = {
    create_user,
    get_user
}