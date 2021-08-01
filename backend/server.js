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
const goodWishRoutes = require('./routes/goodWishRoutes')

app.use('/api/accommodation', accommodationRoutes)
app.use('/api/timeline', timelineRoutes)
app.use('/api/to-do-list', toDoRoutes)
app.use('/api/login', loginRoutes)
app.use('/api/emaillist', emailListRoutes)
app.use('/api/user', userRoutes)
app.use('/api/good-wish', goodWishRoutes)


module.exports = app