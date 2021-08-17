const app = require("./server")
const mongoose = require('mongoose')

require('dotenv').config()
const PORT = process.env.PORT || 3001 //.env-ben másik portot megadni!
const MONGO_CONNECTION = process.env.MONGO_CONNECTION


//DATABASE CONNECTION
mongoose.connect(`${MONGO_CONNECTION}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))


//LISTEN
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})