const app = require("../server");
const supertest = require("supertest");
const request = supertest(app);

const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

const Accommodation = require('../models/accommodationModel')

//Server connection
let mongoServer

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create()

  await mongoose.connect(mongoServer.getUri(), {
    useNewUrlParser: true,
    dbName: "serverTest",
    useCreateIndex: true,
    useUnifiedTopology: true
  })
})

afterAll(async () => {
  await mongoose.connection.close()
  await mongoose.disconnect()
  await mongoServer.stop()
})

/*
afterEach(async () => {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany();
  }
})
*/

it("Checks if Jest works", () => {
  expect(1).toBe(1)
})

