const express = require('express')
const router = express.Router()
const timelineController = require('../controllers/timelineController')

router.get('/', timelineController.timeline_create_get)

router.post('/', timelineController.timeline_create_post)

module.exports = router