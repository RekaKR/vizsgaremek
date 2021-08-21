const express = require('express')
const router = express.Router()
const toDoController = require('../controllers/toDoController')
const authenticationChecker = require('../middlewares/authenticationChecker')


router.get('/', authenticationChecker.aChecker, toDoController.toDo_create_get)

router.post('/', authenticationChecker.aChecker, toDoController.toDo_create_post)

router.patch('/:id', authenticationChecker.aChecker, toDoController.toDo_update_one)

router.delete('/:id', authenticationChecker.aChecker, toDoController.toDo_delete_one)


module.exports = router