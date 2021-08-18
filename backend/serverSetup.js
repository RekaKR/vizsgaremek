const mongoose = require('mongoose')
//mongoose.promise = global.Promise
const { MongoMemoryServer } = require('mongodb-memory-server')

const jwt = require('jsonwebtoken')
const verify = jest.spyOn(jwt, 'verify')


async function removeAllCollections() {
  const collections = Object.keys(mongoose.connection.collections)

  const promisList = collections.map(collectionName => {
    const collection = mongoose.connection.collections[collectionName]
    return collection.deleteMany()
  })

  await Promise.all(promisList)
}

async function dropAllCollections() {
  const collections = Object.keys(mongoose.connection.collections)

  const promisList = collections.map(collectionName => {
    const collection = mongoose.connection.collections[collectionName]
    return collection.drop()
  })

  try {
    await Promise.all(promisList)
  } catch (error) {
    if (error.message === "ns not found") return
    if (error.message.includes("a background operation is currently running")) return console.log(error.message)
  }
}

const serverSetup = (serverName) => {
  //Server connection
  let mongoServer

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()

    await mongoose.connect(mongoServer.getUri(), {
      useNewUrlParser: true,
      dbName: serverName,
      useCreateIndex: true,
      useUnifiedTopology: true
    })
  })

  //Cleans up database between each test
  afterEach(async () => {
    await removeAllCollections()
  })

  //Disconnect Mongoose
  afterAll(async () => {
    await dropAllCollections()

    //átnézni !!!!!!!!!
    await mongoose.connection.close()
    await mongoose.disconnect()
    await mongoServer.stop()
  })
}

const mockSetup = () => {
  //Cleans up mocks between each test
  afterEach(async () => {
    await verify.mockReset()
  })
}


module.exports = {
  serverSetup,
  mockSetup
}