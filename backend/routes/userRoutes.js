const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const authenticationChecker = require('../middlewares/authenticationChecker')


router.get('/', authenticationChecker.guestChecker, userController.user_create_get_one)

router.get('/all', authenticationChecker.aChecker, userController.user_create_get_all)

router.patch('/plus-one', authenticationChecker.guestChecker, userController.user_update_isComing)

router.patch('/plus-one-details', authenticationChecker.guestChecker, userController.user_update_isComingDetails)

router.patch('/food-sensitivity', authenticationChecker.guestChecker, userController.user_update_foodSensitivity)


module.exports = router