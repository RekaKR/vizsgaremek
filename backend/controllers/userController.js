const jwt = require('jsonwebtoken')

const User = require('../models/userModel')


//GET BACK THE LOGGED IN USER
const user_create_get = (req, res) => {
  googleId = jwt.decode(req.headers.authorization).google

  User.findOne({ googleId })
    .then(user => res.json({
      username: user.username,
      name: user.name,
      role: user.role,
      picture: user.picture,
      plusOne: user.plusOne,
      foodSensitivity: user.foodSensitivity
    }))
    .catch(err => res.status(403).json({ message: `Can\'t find user` }))
}


//NINCS MÉG KÉSZ
const user_update_isComing = (req, res) => {
  googleId = jwt.decode(req.headers.authorization).google
  console.log(req.body)

  User.updateOne(
    { googleId },
    {
      $set: {
        plusOne: {
          isComing: req.body.isComing
        }
      }
    }
  )
    .then(updatedPlusOne => res.status(200).json(updatedPlusOne))
    .catch(err => res.status(400).json({ message: 'Can\'t update this user' }))

  /*
    User.updateOne(
      { googleId },
      {
        $set: {
          isComing: req.body.name,
          foodSensitivity: req.body.foodSensitivity
        }
      }
    )
      .then(updatedPlusOne => res.status(200).json(updatedPlusOne))
      .catch(err => res.status(400).json({ message: 'Can\'t update this user' }))
  
      */
}

module.exports = {
  user_create_get,
  user_update_isComing
}