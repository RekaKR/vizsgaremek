const express = require('express')
const router = express.Router()
const toDoController = require('../controllers/toDoController')

router.get('/', toDoController.toDo_create_get)

router.post('/', toDoController.toDo_create_post)

router.patch('/:id', toDoController.toDo_update_one)

router.delete('/:id', toDoController.toDo_delete_one)

//router.get('/:id', toDoController.toDo_details)


module.exports = router