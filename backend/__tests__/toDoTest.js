const { serverSetup, mockSetup } = require("./serverSetup")
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

describe("Test /to-do-list endpoint", () => {
  it("Get from /to-do-list", async () => {
    //given
    //app has started

    //when
    const response = await request.get('/to-do-list')

    //then
    expect(response.status).toBe(200)
    expect(response.body).toEqual([])
  })

  it("Should not create /to-do-list /wo jwt", async () => {
    //given
    const toDoByUser = {
      type: "dress",
      task: "Ruha teszt",
      done: true
    }

    //when
    const res = await request.post('/to-do-list').send(toDoByUser)

    //then
    const result = await ToDo.findOne()

    expect(result).toBeNull()

    expect(res.status).toBe(401)
    expect(res.body.message).toBe('Token missing')
  })

  it("Should not create /to-do-list /w wrong jwt", async () => {
    verify.mockImplementation(() => { throw new Error })

    //given
    const toDoByUser = {
      type: "dress",
      task: "Ruha teszt",
      done: true
    }

    //when
    const res = await request.post('/to-do-list').set('authorization', 'hasToken').send(toDoByUser)

    //then
    const result = await ToDo.findOne()

    expect(result).toBeNull()

    expect(res.status).toBe(401)
    expect(res.body.message).toBe('Token invalid')
  })

  it("Should not create /to-do-list when not admin", async () => {
    verify.mockImplementation(() => { return { role: 'guest' } })

    //given
    const toDoByUser = {
      type: "dress",
      task: "Ruha teszt",
      done: true
    }

    //when
    const res = await request.post('/to-do-list').set('authorization', 'hasToken').send(toDoByUser)

    //then
    const result = await ToDo.findOne()

    expect(result).toBeNull()

    expect(res.status).toBe(401)
    expect(res.body.message).toBe('User is not correct')
  })

  it("Should create /to-do-list when couple", async () => {
    verify.mockImplementation(() => { return { role: 'couple' } })

    //given
    const toDoByUser = {
      type: "dress",
      task: "Ruha teszt",
      done: true
    }

    //when
    const res = await request.post('/to-do-list').set('authorization', 'hasToken').send(toDoByUser)

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

  it("Should create /to-do-list when weddingP", async () => {
    verify.mockImplementation(() => { return { role: 'weddingP' } })

    //given
    const toDoByUser = {
      type: "dress",
      task: "Ruha teszt",
      done: true
    }

    //when
    const res = await request.post('/to-do-list').set('authorization', 'hasToken').send(toDoByUser)

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

  it("Should not create /to-do-list when not all required fields are filled", async () => {
    verify.mockImplementation(() => { return { role: 'couple' } })

    //given
    const toDoByUser = {
      type: null, //it is a required field at accommodationSchema
      task: "Ruha teszt",
      done: true
    }

    //when
    const res = await request.post('/to-do-list').set('authorization', 'hasToken').send(toDoByUser)

    //then
    const result = await ToDo.findOne()

    expect(result).toBeNull()

    expect(res.status).toBe(401)
    expect(res.body.message).toBe('Can\'t save to-do')
  })
})