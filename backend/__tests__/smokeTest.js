const { serverSetup } = require("../serverSetup")

const app = require("../server")
const supertest = require("supertest")
const request = supertest(app)

const Timeline = require('../models/timelineModel')


//Setup a test Database
serverSetup("dummy-testing")

describe("Dummy tests for jest & server", () => {
  it('Checks if Jest works', () => {
    expect(1).toBe(1)
  })

  it('Checks if database works', async () => {
    //Insert information to database
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

    //Get information from database
    const timelines = await Timeline.find()

    //Tests if database is correct
    expect(typeof timelines).toBe('object')
    expect(timelines.length).toBeGreaterThanOrEqual(1)
    expect(timelines).toHaveLength(2)

    //Tests if every element of timelines is present in the database
    const properties = ['_id', 'time', 'happening', 'place']

    timelines.forEach(timeline => {
      expect(timeline.time && timeline.happening && timeline.place).toBeTruthy()

      properties.map(property => {
        expect(timeline).toHaveProperty(property)
      })
    })

    //Tests if database gives back the correct elements of random timeline
    expect(timelines[0].time).toBe("Time test")
    expect(timelines[1].happening).toBe("Happening test2")
    expect(timelines[0].place).toBe("Place test")
  })

  it("Checks if supertest works", async () => {
    const response = await request.get("/api/something/not-exist")

    expect(response.status).toBe(404)
  })
})