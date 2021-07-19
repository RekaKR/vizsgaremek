const express = require('express')
const router = express.Router()
const toDoController = require('../controllers/toDoController')

router.get('/', toDoController.toDo_create_get)

router.post('/', toDoController.toDo_create_post)

module.exports = router