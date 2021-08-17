const { serverSetup, mockSetup } = require("../serverSetup")
const jwt = require('jsonwebtoken')
const verify = jest.spyOn(jwt, 'verify')

const app = require("../server")
const supertest = require("supertest")
const request = supertest(app)

const Timeline = require('../models/timelineModel')


//Setup a test Database
serverSetup("timeline-testing")

//Setup mock reset
mockSetup()

describe("Test /api/timeline endpoint", () => {
  it("Get from /api/timeline", async () => {
    //given
    //app has started

    //when
    const response = await request.get('/api/timeline')

    //then
    expect(response.status).toBe(200)
    expect(response.body).toEqual([])
  })

  it("Should not create /api/timeline /wo jwt", async () => {
    //given
    const timelineByUser = {
      time: "Time test",
      happening: "Happening test",
      place: "Place test"
    }

    //when
    const res = await request.post('/api/timeline').send(timelineByUser)

    //then
    const result = await Timeline.findOne()

    expect(result).toBeNull()

    expect(res.status).toBe(401)
    expect(res.body.message).toBe('Token missing')
  })

  it("Should not create /api/timeline /w wrong jwt", async () => {
    verify.mockImplementation(() => { throw new Error })

    //given
    const timelineByUser = {
      time: "Time test",
      happening: "Happening test",
      place: "Place test"
    }

    //when
    const res = await request.post('/api/timeline').set('authorization', 'hasToken').send(timelineByUser)

    //then
    const result = await Timeline.findOne()

    expect(result).toBeNull()

    expect(res.status).toBe(401)
    expect(res.body.message).toBe('Token invalid')
  })

  it("Should not create /api/timeline when not admin", async () => {
    verify.mockImplementation(() => { return { role: 'guest' } })

    //given
    const timelineByUser = {
      time: "Time test",
      happening: "Happening test",
      place: "Place test"
    }

    //when
    const res = await request.post('/api/timeline').set('authorization', 'hasToken').send(timelineByUser)

    //then
    const result = await Timeline.findOne()

    expect(result).toBeNull()

    expect(res.status).toBe(401)
    expect(res.body.message).toBe('User is not correct')
  })

  it("Should create /api/timeline when couple", async () => {
    verify.mockImplementation(() => { return { role: 'couple' } })

    //given
    const timelineByUser = {
      time: "Time test",
      happening: "Happening test",
      place: "Place test"
    }

    //when
    const res = await request.post('/api/timeline').set('authorization', 'hasToken').send(timelineByUser)

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
    expect(res.body).toEqual({ ...timelineInDB, __v, _id: _id.toString() })
  })

  it("Should create /api/timeline when weddingP", async () => {
    verify.mockImplementation(() => { return { role: 'weddingP' } })

    //given
    const timelineByUser = {
      time: "Time test",
      happening: "Happening test",
      place: "Place test"
    }

    //when
    const res = await request.post('/api/timeline').set('authorization', 'hasToken').send(timelineByUser)

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
    expect(res.body).toEqual({ ...timelineInDB, __v, _id: _id.toString() })
  })

  it("Should not create /api/timeline when not all required fields are filled", async () => {
    verify.mockImplementation(() => { return { role: 'couple' } })

    //given
    const timelineByUser = {
      time: null, //it is a required field at timelineSchema
      happening: "Happening test",
      place: "Place test"
    }

    //when
    const res = await request.post('/api/timeline').set('authorization', 'hasToken').send(timelineByUser)

    //then
    const result = await Timeline.findOne()

    expect(result).toBeNull()

    expect(res.status).toBe(401)
    expect(res.body.message).toBe('Can\'t save this event')
  })
  //ha egy időben nem lehet kettő, akkor megnézni kettőt egy időbpontra. Ha van kettő, akkor hogy nem jó-e.
})