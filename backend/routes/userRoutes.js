const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')


router.get('/', userController.user_create_get)

router.patch('/', userController.user_update_one)


module.exports = router