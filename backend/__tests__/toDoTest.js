const { serverSetup } = require("./serverSetup")

const app = require("../server")
const supertest = require("supertest")
const request = supertest(app)

const ToDo = require('../models/toDoModel')


//Setup a test Database
serverSetup("to-do-testing")


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

  it("Should not create /to-do-list /wout jwt", async () => {
    console.log('hould not create /to-do-list /wout jwt')
  })

  it("Should not create /to-do-list /w wrong jwt", async () => {
    console.log('Should not create /to-do-list /w wrong jwt')
  })

  it("Should not create /to-do-list when not admin", async () => {
    console.log('Should not create /to-do-list when not admin')
  })

  it("Should create /to-do-list when admin", async () => {
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
    const toDoInDB = result.toJSON()

    expect(toDoInDB).not.toBeNull()

    expect(toDoInDB.__v).toBeDefined()
    expect(toDoInDB._id).toBeDefined()
    const __v = toDoInDB.__v
    const _id = toDoInDB._id

    expect(toDoInDB).toEqual({ ...toDoByUser, __v, _id })

    expect(res.status).toBe(200)
    expect(res.body).toEqual({ ...toDoByUser, __v, _id: _id.toString() })
  })
})