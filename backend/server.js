const express = require("express")
const app = express()

const cors = require('cors')

const swaggerUi = require("swagger-ui-express")
const YAML = require("yamljs")
const swaggerDocument = YAML.load("./doc.yaml")


//MIDDLEWARES
app.use(express.urlencoded({ extended: false })) //parse requests of content-type - application/x-www-form-urlencoded
app.use(express.json()) //parse requests of content-type - application/json
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument))


//ROUTES
const accommodationRoutes = require('./routes/accommodationRoutes')
const emailListRoutes = require('./routes/emailListRoutes')
const goodWishRoutes = require('./routes/goodWishRoutes')
const loginRoutes = require('./routes/loginRoutes')
const timelineRoutes = require('./routes/timelineRoutes')
const toDoRoutes = require('./routes/toDoRoutes')
const userRoutes = require('./routes/userRoutes')

app.use('/api/accommodation', accommodationRoutes)
app.use('/api/emaillist', emailListRoutes)
app.use('/api/good-wish', goodWishRoutes)
app.use('/api/login', loginRoutes)
app.use('/api/timeline', timelineRoutes)
app.use('/api/to-do-list', toDoRoutes)
app.use('/api/user', userRoutes)


module.exports = app