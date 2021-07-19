const express = require("express")
const app = express()

const cors = require('cors')
//require('dotenv').config()


//MIDDLEWARES
app.use(express.urlencoded({ extended: false })) //parse requests of content-type - application/x-www-form-urlencoded
app.use(express.json()) //parse requests of content-type - application/json
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))


//ROUTES
const apiRoutes = require('./routes/apiRoutes')
const accommodationRoutes = require('./routes/accommodationRoutes')
const timelineRoutes = require('./routes/timelineRoutes')
const toDoRoutes = require('./routes/toDoRoutes')
/*
app.use('/api', (req, res, next) => {
  console.log('This is a middleware running')
  next()
})
app.use('/api', apiRoutes)
*/
app.use('/accommodation', accommodationRoutes)
app.use('/timeline', timelineRoutes)
app.use('/to-do-list', toDoRoutes)


module.exports = app