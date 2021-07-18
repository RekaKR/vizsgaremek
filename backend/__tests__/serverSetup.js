const mongoose = require('mongoose')
//mongoose.set("useCreateIndex", true)
//mongoose.promise = global.Promise
const { MongoMemoryServer } = require('mongodb-memory-server')


async function removeAllCollections() {
  const collections = Object.keys(mongoose.connection.collections)

  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName]
    await collection.deleteMany()
  }
}

async function dropAllCollections() {
  const collections = Object.keys(mongoose.connection.collections)

  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName]
    try {
      await collection.drop()
    } catch (error) {
      if (error.message === "ns not found") return
      if (error.message.includes("a background operation is currently running")) return console.log(error.message)
    }
  }
}

serverSetup = (serverName) => {
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

  // Disconnect Mongoose
  afterAll(async () => {
    await dropAllCollections()
    await mongoose.connection.close()
    await mongoose.disconnect()
    await mongoServer.stop()
  })
}

it('MongoMemoryServer is connected', async () => {
  expect(mongoose).toBeDefined()
})


module.exports = { serverSetup }