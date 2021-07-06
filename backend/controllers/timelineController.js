const Timeline = require('../models/timelineModel')

const timeline_create_get = async (req, res) => {
  try {
    const timelines = await Timeline.find()
    res.json(timelines)
  } catch (err) {
    res.json({ message: err })
  }
}

const timeline_create_post = (req, res) => {
  const timeline = new Timeline({
    time: req.body.time,
    happening: req.body.happening,
    place: req.body.place
  })

  timeline.save()
    .then(data => res.json(data))
    .catch(err => res.json({ message: err }))
}

module.exports = {
  timeline_create_get,
  timeline_create_post
}