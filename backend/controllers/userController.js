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

module.exports = {
  user_create_get
}