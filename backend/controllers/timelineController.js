const Timeline = require('../models/timelineModel')

const timeline_create_get = (req, res) => {
  Timeline.find()
    .then(timelines => res.json({ timelines: timelines }))
    .catch(err => res.status(400).json({ message: `Couldn't find accommodation ${err}` }))
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