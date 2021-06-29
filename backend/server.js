const express = require("express")
const cors = require('cors')
const app = express()
//const fetch = require('node-fetch')
require('dotenv').config()

//.env-ben másik portot megadni!
const PORT = process.env.PORT || 3001
const MONGO_LINK = process.env.MONGO_LINK
//const apiKey = process.env.API_KEY


const mongoose = require('mongoose')
const Data = require('./schema')

//Mongo connect
mongoose.connect(`${MONGO_LINK}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})


//Middlewares
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))


app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" })
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})