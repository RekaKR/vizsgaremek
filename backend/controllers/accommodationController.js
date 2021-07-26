const Accommodation = require('../models/accommodationModel')


//GET BACK ALL THE ACCOMMODATIONS
const accommodation_create_get = (req, res) => {
  Accommodation.find()
    .then(accommodation => res.json(accommodation))
    .catch(err => res.status(403).json({ message: `Can\'t find accommodation` }))
}

//POST TO SERVER AN ACCOMMODATION
//done
const accommodation_create_post = (req, res) => {
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
    .catch(err => res.status(401).json({ message: 'Can\'t save accommodation' }))
}

//DELETE AN ACCOMMODATION BY ID
//done
const accommodation_delete_one = (req, res) => {
  Accommodation.deleteOne({ _id: req.params.id })
    .then(deletedAccommodation => res.json(deletedAccommodation))
    .catch(err => res.status(400).json({ message: 'Can\'t delete this accommodation' }))
}


module.exports = {
  accommodation_create_get,
  accommodation_create_post,
  accommodation_delete_one
}