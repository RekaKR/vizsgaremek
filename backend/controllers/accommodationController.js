const Accommodation = require('../models/accommodationModel')
//accommodation_index         get all the box and inject that index view
//accommodation_details       get a single blog
//accommodation_delete        delete a blog

const accommodation_create_get = async (req, res) => {
  try {
    const accommodation = await Accommodation.find()
    res.json(accommodation)
  } catch (err) {
    res.json({ message: err })
  }
}

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
    .catch(err => res.json({ message: err }))
}

module.exports = {
  accommodation_create_get,
  accommodation_create_post
}