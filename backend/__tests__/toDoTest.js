const { serverSetup, mockSetup } = require("../serverSetup")
const jwt = require('jsonwebtoken')
const verify = jest.spyOn(jwt, 'verify')

const app = require("../server")
const supertest = require("supertest")
const request = supertest(app)

const ToDo = require('../models/toDoModel')


//Setup a test Database
serverSetup("to-do-testing")

//Setup mock reset
mockSetup()

describe("Test /api/to-do-list endpoint", () => {
  it("Get from /api/to-do-list", async () => {
    //given
    //app has started

    //when
    const response = await request.get('/api/to-do-list')

    //then
    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Token missing')
  })

  describe("Test for post to /api/to-do-list endpoint", () => {
    const toDoByUser = {
      type: "dress",
      task: "Ruha teszt",
      done: true
    }

    it("Should not create /api/to-do-list /wo jwt", async () => {
      //given
      //toDoByUser

      //when
      const res = await request.post('/api/to-do-list').send(toDoByUser)

      //then
      const result = await ToDo.findOne()

      expect(result).toBeNull()

      expect(res.status).toBe(401)
      expect(res.body.message).toBe('Token missing')
    })

    it("Should not create /api/to-do-list /w wrong jwt", async () => {
      verify.mockImplementation(() => { throw new Error })

      //given
      //toDoByUser

      //when
      const res = await request.post('/api/to-do-list').set('authorization', 'hasToken').send(toDoByUser)

      //then
      const result = await ToDo.findOne()

      expect(result).toBeNull()

      expect(res.status).toBe(401)
      expect(res.body.message).toBe('Token invalid')
    })

    it("Should not create /api/to-do-list when not admin", async () => {
      verify.mockImplementation(() => { return { role: 'guest' } })

      //given
      //toDoByUser

      //when
      const res = await request.post('/api/to-do-list').set('authorization', 'hasToken').send(toDoByUser)

      //then
      const result = await ToDo.findOne()

      expect(result).toBeNull()

      expect(res.status).toBe(401)
      expect(res.body.message).toBe('User is not correct')
    })

    it("Should create /api/to-do-list when couple", async () => {
      verify.mockImplementation(() => { return { role: 'couple' } })

      //given
      //toDoByUser

      //when
      const res = await request.post('/api/to-do-list').set('authorization', 'hasToken').send(toDoByUser)

      //then
      const result = await ToDo.findOne()
      const toDoInDB = result.toJSON()

      expect(toDoInDB).not.toBeNull()

      expect(toDoInDB.__v).toBeDefined()
      expect(toDoInDB._id).toBeDefined()

      const __v = toDoInDB.__v
      const _id = toDoInDB._id

      expect(toDoInDB).toEqual({ ...toDoByUser, __v, _id })

      expect(res.status).toBe(200)
      expect(res.body).toEqual({ ...toDoByUser, __v, _id: _id.toString() })
      expect(res.body).toEqual({ ...toDoInDB, _id: _id.toString() })
    })

    it("Should create /api/to-do-list when weddingP", async () => {
      verify.mockImplementation(() => { return { role: 'weddingP' } })

      //given
      //toDoByUser

      //when
      const res = await request.post('/api/to-do-list').set('authorization', 'hasToken').send(toDoByUser)

      //then
      const result = await ToDo.findOne()
      const toDoInDB = result.toJSON()

      expect(toDoInDB).not.toBeNull()

      expect(toDoInDB.__v).toBeDefined()
      expect(toDoInDB._id).toBeDefined()

      const __v = toDoInDB.__v
      const _id = toDoInDB._id

      expect(toDoInDB).toEqual({ ...toDoByUser, __v, _id })

      expect(res.status).toBe(200)
      expect(res.body).toEqual({ ...toDoByUser, __v, _id: _id.toString() })
      expect(res.body).toEqual({ ...toDoInDB, _id: _id.toString() })
    })

    it("Should not create /api/to-do-list when not all required fields are filled", async () => {
      verify.mockImplementation(() => { return { role: 'couple' } })

      //given
      const toDoByUser = {
        type: null, //it is a required field at toDoSchema
        task: "Ruha teszt",
        done: true
      }

      //when
      const res = await request.post('/api/to-do-list').set('authorization', 'hasToken').send(toDoByUser)

      //then
      const result = await ToDo.findOne()

      expect(result).toBeNull()

      expect(res.status).toBe(401)
      expect(res.body.message).toBe('Can\'t save to-do')
    })

    it("Should not create /api/to-do-list when incorrect input value being given", async () => {
      verify.mockImplementation(() => { return { role: 'couple' } })

      //given
      const toDoByUser = {
        type: "dress",
        task: Number("itIsANumber"), //it should be a string
        done: true
      }

      //when
      const res = await request.post('/api/to-do-list').set('authorization', 'hasToken').send(toDoByUser)

      //then
      const result = await ToDo.findOne()

      expect(result).toBeNull()

      expect(res.status).toBe(401)
      expect(res.body.message).toBe('Can\'t save to-do')
    })
  })

  describe("Test for update from /api/to-do-list endpoint", () => {
    it("Should not update /api/to-do-list/:id /wo jwt", async () => {
      //given
      await ToDo.create([{
        type: "dress",
        task: "Ruha teszt",
        done: true
      }])

      const toDo = await ToDo.findOne()
      const id = toDo._id

      //when
      const res = await request.patch(`/api/to-do-list/${id}`).send({ done: false })

      //then
      const result = await ToDo.findOne()

      expect(result).toEqual(toDo)
      expect(res.status).toBe(401)
      expect(res.body.message).toBe('Token missing')
    })

    it("Should not update /api/to-do-list/:id /w wrong jwt", async () => {
      verify.mockImplementation(() => { throw new Error })

      //given
      await ToDo.create([{
        type: "dress",
        task: "Ruha teszt",
        done: true
      }])

      const toDo = await ToDo.findOne()
      const id = toDo._id

      //when
      const res = await request.patch(`/api/to-do-list/${id}`).set('authorization', 'hasToken').send({ done: false })

      //then
      const result = await ToDo.findOne()

      expect(result).toEqual(toDo)
      expect(res.status).toBe(401)
      expect(res.body.message).toBe('Token invalid')
    })

    it("Should not delete /api/to-do-list/:id when not admin", async () => {
      verify.mockImplementation(() => { return { role: 'guest' } })

      //given
      await ToDo.create([{
        type: "dress",
        task: "Ruha teszt",
        done: true
      }])

      const toDo = await ToDo.findOne()
      const id = toDo._id

      //when
      const res = await request.patch(`/api/to-do-list/${id}`).set('authorization', 'hasToken').send({ done: false })

      //then
      const result = await ToDo.findOne()

      expect(result).toEqual(toDo)
      expect(res.status).toBe(401)
      expect(res.body.message).toBe('User is not correct')
    })

    it("Should update /api/to-do-list/:id when couple", async () => {
      verify.mockImplementation(() => { return { role: 'couple' } })

      //given
      await ToDo.create([{
        type: "dress",
        task: "Ruha teszt",
        done: true
      }])

      const toDo = await ToDo.findOne()
      const id = toDo._id

      //when
      const res = await request.patch(`/api/to-do-list/${id}`).set('authorization', 'hasToken').send({ done: false })

      //then
      const result = await ToDo.findOne()

      expect(result.done).toBe(false)
      expect(result.done).not.toBe(toDo.done)
      expect(res.status).toBe(200)
    })

    it("Should update /api/to-do-list/:id when weddingP", async () => {
      verify.mockImplementation(() => { return { role: 'weddingP' } })

      //given
      await ToDo.create([{
        type: "dress",
        task: "Ruha teszt",
        done: true
      }])

      const toDo = await ToDo.findOne()
      const id = toDo._id

      //when
      const res = await request.patch(`/api/to-do-list/${id}`).set('authorization', 'hasToken').send({ done: false })

      //then
      const result = await ToDo.findOne()

      expect(result.done).toBe(false)
      expect(result.done).not.toBe(toDo.done)
      expect(res.status).toBe(200)
    })

    it("Should not delete /api/to-do-list/:id when id is invalid", async () => {
      verify.mockImplementation(() => { return { role: 'weddingP' } })

      //given
      await ToDo.create([{
        type: "dress",
        task: "Ruha teszt",
        done: true
      }])

      const id = "not valid"

      //when
      const res = await request.patch(`/api/to-do-list/${id}`).set('authorization', 'hasToken').send({ done: false })

      //then
      const result = await ToDo.findOne()

      expect(result.done).toBe(true)
      expect(res.status).toBe(400)
      expect(res.body.message).toBe('Can\'t update this to-do')
    })
  })

  describe("Test for delete from /api/to-do-list endpoint", () => {
    it("Should not delete /api/to-do-list/:id /wo jwt", async () => {
      //given
      await ToDo.insertMany([{
        type: "dress",
        task: "Ruha teszt",
        done: true
      },
      {
        type: "food",
        task: "Kaja teszt",
        done: true
      }])

      const toDoList = await ToDo.find()
      const id = toDoList[0]._id

      //when
      const res = await request.delete(`/api/to-do-list/${id}`)

      //then
      const result = await ToDo.find()

      expect(result).toHaveLength(2)
      expect(toDoList[0]).toEqual(result[0])

      expect(res.status).toBe(401)
      expect(res.body.message).toBe('Token missing')
    })

    it("Should not delete /api/to-do-list/:id /w wrong jwt", async () => {
      verify.mockImplementation(() => { throw new Error })

      //given
      await ToDo.insertMany([{
        type: "dress",
        task: "Ruha teszt",
        done: true
      },
      {
        type: "food",
        task: "Kaja teszt",
        done: true
      }])

      const toDoList = await ToDo.find()
      const id = toDoList[0]._id

      //when
      const res = await request.delete(`/api/to-do-list/${id}`).set('authorization', 'hasToken')

      //then
      const result = await ToDo.find()

      expect(result).toHaveLength(2)
      expect(toDoList[0]).toEqual(result[0])

      expect(res.status).toBe(401)
      expect(res.body.message).toBe('Token invalid')
    })

    it("Should not delete /api/to-do-list/:id when not admin", async () => {
      verify.mockImplementation(() => { return { role: 'guest' } })

      //given
      await ToDo.insertMany([{
        type: "dress",
        task: "Ruha teszt",
        done: true
      },
      {
        type: "food",
        task: "Kaja teszt",
        done: true
      }])

      const toDoList = await ToDo.find()
      const id = toDoList[0]._id

      //when
      const res = await request.delete(`/api/to-do-list/${id}`).set('authorization', 'hasToken')

      //then
      const result = await ToDo.find()

      expect(result).toHaveLength(2)
      expect(toDoList[0]).toEqual(result[0])

      expect(res.status).toBe(401)
      expect(res.body.message).toBe('User is not correct')
    })

    it("Should delete /api/to-do-list/:id when couple", async () => {
      verify.mockImplementation(() => { return { role: 'couple' } })

      //given
      await ToDo.insertMany([{
        type: "dress",
        task: "Ruha teszt",
        done: true
      },
      {
        type: "food",
        task: "Kaja teszt",
        done: true
      }])

      const toDoList = await ToDo.find()
      const id = toDoList[0]._id

      //when
      const res = await request.delete(`/api/to-do-list/${id}`).set('authorization', 'hasToken')

      //then
      const result = await ToDo.find()

      expect(result).toHaveLength(1)
      expect(toDoList[0]).not.toEqual(result[0])

      expect(res.status).toBe(200)
    })

    it("Should delete /api/to-do-list/:id when weddingP", async () => {
      verify.mockImplementation(() => { return { role: 'weddingP' } })

      //given
      await ToDo.insertMany([{
        type: "dress",
        task: "Ruha teszt",
        done: true
      },
      {
        type: "food",
        task: "Kaja teszt",
        done: true
      }])

      const toDoList = await ToDo.find()
      const id = toDoList[0]._id

      //when
      const res = await request.delete(`/api/to-do-list/${id}`).set('authorization', 'hasToken')

      //then
      const result = await ToDo.find()

      expect(result).toHaveLength(1)
      expect(toDoList[0]).not.toEqual(result[0])

      expect(res.status).toBe(200)
    })

    it("Should not delete /api/to-do-list/:id when id is invalid", async () => {
      verify.mockImplementation(() => { return { role: 'weddingP' } })

      //given
      await ToDo.insertMany([{
        type: "dress",
        task: "Ruha teszt",
        done: true
      },
      {
        type: "food",
        task: "Kaja teszt",
        done: true
      }])

      const id = "not valid"

      //when
      const res = await request.delete(`/api/to-do-list/${id}`).set('authorization', 'hasToken')

      //then
      const result = await ToDo.find()

      expect(result).toHaveLength(2)

      expect(res.status).toBe(400)
      expect(res.body.message).toBe('Can\'t delete this to-do')
    })
  })
})