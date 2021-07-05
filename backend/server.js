const express = require("express")
const app = express()

const cors = require('cors')

//const fetch = require('node-fetch')

require('dotenv').config()
const PORT = process.env.PORT || 3001 //.env-ben másik portot megadni!
const MONGO_CONNECTION = process.env.MONGO_CONNECTION
//const apiKey = process.env.API_KEY

const mongoose = require('mongoose')


//MIDDLEWARES
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))

//ROUTES
app.get('/', (req, res) => {
  res.send('We are on home')
})

const apiRoute = require('./routes/apiRoute')
const accommodationRoute = require('./routes/accommodationRoute')
const timelineRoute = require('./routes/timelineRoute')


//ROUTES MIDDLEWARES
app.use('/api', (req, res, next) => {
  console.log('This is a middleware running')
  next()
})
app.use('/api', apiRoute)

app.use('/admin-accommodation', accommodationRoute)
app.use('/timeline', timelineRoute)


//DATABASE CONNECTION
mongoose.connect(`${MONGO_CONNECTION}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
},
  () => {
    console.log('Mongo db is connected')
  }
)


//LISTEN
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})