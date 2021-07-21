const ToDo = require('../models/toDoModel')

const toDo_create_get = (req, res) => {
  ToDo.find()
    .then(toDos => res.json(toDos))
    .catch(err => res.status(400).json({ message: `Couldn't find to-dos ${err}` }))
}

const toDo_create_post = (req, res) => {
  const toDo = new ToDo({
    type: req.body.type,
    task: req.body.task,
    done: req.body.done
  })

  toDo.save()
    .then(data => res.json(data))
    .catch(err => res.json({ message: err }))
}

module.exports = {
  toDo_create_get,
  toDo_create_post
}