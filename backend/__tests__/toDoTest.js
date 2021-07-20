const { serverSetup } = require("./serverSetup")

const app = require("../server")
const supertest = require("supertest")
const request = supertest(app)

const ToDo = require('../models/toDoModel')


//Setup a test Database
serverSetup("to-do-testing")


describe("Test /to-do-list endpoint", () => {
  it('Successfully insert & get information from the database', async () => {
    //insert information to database
    await ToDo.insertMany([
      {
        type: "clothes",
        task: "Ruha teszt",
        done: false
      },
      {
        type: "design",
        task: "Ruha teszt2",
        done: true
      }
    ])

    //get information from database
    const toDos = await ToDo.find()

    //tests if database is correct
    expect(typeof toDos).toBe('object')
    expect(toDos.length).toBeGreaterThanOrEqual(1)
    expect(toDos).toHaveLength(2)

    //tests if every element of toDos is present in the database
    const properties = ['_id', 'type', 'task', 'done']

    toDos.forEach((toDo) => {
      expect(toDo.type && toDo.task).toBeTruthy()

      properties.map(property => {
        expect(toDo).toHaveProperty(property)
      })
    })

    //tests if database gives back the correct elements of random toDo
    expect(toDos[0].type).toBe("clothes")
    expect(toDos[1].task).toBe("Ruha teszt2",)
    expect(toDos[0].done).toBe(false)
  })

  it("Get from /to-do-list", async () => {
    const response = await request.get('/to-do-list')

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Found all to-dos')
  })

  it("Post to /to-do-list", async () => {
    const res = await request.post('/to-do-list').send({
      type: "other",
      task: "Ruha teszt3",
      done: false
    })

    const response = await request.post('/to-do-list').send({
      type: "design",
      task: "Ruha teszt4",
      done: true
    })

    //post response
    expect(res.status).toBe(200)
    expect(response.status).toBe(200)

    //tests if database is correct
    expect(typeof res.body).toBe('object')
    expect(typeof response.body).toBe('object')

    //tests if every element of res is present in the database
    const properties = ['_id', 'type', 'task', 'done']

    properties.map(property => {
      expect(res.body).toHaveProperty(property)
    })

    //tests if database gives back the correct elements of response
    const __v = response.body.__v
    const _id = response.body._id

    expect(response.body).toEqual({
      __v: __v,
      _id: _id,
      type: "design",
      task: "Ruha teszt4",
      done: true
    })

    //tests if database gives back the correct records by searching an element
    const toDo = await ToDo.findOne({ task: "Ruha teszt4" })

    expect(toDo.type && toDo.task && toDo.done).toBeTruthy()
    expect(toDo.type).toBe("design")
    expect(toDo.done).toBe(true)
  })
})