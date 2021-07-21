const { serverSetup } = require("./serverSetup")

const app = require("../server")
const supertest = require("supertest")
const request = supertest(app)

const Accommodation = require('../models/accommodationModel')
//const accommodationController = require('../controllers/accommodationController')


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
    console.log('Should not create /accommodation /wout jwt')
  })

  it("Should not create /accommodation /w wrong jwt", async () => {
    console.log('Should not create /accommodation /w wrong jwt')
  })

  it("Should not create /accommodation when not admin", async () => {
    console.log('Should not create /accommodation when not admin')
  })

  it("Should create /accommodation when admin", async () => {
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

    /*
    //MEGNÉZNI!!!!
    expect(async () => {
      await accommodationController.accommodation_create_post({
        name: 1,
        address: {
          zip: 1068,
          city: "City city2",
          street: "Street street2",
          houseNumber: 10
        },
        phoneNumber: "+36701111112",
        website: "website2.com"
      }).toThrow()
    })

    expect(accommodationController.accommodation_create_post).toThrowError('Couldn\'t save accommodation')
    */
  })
})