const express = require('express')
const router = express.Router()
const Accommodation = require('../models/accommodationModel')

router.get('/', async (req, res) => {
  try {
    const accommodation = await Accommodation.find()
    res.json(accommodation)
  } catch (err) {
    res.json({ message: err })
  }
})

router.post('/', (req, res) => {
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
})

module.exports = router