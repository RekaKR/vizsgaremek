const express = require("express")
const app = express()

const cors = require('cors')


//MIDDLEWARES
app.use(express.urlencoded({ extended: false })) //parse requests of content-type - application/x-www-form-urlencoded
app.use(express.json()) //parse requests of content-type - application/json
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))

//ROUTES
const accommodationRoutes = require('./routes/accommodationRoutes')
const timelineRoutes = require('./routes/timelineRoutes')
const toDoRoutes = require('./routes/toDoRoutes')
const loginRoutes = require('./routes/loginRoutes')
const emailListRoutes = require('./routes/emailListRoutes')
const userRoutes = require('./routes/userRoutes')

app.use('/accommodation', accommodationRoutes)
app.use('/timeline', timelineRoutes)
app.use('/to-do-list', toDoRoutes)
app.use('/login', loginRoutes)
app.use('/emaillist', emailListRoutes)
app.use('/user', userRoutes)


module.exports = app