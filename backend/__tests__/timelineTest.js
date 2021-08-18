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

  describe("Test for post to /api/timeline endpoint", () => {
    const timelineByUser = {
      time: "Time test",
      happening: "Happening test",
      place: "Place test"
    }

    it("Should not create /api/timeline /wo jwt", async () => {
      //given
      //timelineByUser

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
      //timelineByUser

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
      //timelineByUser

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
      //timelineByUser

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
      //timelineByUser

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

    it("Should not create /api/timeline when incorrect input value being given", async () => {
      verify.mockImplementation(() => { return { role: 'couple' } })

      //given
      const timelineByUser = {
        time: "Time test",
        happening: Number("itIsANumber"), //it should be a string
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
  })

  describe("Test for delete from /api/timeline endpoint", () => {
    it("Should not delete /api/timeline/:id /wo jwt", async () => {
      //given
      await Timeline.insertMany([{
        time: "Time test",
        happening: "Happening test",
        place: "Place test"
      },
      {
        time: "Time test2",
        happening: "Happening test2",
        place: "Place test2"
      }])

      const timeline = await Timeline.find()
      const id = timeline[0]._id

      //when
      const res = await request.delete(`/api/timeline/${id}`)

      //then
      const result = await Timeline.find()

      expect(result).toHaveLength(2)
      expect(timeline[0]).toEqual(result[0])

      expect(res.status).toBe(401)
      expect(res.body.message).toBe('Token missing')
    })

    it("Should not delete /api/timeline/:id /w wrong jwt", async () => {
      verify.mockImplementation(() => { throw new Error })

      //given
      await Timeline.insertMany([{
        time: "Time test",
        happening: "Happening test",
        place: "Place test"
      },
      {
        time: "Time test2",
        happening: "Happening test2",
        place: "Place test2"
      }])

      const timeline = await Timeline.find()
      const id = timeline[0]._id

      //when
      const res = await request.delete(`/api/timeline/${id}`).set('authorization', 'hasToken')

      //then
      const result = await Timeline.find()

      expect(result).toHaveLength(2)
      expect(timeline[0]).toEqual(result[0])

      expect(res.status).toBe(401)
      expect(res.body.message).toBe('Token invalid')
    })

    it("Should not delete /api/timeline/:id when not admin", async () => {
      verify.mockImplementation(() => { return { role: 'guest' } })

      //given
      await Timeline.insertMany([{
        time: "Time test",
        happening: "Happening test",
        place: "Place test"
      },
      {
        time: "Time test2",
        happening: "Happening test2",
        place: "Place test2"
      }])

      const timeline = await Timeline.find()
      const id = timeline[0]._id

      //when
      const res = await request.delete(`/api/timeline/${id}`).set('authorization', 'hasToken')

      //then
      const result = await Timeline.find()

      expect(result).toHaveLength(2)
      expect(timeline[0]).toEqual(result[0])

      expect(res.status).toBe(401)
      expect(res.body.message).toBe('User is not correct')
    })

    it("Should delete /api/timeline/:id when couple", async () => {
      verify.mockImplementation(() => { return { role: 'couple' } })

      //given
      await Timeline.insertMany([{
        time: "Time test",
        happening: "Happening test",
        place: "Place test"
      },
      {
        time: "Time test2",
        happening: "Happening test2",
        place: "Place test2"
      }])

      const timeline = await Timeline.find()
      const id = timeline[0]._id

      //when
      const res = await request.delete(`/api/timeline/${id}`).set('authorization', 'hasToken')

      //then
      const result = await Timeline.find()

      expect(result).toHaveLength(1)
      expect(timeline[0]).not.toEqual(result[0])

      expect(res.status).toBe(200)
    })

    it("Should delete /api/timeline/:id when weddingP", async () => {
      verify.mockImplementation(() => { return { role: 'weddingP' } })

      //given
      await Timeline.insertMany([{
        time: "Time test",
        happening: "Happening test",
        place: "Place test"
      },
      {
        time: "Time test2",
        happening: "Happening test2",
        place: "Place test2"
      }])

      const timeline = await Timeline.find()
      const id = timeline[0]._id

      //when
      const res = await request.delete(`/api/timeline/${id}`).set('authorization', 'hasToken')

      //then
      const result = await Timeline.find()

      expect(result).toHaveLength(1)
      expect(timeline[0]).not.toEqual(result[0])

      expect(res.status).toBe(200)
    })

    it("Should not delete /api/timeline/:id when id is invalid", async () => {
      verify.mockImplementation(() => { return { role: 'weddingP' } })

      //given
      await Timeline.insertMany([{
        time: "Time test",
        happening: "Happening test",
        place: "Place test"
      },
      {
        time: "Time test2",
        happening: "Happening test2",
        place: "Place test2"
      }])

      const id = "not valid"

      //when
      const res = await request.delete(`/api/timeline/${id}`).set('authorization', 'hasToken')

      //then
      const result = await Timeline.find()

      expect(result).toHaveLength(2)

      expect(res.status).toBe(400)
      expect(res.body.message).toBe('Can\'t delete this event')
    })
  })
})