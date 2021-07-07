const express = require("express")
const app = express()

const cors = require('cors')
//const fetch = require('node-fetch')
const mongoose = require('mongoose')

require('dotenv').config()
const PORT = process.env.PORT || 3001 //.env-ben másik portot megadni!
const MONGO_CONNECTION = process.env.MONGO_CONNECTION


//DATABASE CONNECTION
mongoose.connect(`${MONGO_CONNECTION}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //useFindAndModify: false -check if it is needed or not
})


//MIDDLEWARES
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))


//ROUTES
const apiRoutes = require('./routes/apiRoutes')
const accommodationRoutes = require('./routes/accommodationRoutes')
const timelineRoutes = require('./routes/timelineRoutes')


//ROUTES MIDDLEWARES
app.use('/api', (req, res, next) => {
  console.log('This is a middleware running')
  next()
})
app.use('/api', apiRoutes)

app.use('/accommodation', accommodationRoutes)
app.use('/timeline', timelineRoutes)


//LISTEN
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})