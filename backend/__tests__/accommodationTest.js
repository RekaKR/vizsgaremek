const { serverSetup } = require("./serverSetup")

const app = require("../server")
const supertest = require("supertest")
const request = supertest(app)

const Accommodation = require('../models/accommodationModel')
//const accommodationController = require('../controllers/accommodationController')


//Setup a test Database
serverSetup("accommodation-testing")


describe("Test /accommodation endpoint", () => {
  it('Successfully insert & get information from the database', async () => {
    //insert information to database
    await Accommodation.insertMany([
      {
        name: "Hotel test",
        address: {
          zip: 1067,
          city: "City test",
          street: "Street test",
          houseNumber: 9
        },
        phoneNumber: "+36701111111",
        website: "test.com"
      },
      {
        name: "Hotel test2",
        address: {
          zip: 1068,
          city: "City test2",
          street: "Street test2",
          houseNumber: 10
        },
        phoneNumber: "+36701111112",
        website: "test2.com"
      }
    ])

    //get information from database
    const accommodations = await Accommodation.find()

    //tests if database is correct
    expect(typeof accommodations).toBe('object')
    expect(accommodations.length).toBeGreaterThanOrEqual(1)
    expect(accommodations).toHaveLength(2)

    //tests if every element of accommodations is present in the database
    const properties = ['_id', 'name', 'address', 'address.zip', 'address.city', 'address.street', 'address.houseNumber', 'phoneNumber', 'website']

    accommodations.forEach((accommodation) => {
      expect(accommodation.name && accommodation.address && accommodation.phoneNumber && accommodation.website).toBeTruthy()

      /*
      expect(accommodation).toHaveProperty('_id')
      expect(accommodation).toHaveProperty('name')
      expect(accommodation).toHaveProperty('address')
      expect(accommodation).toHaveProperty('address.zip')
      expect(accommodation).toHaveProperty('address.city')
      expect(accommodation).toHaveProperty('address.street')
      expect(accommodation).toHaveProperty('address.houseNumber')
      expect(accommodation).toHaveProperty('phoneNumber')
      expect(accommodation).toHaveProperty('website')
      */
      properties.map(property => {
        expect(accommodation).toHaveProperty(property)
      })
    })

    //tests if database gives back the correct elements of random accommodation
    expect(accommodations[0].name).toBe("Hotel test")
    expect(typeof accommodations[1].address).toBe('object')
    expect(accommodations[0].address.zip).toBe(1067)
    expect(accommodations[1].address.city).toBe("City test2")
    expect(accommodations[0].address.street).toBe("Street test")
    expect(accommodations[1].address.houseNumber).toBe(10)
    expect(accommodations[0].phoneNumber).toBe("+36701111111")
    expect(accommodations[1].website).toBe("test2.com")
  })

  it("Get from /accommodation", async () => {
    const response = await request.get('/accommodation')

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Found all accommodations')
  })

  it("Post to /accommodation", async () => {
    const res = await request.post('/accommodation').send({
      name: "Hotel name3",
      zip: 1067,
      city: "City city3",
      street: "Street street3",
      houseNumber: 9,
      phoneNumber: "+367011111113",
      website: "website.com"
    })

    const response = await request.post('/accommodation').send({
      name: "Hotel name4",
      zip: 1068,
      city: "City city4",
      street: "Street street4",
      houseNumber: 10,
      phoneNumber: "+36701111114",
      website: "website4.com"
    })

    //post response
    expect(res.status).toBe(200)
    expect(response.status).toBe(200)
    expect(typeof res.body).toBe('object')
    expect(typeof response.body).toBe('object')

    //tests if every element of res is present in the database
    /*
        expect(res.body).toContain('_id')
        expect(new Set(res.body)).toContain('_id')
    */

    const properties = ['_id', 'name', 'address', 'address.zip', 'address.city', 'address.street', 'address.houseNumber', 'phoneNumber', 'website']

    properties.map(property => {
      expect(res.body).toHaveProperty(property)
    })
    /*
    expect(res.body).toHaveProperty('_id')
    expect(res.body).toHaveProperty('name')
    expect(res.body).toHaveProperty('address')
    expect(res.body).toHaveProperty('address.zip')
    expect(res.body).toHaveProperty('address.city')
    expect(res.body).toHaveProperty('address.street')
    expect(res.body).toHaveProperty('address.houseNumber')
    expect(res.body).toHaveProperty('phoneNumber')
    expect(res.body).toHaveProperty('website')
    */

    //tests if database gives back the correct elements of response
    const __v = response.body.__v
    const _id = response.body._id

    expect(response.body).toEqual({
      __v: __v,
      _id: _id,
      name: "Hotel name4",
      address: {
        zip: 1068,
        city: "City city4",
        street: "Street street4",
        houseNumber: 10
      },
      phoneNumber: "+36701111114",
      website: "website4.com"
    })
    /*
        expect(response.body.name).toBe("Hotel name2")
        expect(typeof response.body.address).toBe('object')
        expect(response.body.address.zip).toBe(1068)
        expect(response.body.address.city).toBe("City city2")
        expect(response.body.address.street).toBe("Street street2")
        expect(response.body.address.houseNumber).toBe(10)
        expect(response.body.phoneNumber).toBe("+36701111112")
        expect(response.body.website).toBe("website2.com")
    */

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

    //get information from databas
    const accommodation = await Accommodation.findOne({ name: "Hotel name3" })
    expect(accommodation.name && accommodation.address && accommodation.phoneNumber && accommodation.website).toBeTruthy()

    //expect(accommodation.name).toBe("Hotel name3")
    expect(accommodation.phoneNumber).toBe("+367011111113")
    expect(accommodation.website).toBe("website.com")
  })
})