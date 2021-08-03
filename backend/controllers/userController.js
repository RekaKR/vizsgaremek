const jwt = require('jsonwebtoken')

const User = require('../models/userModel')


//GET BACK THE LOGGED IN USER'S PROFILE
const user_create_get = (req, res) => {
  const googleId = jwt.decode(req.headers.authorization).google

  User.findOne({ googleId })
    .then(user => res.json({
      username: user.username,
      name: user.name,
      email: user.email,
      role: user.role,
      picture: user.picture,
      plusOne: user.plusOne,
      foodSensitivity: user.foodSensitivity
    }))
    .catch(err => res.status(403).json({ message: `Can\'t find user` }))
}

const user_update_isComing = (req, res) => {
  const googleId = jwt.decode(req.headers.authorization).google

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
}

const user_update_isComingDetails = (req, res) => {
  const googleId = jwt.decode(req.headers.authorization).google

  User.updateOne(
    { googleId },
    {
      $set: {
        plusOne: {
          isComing: req.body.isComing,
          name: req.body.name,
          foodSensitivity: req.body.foodSensitivity
        }
      }
    }
  )
    .then(updatedPlusOne => res.status(200).json(updatedPlusOne))
    .catch(err => res.status(400).json({ message: 'Can\'t update this user' }))
}

const user_update_foodSensitivity = (req, res) => {
  const googleId = jwt.decode(req.headers.authorization).google

  User.updateOne(
    { googleId },
    {
      $set: {
        foodSensitivity: req.body.foodSensitivity
      }
    }
  )
    .then(updatedPlusOne => res.status(200).json(updatedPlusOne))
    .catch(err => res.status(400).json({ message: 'Can\'t update this user' }))
}


module.exports = {
  user_create_get,
  user_update_isComing,
  user_update_isComingDetails,
  user_update_foodSensitivity
}