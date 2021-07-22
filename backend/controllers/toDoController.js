const jwt = require('jsonwebtoken')

require('dotenv').config()
const JWT_SECRET = process.env.JWT_SECRET

const ToDo = require('../models/toDoModel')

const toDo_create_get = (req, res) => {
  ToDo.find()
    .then(toDos => res.json(toDos))
    .catch(err => res.status(400).json({ message: `Couldn't find to-dos ${err}` }))
  //403-as, a visszajövő kód nem megfelelő annak, amit vizsgálok; ha nincs ilyen header, akkor 401; van jwt-t, de nem mi írtuk alá: 401
}

const toDo_create_post = (req, res) => {
  try {
    jwt.verify(req.headers.authorization, JWT_SECRET)

    const toDo = new ToDo({
      type: req.body.type,
      task: req.body.task,
      done: req.body.done
    })

    toDo.save()
      .then(data => res.json(data))
      .catch(err => res.json({ message: err }))
  } catch (err) {
    return res.status(401).json({ message: 'Token invalid' });
  }
}

//GET BACK A SPECIFIC POST BY URL
const toDo_details_one = (req, red) => {
  ToDo.findById(req.params.postId)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ message: "Ajjaj!" }))
}

//UPDATE A SPECIFIC POST BY URL
const toDo_update_one = (req, res) => {

  //HA NEM JÖN BE ADAT, AKKOR FALSE. HANDLING
  //console.log(req.params.postId)
  ToDo.updateOne(
    { _id: req.params.postId },
    { $set: { done: req.body.done } }
  )
    .then(updatedToDo => res.json(updatedToDo))
    .catch(err => res.json({ message: err }))
}

//DELETE A SPECIFIC POST BY URL
const toDo_delete_one = (req, res) => {
  ToDo.deleteOne({ _id: req.params.postid })
    .then(deletedToDo => res.json(deletedToDo))
    .catch(err => res.json({ message: err }))
}


module.exports = {
  toDo_create_get,
  toDo_create_post,
  toDo_details_one,
  toDo_update_one,
  toDo_delete_one
}