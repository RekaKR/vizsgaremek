const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')


router.get('/', userController.user_create_get_one)

router.get('/all', userController.user_create_get_all)

router.patch('/plus-one', userController.user_update_isComing)

router.patch('/plus-one-details', userController.user_update_isComingDetails)

router.patch('/food-sensitivity', userController.user_update_foodSensitivity)


module.exports = router