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
    //given
    //app has started

    //when
    const response = await request.get('/timeline')

    //then
    expect(response.status).toBe(200)
    expect(response.body.timelines).toEqual([])
  })

  it("Should not create /timeline /wout jwt", async () => {
    console.log('ok')
  })

  it("Should not create /timeline /w wrong jwt", async () => {
    console.log('ok')
  })

  it("Should not create /timeline when not admin", async () => {
    console.log('ok')
  })

  it("Should create /timeline when admin", async () => {
    //given
    const timelineByUser = {
      time: "Time test3",
      happening: "Happening test3",
      place: "Place test3"
    }

    //when
    const res = await request.post('/timeline').send(timelineByUser)

    //then
    //tests if database gives back the correct records by searching an element
    const result = await Timeline.findOne()
    const timelineInDB = result.toJSON()

    expect(timelineInDB).not.toBeNull()

    expect(timelineInDB.__v).toBeDefined()
    expect(timelineInDB._id).toBeDefined()
    const __v = timelineInDB.__v
    const _id = timelineInDB._id

    expect(timelineInDB).toEqual({ ...timelineByUser, __v, _id })

    //post response
    expect(res.status).toBe(200)

    //tests if database gives back the correct elements of response
    expect(res.body).toEqual({ ...timelineByUser, __v, _id: _id.toString() })
  })


  //ha egy időben nem lehet kettő, akkor megnézni kettőt egy időbpontra. Ha van kettő, akkor hogy nem jó-e.

  //A kódba megírni. megvizsgálni, h. a headerben van-e megfelelő token. Ha nincs, akkor hiba, ha van, akkor patika.
  //
})