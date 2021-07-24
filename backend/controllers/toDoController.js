const jwt = require('jsonwebtoken')

require('dotenv').config()
const JWT_SECRET = process.env.JWT_SECRET

const ToDo = require('../models/toDoModel')
const User = require('../models/userModel')


//GET BACK ALL THE TODOS
const toDo_create_get = (req, res) => {
  ToDo.find()
    .then(toDos => res.json(toDos))
    .catch(err => res.status(400).json({ message: `Couldn't find to-dos ${err}` }))
  //403-as, a visszajövő kód nem megfelelő annak, amit vizsgálok; ha nincs ilyen header, akkor 401; van jwt-t, de nem mi írtuk alá: 401
}

//POST TO SERVER A TODO
const toDo_create_post = (req, res) => {
  let payload

  if (!req.headers.authorization) return res.status(401).json({ message: 'Token missing' })

  try {
    payload = jwt.verify(req.headers.authorization, JWT_SECRET)
  } catch (err) {
    return res.status(401).json({ message: 'Token invalid' })
  }

  User.findOne({ googleId: payload.google })
    .then(user => {
      if (user && user.role === "admin") {
        const toDo = new ToDo({
          type: req.body.type,
          task: req.body.task,
          done: req.body.done
        })

        toDo.save()
          .then(data => res.json(data))
          .catch(err => res.json({ message: err }))
      } else {
        res.status(401).json({ message: 'User is not correct' })
      }
    })
}
/*
//GET BACK A TODO BY ID
const toDo_details_one = (req, red) => {
  ToDo.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ message: "Ajjaj!" }))
}
*/

//UPDATE A TODO BY ID
const toDo_update_one = (req, res) => {
  //HA NEM JÖN BE ADAT, AKKOR FALSE. HANDLING KELL!!!!
  ToDo.updateOne(
    { _id: req.params.id },
    { $set: { done: req.body.done } }
  )
    .then(updatedToDo => res.json(updatedToDo))
    .catch(err => res.json({ message: err }))
}

//DELETE A TODO BY ID
const toDo_delete_one = (req, res) => {
  //HA NEM JÖN BE ADAT, AKKOR FALSE. HANDLING KELL!!!!
  ToDo.deleteOne({ _id: req.params.id }, function (err) {
    if (err) {
      console.log(err)
    } else {
      console.log("Successful deletion")
    }
  })
    .then(deletedToDo => res.json(deletedToDo))
    .catch(err => res.json({ message: err }))
}


module.exports = {
  toDo_create_get,
  toDo_create_post,
  //  toDo_details_one,
  toDo_update_one,
  toDo_delete_one
}