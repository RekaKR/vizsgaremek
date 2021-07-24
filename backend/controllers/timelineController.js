const jwt = require('jsonwebtoken')

require('dotenv').config()
const JWT_SECRET = process.env.JWT_SECRET

const Timeline = require('../models/timelineModel')
const User = require('../models/userModel')


//GET BACK ALL THE TIMELINES
const timeline_create_get = (req, res) => {
  Timeline.find()
    .then(timelines => res.json(timelines))
    .catch(err => res.status(400).json({ message: `Couldn't find accommodation ${err}` }))
}

//POST TO SERVER A TIMELINE
const timeline_create_post = (req, res) => {
  let payload

  if (!req.headers.authorization) return res.status(401).json({ message: 'Token missing' })

  try {
    payload = jwt.verify(req.headers.authorization, JWT_SECRET)
  } catch (err) {
    return res.status(401).json({ message: 'Token invalid' })
  }

  User.findOne({ googleId: payload.google })
    .then(user => {
      if (user && user.role === "admin") {
        const timeline = new Timeline({
          time: req.body.time,
          happening: req.body.happening,
          place: req.body.place
        })

        timeline.save()
          .then(data => res.json(data))
          .catch(err => res.json({ message: err }))
      } else {
        res.status(401).json({ message: 'User is not correct' })
      }
    })
}


module.exports = {
  timeline_create_get,
  timeline_create_post
}