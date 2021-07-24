const express = require('express')
const router = express.Router()
const timelineController = require('../controllers/timelineController')
const authenticationChecker = require('../middlewares/authenticationChecker')


router.get('/', timelineController.timeline_create_get)

router.post('/', authenticationChecker.aChecker, timelineController.timeline_create_post)


module.exports = router