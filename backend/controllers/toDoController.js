//const jwt = require('jsonwebtoken')

//require('dotenv').config()
//const JWT_SECRET = process.env.JWT_SECRET

const ToDo = require('../models/toDoModel')

const toDo_create_get = (req, res) => {
  ToDo.find()
    .then(toDos => {
      res.json(toDos)
      /*if (jwt.verify(req.headers.authorization, "JWT_SECRET")) {
       console.log(jwt.verify(req.headers.authorization, JWT_SECRET))
     }*/
    })
    .catch(err => res.status(400).json({ message: `Couldn't find to-dos ${err}` }))
  //403-as, a visszajövő kód nem megfelelő annak, amit vizsgálok; ha nincs ilyen header, akkor 401; van jwt-t, de nem mi írtuk alá: 401
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