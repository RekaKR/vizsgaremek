const jwt = require('jsonwebtoken')

require('dotenv').config()
const JWT_SECRET = process.env.JWT_SECRET

const Accommodation = require('../models/accommodationModel')
const User = require('../models/userModel')
//accommodation_index         get all the box and inject that index view
//accommodation_details       get a single blog


//GET BACK ALL THE ACCOMMODATIONS
const accommodation_create_get = (req, res) => {
  Accommodation.find()
    .then(accommodation => res.json(accommodation))
    .catch(err => res.status(400).json({ message: `Couldn't find accommodation ${err}` }))
}

//POST TO SERVER AN ACCOMMODATION
//!!!!!!!!!!! EZ JÓ !!!!!!!!!!!!!
const accommodation_create_post = (req, res) => {
  let payload

  if (!req.headers.authorization) return res.status(401).json({ message: 'Token missing' })

  try {
    payload = jwt.verify(req.headers.authorization, JWT_SECRET)
  } catch (err) {
    return res.status(401).json({ message: 'Token invalid' })
  }

  if (payload.role !== 'admin') return res.status(401).json({ message: 'User is not correct' })

  const accommodation = new Accommodation({
    name: req.body.name,
    address: {
      zip: req.body.zip,
      city: req.body.city,
      street: req.body.street,
      houseNumber: req.body.houseNumber,
    },
    phoneNumber: req.body.phoneNumber,
    website: req.body.website
  })

  accommodation.save()
    .then(data => res.json(data))
    .catch(err => res.json({ message: 'Couldn\'t save accommodation', err: err }))
}


module.exports = {
  accommodation_create_get,
  accommodation_create_post
}