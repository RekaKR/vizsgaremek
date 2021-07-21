//const jwt = require('jsonwebtoken')

//require('dotenv').config()
//const JWT_SECRET = process.env.JWT_SECRET

const Accommodation = require('../models/accommodationModel')
//accommodation_index         get all the box and inject that index view
//accommodation_details       get a single blog
//accommodation_delete        delete a blog

const accommodation_create_get = (req, res) => {
  Accommodation.find()
    .then(accommodation => {
      res.json(accommodation)
    })
    .catch(err => res.status(400).json({ message: `Couldn't find accommodation ${err}` }))
}

//itt nem kell a catch

const accommodation_create_post = (req, res) => {
  /*if (jwt.verify(req.headers.authorization, "JWT_SECRET")) {
        console.log(jwt.verify(req.headers.authorization, JWT_SECRET))
      }*/
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