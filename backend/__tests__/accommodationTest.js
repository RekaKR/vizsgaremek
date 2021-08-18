const { serverSetup, mockSetup } = require("../serverSetup")
const jwt = require('jsonwebtoken')
const verify = jest.spyOn(jwt, 'verify')

const app = require("../server")
const supertest = require("supertest")
const request = supertest(app)

const Accommodation = require('../models/accommodationModel')


//Setup a test Database
serverSetup("accommodation-testing")

//Setup mock reset
mockSetup()

describe("Test /api/accommodation endpoint", () => {
  const accommodationByUser = {
    name: "Hotel name",
    zip: 1067,
    city: "City city",
    street: "Street street",
    houseNumber: 9,
    phoneNumber: "+11111111111",
    website: "website.com"
  }

  it("Should get from /api/accommodation", async () => {
    //given
    //app has started

    //when
    const response = await request.get('/api/accommodation')

    //then
    expect(response.status).toBe(200)
    expect(response.body).toEqual([])
  })

  describe("Test /api/accommodation/post endpoint", () => {
    it("Should not create /api/accommodation /wo jwt", async () => {
      //given
      //accommodationByUser

      //when
      const res = await request.post('/api/accommodation').send(accommodationByUser)

      //then
      const result = await Accommodation.findOne()

      expect(result).toBeNull()

      expect(res.status).toBe(401)
      expect(res.body.message).toBe('Token missing')
    })

    it("Should not create /api/accommodation /w wrong jwt", async () => {
      verify.mockImplementation(() => { throw new Error })

      //given
      //accommodationByUser

      //when
      const res = await request.post('/api/accommodation').set('authorization', 'hasToken').send(accommodationByUser)

      //then
      const result = await Accommodation.findOne()

      expect(result).toBeNull()

      expect(res.status).toBe(401)
      expect(res.body.message).toBe('Token invalid')
    })

    it("Should not create /api/accommodation when not admin", async () => {
      verify.mockImplementation(() => { return { role: 'guest' } })

      //given
      //accommodationByUser

      //when
      const res = await request.post('/api/accommodation').set('authorization', 'hasToken').send(accommodationByUser)

      //then
      const result = await Accommodation.findOne()

      expect(result).toBeNull()

      expect(res.status).toBe(401)
      expect(res.body.message).toBe('User is not correct')
    })

    it("Should create /api/accommodation when couple", async () => {
      verify.mockImplementation(() => { return { role: 'couple' } })

      //given
      //accommodationByUser

      //when
      const res = await request.post('/api/accommodation').set('authorization', 'hasToken').send(accommodationByUser)

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
      //expect(res.body).toEqual({ ...accommodationByUser, __v, _id: _id.toString() })
      expect(res.body).toEqual({ ...accommodationInDB, _id: _id.toString() })
    })

    it("Should create /api/accommodation when weddingP", async () => {
      verify.mockImplementation(() => { return { role: 'weddingP' } })

      //given
      //accommodationByUser

      //when
      const res = await request.post('/api/accommodation').set('authorization', 'hasToken').send(accommodationByUser)

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
      //expect(res.body).toEqual({ ...accommodationByUser, __v, _id: _id.toString() })
      expect(res.body).toEqual({ ...accommodationInDB, _id: _id.toString() })
    })

    it("Should not create /api/accommodation when not all required fields are filled", async () => {
      verify.mockImplementation(() => { return { role: 'couple' } })

      //given
      const accommodationByUser = {
        name: null, //it is a required field at accommodationSchema
        zip: 1067,
        city: "City city",
        street: "Street street",
        houseNumber: 9,
        phoneNumber: "+11111111111",
        website: "website.com"
      }

      //when
      const res = await request.post('/api/accommodation').set('authorization', 'hasToken').send(accommodationByUser)

      //then
      const result = await Accommodation.findOne()

      expect(result).toBeNull()

      expect(res.status).toBe(401)
      expect(res.body.message).toBe('Can\'t save accommodation')
    })

    it("Should not create /api/accommodation when incorrect input value being given", async () => {
      verify.mockImplementation(() => { return { role: 'couple' } })

      //given
      const accommodationByUser = {
        name: "Hotel name",
        zip: "not a number", //it should be a number
        city: "City city",
        street: "Street street",
        houseNumber: 9,
        phoneNumber: "+11111111111",
        website: "website.com"
      }

      //when
      const res = await request.post('/api/accommodation').set('authorization', 'hasToken').send(accommodationByUser)

      //then
      const result = await Accommodation.findOne()

      expect(result).toBeNull()

      expect(res.status).toBe(401)
      expect(res.body.message).toBe('Can\'t save accommodation')
    })
  })

  describe("Test /api/accommodation/delete endpoint", () => {
    it("Should not delete /api/accommodation/:id /wo jwt", async () => {
      //given
      await Accommodation.insertMany([{
        name: "Hotel name",
        address: {
          zip: 1067,
          city: "City city",
          street: "Street street",
          houseNumber: 9,
        },
        phoneNumber: "+11111111111",
        website: "website.com"
      },
      {
        name: "Hotel name2",
        address: {
          zip: 1068,
          city: "City city2",
          street: "Street street2",
          houseNumber: 10,
        },
        phoneNumber: "+11111111112",
        website: "website2.com"
      }])

      const accommodation = await Accommodation.find()
      const id = accommodation[0]._id

      //when
      const res = await request.delete(`/api/accommodation/${id}`)

      //then
      const result = await Accommodation.find()

      expect(result).toHaveLength(2)
      expect(accommodation[0]).toEqual(result[0])

      expect(res.status).toBe(401)
      expect(res.body.message).toBe('Token missing')
    })

    it("Should not delete /api/accommodation/:id /w wrong jwt", async () => {
      verify.mockImplementation(() => { throw new Error })

      //given
      await Accommodation.insertMany([{
        name: "Hotel name",
        address: {
          zip: 1067,
          city: "City city",
          street: "Street street",
          houseNumber: 9,
        },
        phoneNumber: "+11111111111",
        website: "website.com"
      },
      {
        name: "Hotel name2",
        address: {
          zip: 1068,
          city: "City city2",
          street: "Street street2",
          houseNumber: 10,
        },
        phoneNumber: "+11111111112",
        website: "website2.com"
      }])

      const accommodation = await Accommodation.find()
      const id = accommodation[0]._id

      //when
      const res = await request.delete(`/api/accommodation/${id}`).set('authorization', 'hasToken')

      //then
      const result = await Accommodation.find()

      expect(result).toHaveLength(2)
      expect(accommodation[0]).toEqual(result[0])

      expect(res.status).toBe(401)
      expect(res.body.message).toBe('Token invalid')
    })

    it("Should not delete /api/accommodation/:id when not admin", async () => {
      verify.mockImplementation(() => { return { role: 'guest' } })

      //given
      await Accommodation.insertMany([{
        name: "Hotel name",
        address: {
          zip: 1067,
          city: "City city",
          street: "Street street",
          houseNumber: 9,
        },
        phoneNumber: "+11111111111",
        website: "website.com"
      },
      {
        name: "Hotel name2",
        address: {
          zip: 1068,
          city: "City city2",
          street: "Street street2",
          houseNumber: 10,
        },
        phoneNumber: "+11111111112",
        website: "website2.com"
      }])

      const accommodation = await Accommodation.find()
      const id = accommodation[0]._id

      //when
      const res = await request.delete(`/api/accommodation/${id}`).set('authorization', 'hasToken')

      //then
      const result = await Accommodation.find()

      expect(result).toHaveLength(2)
      expect(accommodation[0]).toEqual(result[0])

      expect(res.status).toBe(401)
      expect(res.body.message).toBe('User is not correct')
    })

    it("Should delete /api/accommodation/:id when couple", async () => {
      verify.mockImplementation(() => { return { role: 'couple' } })

      //given
      await Accommodation.insertMany([{
        name: "Hotel name",
        address: {
          zip: 1067,
          city: "City city",
          street: "Street street",
          houseNumber: 9,
        },
        phoneNumber: "+11111111111",
        website: "website.com"
      },
      {
        name: "Hotel name2",
        address: {
          zip: 1068,
          city: "City city2",
          street: "Street street2",
          houseNumber: 10,
        },
        phoneNumber: "+11111111112",
        website: "website2.com"
      }])

      const accommodation = await Accommodation.find()
      const id = accommodation[0]._id

      //when
      const res = await request.delete(`/api/accommodation/${id}`).set('authorization', 'hasToken')

      //then
      const result = await Accommodation.find()

      expect(result).toHaveLength(1)
      expect(accommodation[0]).not.toEqual(result[0])

      expect(res.status).toBe(200)
    })

    it("Should delete /api/accommodation/:id when weddingP", async () => {
      verify.mockImplementation(() => { return { role: 'weddingP' } })

      //given
      await Accommodation.insertMany([{
        name: "Hotel name",
        address: {
          zip: 1067,
          city: "City city",
          street: "Street street",
          houseNumber: 9,
        },
        phoneNumber: "+11111111111",
        website: "website.com"
      },
      {
        name: "Hotel name2",
        address: {
          zip: 1068,
          city: "City city2",
          street: "Street street2",
          houseNumber: 10,
        },
        phoneNumber: "+11111111112",
        website: "website2.com"
      }])

      const accommodation = await Accommodation.find()
      const id = accommodation[0]._id

      //when
      const res = await request.delete(`/api/accommodation/${id}`).set('authorization', 'hasToken')

      //then
      const result = await Accommodation.find()

      expect(result).toHaveLength(1)
      expect(accommodation[0]).not.toEqual(result[0])

      expect(res.status).toBe(200)
    })

    it("Should not delete /api/accommodation/:id when id is invalid", async () => {
      verify.mockImplementation(() => { return { role: 'weddingP' } })

      //given
      await Accommodation.insertMany([{
        name: "Hotel name",
        address: {
          zip: 1067,
          city: "City city",
          street: "Street street",
          houseNumber: 9,
        },
        phoneNumber: "+11111111111",
        website: "website.com"
      },
      {
        name: "Hotel name2",
        address: {
          zip: 1068,
          city: "City city2",
          street: "Street street2",
          houseNumber: 10,
        },
        phoneNumber: "+11111111112",
        website: "website2.com"
      }])

      const id = "not valid"

      //when
      const res = await request.delete(`/api/accommodation/${id}`).set('authorization', 'hasToken')

      //then
      const result = await Accommodation.find()

      expect(result).toHaveLength(2)

      expect(res.status).toBe(400)
      expect(res.body.message).toBe('Can\'t delete this accommodation')
    })
  })
})