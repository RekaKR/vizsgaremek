const express = require('express')
const router = express.Router()
const Timeline = require('../models/timelineModel')

router.get('/', async (req, res) => {
  try {
    const timelines = await Timeline.find()
    res.json(timelines)
  } catch (err) {
    res.json({ message: err })
  }
})

router.post('/', (req, res) => {
  const timeline = new Timeline({
    time: req.body.time,
    happening: req.body.happening,
    place: req.body.place
  })

  timeline.save()
    .then(data => res.json(data))
    .catch(err => res.json({ message: err }))
})

module.exports = router