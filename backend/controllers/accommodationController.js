const Accommodation = require('../models/accommodationModel')
//accommodation_index         get all the box and inject that index view
//accommodation_details       get a single blog
//accommodation_delete        delete a blog

const accommodation_create_get = (req, res) => {
  Accommodation.find()
    .then(accommodation => res.json({ accommodation: accommodation, message: 'Found all accommodations' }))
    .catch(err => res.status(400).json({ message: `Couldn't find accommodation ${err}` }))
}

//itt nem kell a catch

const accommodation_create_post = (req, res) => {
  const accommodation = new Accommodation({
    name: req.body.name,
    address: {
      zip: req.body.address.zip,
      city: req.body.address.city,
      street: req.body.address.street,
      houseNumber: req.body.address.houseNumber,
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