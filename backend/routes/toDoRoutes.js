const express = require('express')
const router = express.Router()
const toDoController = require('../controllers/toDoController')

router.get('/', toDoController.toDo_create_get)

router.post('/', toDoController.toDo_create_post)

//router.get('/:postId', toDoController.toDo_details)

//router.delete('/:postId', toDoController.toDo_delete)

router.patch('/:postId', toDoController.toDo_update_one)


module.exports = router