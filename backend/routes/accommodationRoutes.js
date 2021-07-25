const express = require('express')
const router = express.Router()
const accommodationController = require('../controllers/accommodationController')
const authenticationChecker = require('../middlewares/authenticationChecker')


router.get('/', accommodationController.accommodation_create_get)

router.post('/', authenticationChecker.aChecker, accommodationController.accommodation_create_post)

router.delete('/:id', authenticationChecker.aChecker, accommodationController.accommodation_delete_one)


module.exports = router