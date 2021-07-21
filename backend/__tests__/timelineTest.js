const { serverSetup } = require("./serverSetup")

const app = require("../server")
const supertest = require("supertest")
const request = supertest(app)

const Timeline = require('../models/timelineModel')


//Setup a test Database
serverSetup("timeline-testing")


describe("Test /timeline endpoint", () => {
  it("Get from /timeline", async () => {
    //given
    //app has started

    //when
    const response = await request.get('/timeline')

    //then
    expect(response.status).toBe(200)
    expect(response.body).toEqual([])
  })

  it("Should not create /timeline /wout jwt", async () => {
    console.log('Should not create /timeline /wout jwt')
  })

  it("Should not create /timeline /w wrong jwt", async () => {
    console.log('Should not create /timeline /w wrong jwt')
  })

  it("Should not create /timeline when not admin", async () => {
    console.log('Should not create /timeline when not admin')
  })

  it("Should create /timeline when admin", async () => {
    //given
    const timelineByUser = {
      time: "Time test",
      happening: "Happening test",
      place: "Place test"
    }

    //when
    const res = await request.post('/timeline').send(timelineByUser)

    //then
    const result = await Timeline.findOne()
    const timelineInDB = result.toJSON()

    expect(timelineInDB).not.toBeNull()
    
    expect(timelineInDB.__v).toBeDefined()
    expect(timelineInDB._id).toBeDefined()
    const __v = timelineInDB.__v
    const _id = timelineInDB._id

    expect(timelineInDB).toEqual({ ...timelineByUser, __v, _id })

    expect(res.status).toBe(200)
    expect(res.body).toEqual({ ...timelineByUser, __v, _id: _id.toString() })
  })


  //ha egy időben nem lehet kettő, akkor megnézni kettőt egy időbpontra. Ha van kettő, akkor hogy nem jó-e.

  //A kódba megírni. megvizsgálni, h. a headerben van-e megfelelő token. Ha nincs, akkor hiba, ha van, akkor patika.
  //
})