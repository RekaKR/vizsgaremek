const { serverSetup, mockSetup } = require("./serverSetup")
const jwt = require('jsonwebtoken')
const verify = jest.spyOn(jwt, 'verify')

const app = require("../server")
const supertest = require("supertest")
const request = supertest(app)

const EmailList = require('../models/EmailListModel')


//Setup a test Database
serverSetup("emaillist-testing")

//Setup mock reset
mockSetup()

describe("Test /emaillist endpoint", () => {
  describe("Test /emaillist/get endpoint", () => {
    it("Should not get from /emaillist /wo jwt", async () => {
      //given
      //app has started

      //when
      const response = await request.get('/emaillist')

      //then
      expect(response.status).toBe(401)
      expect(response.body.message).toBe('Token missing')
    })

    it("Should not get from /emaillist /w wrong jwt", async () => {
      verify.mockImplementation(() => { throw new Error })

      //given
      //app has started

      //when
      const response = await request.get('/emaillist').set('authorization', 'hasToken')

      //then
      expect(response.status).toBe(401)
      expect(response.body.message).toEqual('Token invalid')
    })

    it("Should not get from /emaillist when not admin", async () => {
      verify.mockImplementation(() => { return { role: 'guest' } })

      //given
      //app has started

      //when
      const response = await request.get('/emaillist').set('authorization', 'hasToken')

      //then
      expect(response.status).toBe(401)
      expect(response.body.message).toEqual('User is not correct')
    })

    it("Should get from /emaillist when couple", async () => {
      verify.mockImplementation(() => { return { role: 'couple' } })

      //given
      //app has started

      //when
      const response = await request.get('/emaillist').set('authorization', 'hasToken')

      //then
      expect(response.status).toBe(200)
      expect(response.body).toEqual([])
    })

    it("Should get from /emaillist when weddingP", async () => {
      verify.mockImplementation(() => { return { role: 'weddingP' } })

      //given
      //app has started

      //when
      const response = await request.get('/emaillist').set('authorization', 'hasToken')

      //then
      expect(response.status).toBe(200)
      expect(response.body).toEqual([])
    })
  })

  describe("Test /emaillist/post endpoint", () => {
    it("Should not create /emaillist /wo jwt", async () => {
      //given
      const emailListByUser = {
        email: "email@cim.hu",
        role: "guest",
      }

      //when
      const res = await request.post('/emaillist').send(emailListByUser)

      //then
      const result = await EmailList.findOne()

      expect(result).toBeNull()

      expect(res.status).toBe(401)
      expect(res.body.message).toBe('Token missing')
    })

    it("Should not create /emaillist /w wrong jwt", async () => {
      verify.mockImplementation(() => { throw new Error })

      //given
      const emailListByUser = {
        email: "email@cim.hu",
        role: "guest",
      }

      //when
      const res = await request.post('/emaillist').set('authorization', 'hasToken').send(emailListByUser)

      //then
      const result = await EmailList.findOne()

      expect(result).toBeNull()

      expect(res.status).toBe(401)
      expect(res.body.message).toBe('Token invalid')
    })

    it("Should not create /emaillist when not admin", async () => {
      verify.mockImplementation(() => { return { role: 'guest' } })

      //given
      const emailListByUser = {
        email: "email@cim.hu",
        role: "guest",
      }

      //when
      const res = await request.post('/emaillist').set('authorization', 'hasToken').send(emailListByUser)

      //then
      const result = await EmailList.findOne()

      expect(result).toBeNull()

      expect(res.status).toBe(401)
      expect(res.body.message).toBe('User is not correct')
    })

    it("Should create /emaillist when couple", async () => {
      verify.mockImplementation(() => { return { role: 'couple' } })

      //given
      const emailListByUser = {
        email: "email@cim.hu",
        role: "guest",
      }

      //when
      const res = await request.post('/emaillist').set('authorization', 'hasToken').send(emailListByUser)

      //then
      const result = await EmailList.findOne()
      const emailListInDB = result.toJSON()

      expect(emailListInDB).not.toBeNull()

      expect(emailListInDB.__v).toBeDefined()
      expect(emailListInDB._id).toBeDefined()

      const __v = emailListInDB.__v
      const _id = emailListInDB._id

      expect(emailListInDB).toEqual({ ...emailListByUser, __v, _id })

      expect(res.status).toBe(200)
      expect(res.body).toEqual({ ...emailListByUser, __v, _id: _id.toString() })
      expect(res.body).toEqual({ ...emailListInDB, __v, _id: _id.toString() })
    })

    it("Should create /emaillist when weddingP", async () => {
      verify.mockImplementation(() => { return { role: 'weddingP' } })

      //given
      const emailListByUser = {
        email: "email@cim.hu",
        role: "guest",
      }

      //when
      const res = await request.post('/emaillist').set('authorization', 'hasToken').send(emailListByUser)

      //then
      const result = await EmailList.findOne()
      const emailListInDB = result.toJSON()

      expect(emailListInDB).not.toBeNull()

      expect(emailListInDB.__v).toBeDefined()
      expect(emailListInDB._id).toBeDefined()

      const __v = emailListInDB.__v
      const _id = emailListInDB._id

      expect(emailListInDB).toEqual({ ...emailListByUser, __v, _id })

      expect(res.status).toBe(200)
      expect(res.body).toEqual({ ...emailListByUser, __v, _id: _id.toString() })
      expect(res.body).toEqual({ ...emailListInDB, __v, _id: _id.toString() })
    })

    it("Should not create /emaillist when not all required fields are filled", async () => {
      verify.mockImplementation(() => { return { role: 'couple' } })

      //given
      const emailListByUser = {
        email: null, //it is a required field at timelineSchema
        role: "guest",
      }

      //when
      const res = await request.post('/emaillist').set('authorization', 'hasToken').send(emailListByUser)

      //then
      const result = await EmailList.findOne()

      expect(result).toBeNull()

      expect(res.status).toBe(401)
      expect(res.body.message).toBe('Can\'t save email list')
    })
  })
})