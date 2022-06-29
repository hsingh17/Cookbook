require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')

const PORT = process.env.PORT || 5000  
const random_route = require('./routes/random')
const search_route = require('./routes/search')
const filter_route = require('./routes/filter')
const db_route = require('./routes/db')

if (process.env.NODE_ENV === 'production') {    // For production, we need to serve build folder
    app.use(express.static('../frontend/build'))
    app.get('/', (req, res) => {
        res.sendFile('../frontend/build/index.html')
    })
}

app.use(cors({
    origin: (process.env.NODE_ENV === 'development') ? process.env.URL_DEV : process.env.URL_PROD,    // Need to specify exact origin when allowing credentials
    credentials: true,  // https://stackoverflow.com/questions/24687313/what-exactly-does-the-access-control-allow-credentials-header-do
}))


app.use(express.urlencoded({
    extended : true
})) // https://flaviocopes.com/express-forms/
app.use(express.json())

// Mount middleware at following router paths
app.use('/api/random', random_route)
app.use('/api/search', search_route)
app.use('/api/filter', filter_route)
app.use('/db', db_route)

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})