const Accommodation = require('../models/accommodationModel')
//const User = require('../models/userModel')
//accommodation_index         get all the box and inject that index view
//accommodation_details       get a single blog


//GET BACK ALL THE ACCOMMODATIONS
const accommodation_create_get = (req, res) => {
  Accommodation.find()
    .then(accommodation => res.json(accommodation))
    .catch(err => res.status(400).json({ message: `Couldn't find accommodation` }))
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
    .catch(err => res.json({ message: 'Couldn\'t save accommodation' }))
}

//DELETE AN ACCOMMODATION BY ID
//HA NEM JÖN BE ADAT, AKKOR FALSE. HANDLING KELL!!!!
const accommodation_delete_one = (req, res) => {
  Accommodation.deleteOne({ _id: req.params.id }, function (err) {
    if (err) {
      console.log(err)
    } else {
      console.log("Successful deletion")
    }
  })
    .then(deletedAccommodation => res.json(deletedAccommodation))
    .catch(err => res.json({ message: err }))
}


module.exports = {
  accommodation_create_get,
  accommodation_create_post,
  accommodation_delete_one
}