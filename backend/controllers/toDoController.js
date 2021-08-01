const ToDo = require('../models/toDoModel')


//GET BACK ALL THE TODOS
const toDo_create_get = (req, res) => {
  ToDo.find()
    .then(toDos => res.json(toDos))
    .catch(err => res.status(403).json({ message: `Can\'t find to-dos` }))
  //403-as, a visszajövő kód nem megfelelő annak, amit vizsgálok;
}

//POST TO SERVER A TODO
//done
const toDo_create_post = (req, res) => {
  const toDo = new ToDo({
    type: req.body.type,
    task: req.body.task,
    done: req.body.done
  })

  toDo.save()
    .then(data => res.json(data))
    .catch(err => res.status(401).json({ message: 'Can\'t save to-do' }))
}

//UPDATE A TODO BY ID
//done
//teszt kell <--- !!!!!
const toDo_update_one = (req, res) => {
  ToDo.updateOne(
    { _id: req.params.id },
    {
      $set: {
        done: req.body.done
      }
    }
  )
    .then(updatedToDo => res.json(updatedToDo))
    .catch(err => res.status(400).json({ message: 'Can\'t update this to-do' }))
}

//DELETE A TODO BY ID
//done
//teszt kell <--- !!!!!
const toDo_delete_one = (req, res) => {
  ToDo.deleteOne({ _id: req.params.id })
    .then(deletedToDo => res.json(deletedToDo))
    .catch(err => res.status(400).json({ message: 'Can\'t delete this to-do' }))
}


module.exports = {
  toDo_create_get,
  toDo_create_post,
  toDo_update_one,
  toDo_delete_one
}