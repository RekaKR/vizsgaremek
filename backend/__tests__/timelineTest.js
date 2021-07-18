const { serverSetup } = require("./serverSetup")

const app = require("../server")
const supertest = require("supertest")
const request = supertest(app)

const Timeline = require('../models/timelineModel')


//Setup a test Database
serverSetup("timeline-testing")


describe("Test /timeline endpoint", () => {
  it('Successfully insert & get information from the database', async () => {
    //insert information to database
    await Timeline.insertMany([
      {
        time: "Time test",
        happening: "Happening test",
        place: "Place test"
      },
      {
        time: "Time test2",
        happening: "Happening test2",
        place: "Place test2"
      }
    ])

    //get information from database
    const timelines = await Timeline.find()

    //tests if database is correct
    expect(typeof timelines).toBe('object')
    expect(timelines.length).toBeGreaterThanOrEqual(1)
    expect(timelines).toHaveLength(2)

    //tests if every element of timelines is present in the database
    const properties = ['_id', 'time', 'happening', 'place']

    timelines.forEach((timeline) => {
      expect(timeline.time && timeline.happening && timeline.place).toBeTruthy()

      properties.map(property => {
        expect(timeline).toHaveProperty(property)
      })
    })

    //tests if database gives back the correct elements of random timeline
    expect(timelines[0].time).toBe("Time test")
    expect(timelines[1].happening).toBe("Happening test2")
    expect(timelines[0].place).toBe("Place test")
  })

  it("Get from /timeline", async () => {
    const response = await request.get('/timeline')

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Found all timelines')
  })

  it("Post to /timeline", async () => {
    const res = await request.post('/timeline').send({
      time: "Time test3",
      happening: "Happening test3",
      place: "Place test3"
    })

    const response = await request.post('/timeline').send({
      time: "Time test4",
      happening: "Happening test4",
      place: "Place test4"
    })

    //post response
    expect(res.status && response.status).toBe(200)
    expect(typeof res.body && typeof response.body).toBe('object')

    //tests if every element of res is present in the database
    const properties = ['_id', 'time', 'happening', 'place']

    properties.map(property => {
      expect(res.body).toHaveProperty(property)
    })

    //tests if database gives back the correct elements of response
    const __v = response.body.__v
    const _id = response.body._id

    expect(response.body).toEqual({
      __v: __v,
      _id: _id,
      time: "Time test4",
      happening: "Happening test4",
      place: "Place test4"
    })

    //get information from databas
    const timelines = await Timeline.findOne({ happening: "Happening test3" })
    expect(timelines.time && timelines.happening && timelines.place).toBeTruthy()
  })
})