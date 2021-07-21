const express = require('express')
const router = express.Router()
const loginController = require('../controllers/loginController')

router.post('/', loginController.login_create_post)

module.exports = router