const { serverSetup, mockSetup } = require("../serverSetup")
const jwt = require('jsonwebtoken')
const verify = jest.spyOn(jwt, 'verify')

const app = require("../server")
const supertest = require("supertest")
const request = supertest(app)

const EmailList = require('../models/emailListModel')


//Setup a test Database
serverSetup("emaillist-testing")

//Setup mock reset
mockSetup()

describe("Test /api/emaillist endpoint", () => {
  describe("Test for get from /api/emaillist endpoint", () => {
    it("Should not get from /api/emaillist /wo jwt", async () => {
      //given
      //app has started

      //when
      const response = await request.get('/api/emaillist')

      //then
      expect(response.status).toBe(401)
      expect(response.body.message).toBe('Token missing')
    })

    it("Should not get from /api/emaillist /w wrong jwt", async () => {
      verify.mockImplementation(() => { throw new Error })

      //given
      //app has started

      //when
      const response = await request.get('/api/emaillist').set('authorization', 'hasToken')

      //then
      expect(response.status).toBe(401)
      expect(response.body.message).toEqual('Token invalid')
    })

    it("Should not get from /api/emaillist when not admin", async () => {
      verify.mockImplementation(() => { return { role: 'guest' } })

      //given
      //app has started

      //when
      const response = await request.get('/api/emaillist').set('authorization', 'hasToken')

      //then
      expect(response.status).toBe(401)
      expect(response.body.message).toEqual('User is not correct')
    })

    it("Should get from /api/emaillist when couple", async () => {
      verify.mockImplementation(() => { return { role: 'couple' } })

      //given
      //app has started

      //when
      const response = await request.get('/api/emaillist').set('authorization', 'hasToken')

      //then
      expect(response.status).toBe(200)
      expect(response.body).toEqual([])
    })

    it("Should get from /api/emaillist when weddingP", async () => {
      verify.mockImplementation(() => { return { role: 'weddingP' } })

      //given
      //app has started

      //when
      const response = await request.get('/api/emaillist').set('authorization', 'hasToken')

      //then
      expect(response.status).toBe(200)
      expect(response.body).toEqual([])
    })
  })

  describe("Test for post to /api/emaillist endpoint", () => {
    const emailListByUser = {
      email: "email@cim.hu",
      role: "guest",
    }

    it("Should not create /api/emaillist /wo jwt", async () => {
      //given
      //emailListByUser

      //when
      const res = await request.post('/api/emaillist').send(emailListByUser)

      //then
      const result = await EmailList.findOne()

      expect(result).toBeNull()

      expect(res.status).toBe(401)
      expect(res.body.message).toBe('Token missing')
    })

    it("Should not create /api/emaillist /w wrong jwt", async () => {
      verify.mockImplementation(() => { throw new Error })

      //given
      //emailListByUser

      //when
      const res = await request.post('/api/emaillist').set('authorization', 'hasToken').send(emailListByUser)

      //then
      const result = await EmailList.findOne()

      expect(result).toBeNull()

      expect(res.status).toBe(401)
      expect(res.body.message).toBe('Token invalid')
    })

    it("Should not create /api/emaillist when not admin", async () => {
      verify.mockImplementation(() => { return { role: 'guest' } })

      //given
      //emailListByUser

      //when
      const res = await request.post('/api/emaillist').set('authorization', 'hasToken').send(emailListByUser)

      //then
      const result = await EmailList.findOne()

      expect(result).toBeNull()

      expect(res.status).toBe(401)
      expect(res.body.message).toBe('User is not correct')
    })

    it("Should create /api/emaillist when couple", async () => {
      verify.mockImplementation(() => { return { role: 'couple' } })

      //given
      //emailListByUser

      //when
      const res = await request.post('/api/emaillist').set('authorization', 'hasToken').send(emailListByUser)

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

    it("Should create /api/emaillist when weddingP", async () => {
      verify.mockImplementation(() => { return { role: 'weddingP' } })

      //given
      //emailListByUser

      //when
      const res = await request.post('/api/emaillist').set('authorization', 'hasToken').send(emailListByUser)

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

    it("Should not create /api/emaillist when not all required fields are filled", async () => {
      verify.mockImplementation(() => { return { role: 'couple' } })

      //given
      const emailListByUser = {
        email: null, //it is a required field at emailListSchema
        role: "guest",
      }

      //when
      const res = await request.post('/api/emaillist').set('authorization', 'hasToken').send(emailListByUser)

      //then
      const result = await EmailList.findOne()

      expect(result).toBeNull()

      expect(res.status).toBe(401)
      expect(res.body.message).toBe('Can\'t save email list')
    })

    it("Should not create /api/emaillist when incorrect input value being given", async () => {
      verify.mockImplementation(() => { return { role: 'couple' } })

      //given
      const emailListByUser = {
        email: Number("itIsANumber"), //it should be a string
        role: "guest1",
      }

      //when
      const res = await request.post('/api/emaillist').set('authorization', 'hasToken').send(emailListByUser)

      //then
      const result = await EmailList.findOne()

      expect(result).toBeNull()

      expect(res.status).toBe(401)
      expect(res.body.message).toBe('Can\'t save email list')
    })

    it("Should not create /api/emaillist when unique fields had already sent with same value before", async () => {
      verify.mockImplementation(() => { return { role: 'couple' } })

      //given
      //emailListByUser

      const emailListByUser2 = {
        email: "email@cim.hu", //it must be different from the "email" field before as it is an unique field at emailListSchema
        role: "guest2",
      }

      //when
      const res = await request.post('/api/emaillist').set('authorization', 'hasToken').send(emailListByUser)
      const response = await request.post('/api/emaillist').set('authorization', 'hasToken').send(emailListByUser2)

      //then
      const result = await EmailList.find({})

      expect(result).not.toBeNull()
      expect(result).toHaveLength(1)

      result.forEach(item => {
        const emailListInDB = item.toJSON()

        expect(emailListInDB.__v).toBeDefined()
        expect(emailListInDB._id).toBeDefined()

        const __v = emailListInDB.__v
        const _id = emailListInDB._id

        expect(emailListInDB).toEqual({ ...emailListByUser, __v, _id })
        expect(emailListInDB).not.toEqual({ ...emailListByUser2, __v, _id })

        expect(res.status).toBe(200)
        expect(res.body).toEqual({ ...emailListByUser, __v, _id: _id.toString() })
        expect(res.body).not.toEqual({ ...emailListByUser2, __v, _id: _id.toString() })
        expect(res.body).toEqual({ ...emailListInDB, __v, _id: _id.toString() })
      })
    })
  })

  describe("Test for delete from /api/emaillist endpoint", () => {
    it("Should not delete /api/emaillist/:id /wo jwt", async () => {
      //given
      await EmailList.insertMany([{
        email: "email@cim.hu",
        role: "guest1"
      },
      {
        email: "email2@cim.hu",
        role: "guest2"
      },
      {
        email: "email3@cim.hu",
        role: "guest3"
      }])

      const emaillist = await EmailList.find()
      const id = emaillist[0]._id

      //when
      const res = await request.delete(`/api/emaillist/${id}`)

      //then
      const result = await EmailList.find()

      expect(result).toHaveLength(3)
      expect(emaillist[0]).toEqual(result[0])

      expect(res.status).toBe(401)
      expect(res.body.message).toBe('Token missing')
    })

    it("Should not delete /api/emaillist/:id /w wrong jwt", async () => {
      verify.mockImplementation(() => { throw new Error })

      //given
      await EmailList.insertMany([{
        email: "email@cim.hu",
        role: "guest1"
      },
      {
        email: "email2@cim.hu",
        role: "guest2"
      },
      {
        email: "email3@cim.hu",
        role: "guest3"
      }])

      const emaillist = await EmailList.find()
      const id = emaillist[0]._id

      //when
      const res = await request.delete(`/api/emaillist/${id}`).set('authorization', 'hasToken')

      //then
      const result = await EmailList.find()

      expect(result).toHaveLength(3)
      expect(emaillist[0]).toEqual(result[0])

      expect(res.status).toBe(401)
      expect(res.body.message).toBe('Token invalid')
    })

    it("Should not delete /api/emaillist/:id when not admin", async () => {
      verify.mockImplementation(() => { return { role: 'guest' } })

      //given
      await EmailList.insertMany([{
        email: "email@cim.hu",
        role: "guest1"
      },
      {
        email: "email2@cim.hu",
        role: "guest2"
      },
      {
        email: "email3@cim.hu",
        role: "guest3"
      }])

      const emaillist = await EmailList.find()
      const id = emaillist[0]._id

      //when
      const res = await request.delete(`/api/emaillist/${id}`).set('authorization', 'hasToken')

      //then
      const result = await EmailList.find()

      expect(result).toHaveLength(3)
      expect(emaillist[0]).toEqual(result[0])

      expect(res.status).toBe(401)
      expect(res.body.message).toBe('User is not correct')
    })

    it("Should delete /api/emaillist/:id when couple", async () => {
      verify.mockImplementation(() => { return { role: 'couple' } })

      //given
      await EmailList.insertMany([{
        email: "email@cim.hu",
        role: "guest1"
      },
      {
        email: "email2@cim.hu",
        role: "guest2"
      },
      {
        email: "email3@cim.hu",
        role: "guest3"
      }])

      const emaillist = await EmailList.find()
      const id = emaillist[0]._id

      //when
      const res = await request.delete(`/api/emaillist/${id}`).set('authorization', 'hasToken')

      //then
      const result = await EmailList.find()

      expect(result).toHaveLength(2)
      expect(emaillist[0]).not.toEqual(result[0])

      expect(res.status).toBe(200)
    })

    it("Should delete /api/emaillist/:id when weddingP", async () => {
      verify.mockImplementation(() => { return { role: 'weddingP' } })

      //given
      await EmailList.insertMany([{
        email: "email@cim.hu",
        role: "guest1"
      },
      {
        email: "email2@cim.hu",
        role: "guest2"
      },
      {
        email: "email3@cim.hu",
        role: "guest3"
      }])

      const emaillist = await EmailList.find()
      const id = emaillist[0]._id

      //when
      const res = await request.delete(`/api/emaillist/${id}`).set('authorization', 'hasToken')

      //then
      const result = await EmailList.find()

      expect(result).toHaveLength(2)
      expect(emaillist[0]).not.toEqual(result[0])

      expect(res.status).toBe(200)
    })

    it("Should not delete /api/emaillist/:id when id is invalid", async () => {
      verify.mockImplementation(() => { return { role: 'weddingP' } })

      //given
      await EmailList.insertMany([{
        email: "email@cim.hu",
        role: "guest1"
      },
      {
        email: "email2@cim.hu",
        role: "guest2"
      },
      {
        email: "email3@cim.hu",
        role: "guest3"
      }])

      const id = "not valid"

      //when
      const res = await request.delete(`/api/emaillist/${id}`).set('authorization', 'hasToken')

      //then
      const result = await EmailList.find()

      expect(result).toHaveLength(3)

      expect(res.status).toBe(400)
      expect(res.body.message).toBe('Can\'t delete this email-list')
    })
  })
})