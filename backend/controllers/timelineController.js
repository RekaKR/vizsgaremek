const Timeline = require('../models/timelineModel')


//GET BACK ALL THE TIMELINES
const timeline_create_get = (req, res) => {
  Timeline.find()
    .then(timelines => res.json(timelines))
    .catch(err => res.status(403).json({ message: `Can\'t find events` }))
}

//POST TO SERVER A TIMELINE
const timeline_create_post = (req, res) => {
  const timeline = new Timeline({
    time: req.body.time,
    happening: req.body.happening,
    place: req.body.place
  })

  timeline.save()
    .then(data => res.json(data))
    .catch(err => res.status(401).json({ message: 'Can\'t save this event' }))
}

//DELETE A TIMELINE BY ID
const timeline_delete_one = (req, res) => {
  Timeline.deleteOne({ _id: req.params.id })
    .then(deletedTimeline => res.json(deletedTimeline))
    .catch(err => res.status(400).json({ message: 'Can\'t delete this event' }))
}


module.exports = {
  timeline_create_get,
  timeline_create_post,
  timeline_delete_one
}