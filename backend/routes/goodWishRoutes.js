const express = require('express')
const router = express.Router()
const goodWishController = require('../controllers/goodWishController')
const authenticationChecker = require('../middlewares/authenticationChecker')


router.get('/', authenticationChecker.aChecker, goodWishController.goodWish_create_get)

router.post('/', authenticationChecker.guestChecker, goodWishController.goodWish_create_post)


module.exports = router