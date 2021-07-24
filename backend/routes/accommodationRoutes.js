const express = require('express')
const router = express.Router()
const accommodationController = require('../controllers/accommodationController')


router.get('/', accommodationController.accommodation_create_get)

router.post('/', accommodationController.accommodation_create_post)


module.exports = router