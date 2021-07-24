const { serverSetup } = require("./serverSetup")

const app = require("../server")
const supertest = require("supertest")
const request = supertest(app)

const jwt = require('jsonwebtoken')
const verify = jest.spyOn(jwt, 'verify')

const Accommodation = require('../models/accommodationModel')
const User = require('../models/userModel')

//Setup a test Database
serverSetup("accommodation-testing")


describe("Test /accommodation endpoint", () => {
  it("Get from /accommodation", async () => {
    //given
    //app has started

    //when
    const response = await request.get('/accommodation')

    //then
    expect(response.status).toBe(200)
    expect(response.body).toEqual([])
  })

  it("Should not create /accommodation /wo jwt", async () => {
    //given
    const accommodationByUser = {
      name: "Hotel name",
      zip: 1067,
      city: "City city",
      street: "Street street",
      houseNumber: 9,
      phoneNumber: "+11111111111",
      website: "website.com"
    }

    //when
    const res = await request.post('/accommodation').send(accommodationByUser)

    //then
    const result = await Accommodation.findOne()

    expect(result).toBeNull()

    expect(res.status).toBe(401)
    expect(res.body.message).toBe('Token missing')
  })

  it("Should not create /accommodation /w wrong jwt", async () => {
    verify.mockImplementation(() => { throw new Error })

    //given
    const accommodationByUser = {
      name: "Hotel name",
      zip: 1067,
      city: "City city",
      street: "Street street",
      houseNumber: 9,
      phoneNumber: "+11111111111",
      website: "website.com"
    }

    //when
    const res = await request.post('/accommodation').set('authorization', 'hasToken').send(accommodationByUser)

    //then
    const result = await Accommodation.findOne()

    expect(result).toBeNull()

    expect(res.status).toBe(401)
    expect(res.body.message).toBe('Token invalid')
  })

  it("Should not create /accommodation when not admin", async () => {
    const newUser = new User({
      googleId: 123,
      role: 'guest'
    })

    await newUser.save()

    verify.mockImplementation(() => { return { google: 123 } })

    //given
    const accommodationByUser = {
      name: "Hotel name",
      zip: 1067,
      city: "City city",
      street: "Street street",
      houseNumber: 9,
      phoneNumber: "+11111111111",
      website: "website.com"
    }

    //when
    const res = await request.post('/accommodation').set('authorization', 'hasToken').send(accommodationByUser)

    //then
    const result = await Accommodation.findOne()

    expect(result).toBeNull()

    expect(res.status).toBe(401)
    expect(res.body.message).toBe('User is not correct')
  })

  it("Should create /accommodation when admin", async () => {
    const newUser = new User({
      googleId: 123,
      role: 'couple'
    })

    await newUser.save()

    verify.mockImplementation(() => { return { google: 123 } })

    //given
    const accommodationByUser = {
      name: "Hotel name",
      zip: 1067,
      city: "City city",
      street: "Street street",
      houseNumber: 9,
      phoneNumber: "+11111111111",
      website: "website.com"
    }

    //when
    const res = await request.post('/accommodation').set('authorization', 'hasToken').send(accommodationByUser)

    //then
    const result = await Accommodation.findOne()
    const accommodationInDB = result.toJSON()

    expect(accommodationInDB).not.toBeNull()

    expect(accommodationInDB.__v).toBeDefined()
    expect(accommodationInDB._id).toBeDefined()

    const __v = accommodationInDB.__v
    const _id = accommodationInDB._id

    //expect(accommodationInDB).toEqual({ ...accommodationByUser, __v, _id })

    const properties = ['_id', 'name', 'address.zip', 'address.city', 'address.street', 'address.houseNumber', 'phoneNumber', 'website']

    properties.map(property => {
      expect(accommodationInDB).toHaveProperty(property)
    })

    expect(res.status).toBe(200)
    //expect(res.body).toEqual({ ...accommodationInDB, __v, _id: _id.toString()})
    expect(res.body).toEqual({ ...accommodationInDB, _id: _id.toString() })

    //    expect(accommodationController.accommodation_create_post).toThrowError('Couldn\'t save accommodation')
  })
})