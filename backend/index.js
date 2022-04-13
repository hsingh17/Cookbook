const express = require('express')
const app = express()
const cors = require('cors')

const PORT = process.env.PORT || 5000  
const random_route = require('./routes/random')
const search_route = require('./routes/search')
const filter_route = require('./routes/filter')
const db_route = require('./routes/db')


app.use(cors())
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