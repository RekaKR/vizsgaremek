//const jwt = require('jsonwebtoken')
//require('dotenv').config()
//const JWT_SECRET = process.env.JWT_SECRET

const Timeline = require('../models/timelineModel')
//const User = require('../models/userModel')


//GET BACK ALL THE TIMELINES
const timeline_create_get = (req, res) => {
  Timeline.find()
    .then(timelines => res.json(timelines))
    .catch(err => res.status(400).json({ message: `Couldn't find accommodation ${err}` }))
}

//POST TO SERVER A TIMELINE
//done
const timeline_create_post = (req, res) => {
  const timeline = new Timeline({
    time: req.body.time,
    happening: req.body.happening,
    place: req.body.place
  })

  timeline.save()
    .then(data => res.json(data))
    .catch(err => res.json({ message: 'Couldn\'t save timeline' }))
}


module.exports = {
  timeline_create_get,
  timeline_create_post
}