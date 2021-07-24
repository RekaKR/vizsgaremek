const fetch = require('node-fetch')
const jwt = require('jsonwebtoken')

require('dotenv').config()
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_SECRET = process.env.GOOGLE_SECRET
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI
const JWT_SECRET = process.env.JWT_SECRET

const User = require('../models/userModel')
const EmailList = require('../models/EmailListModel')


//CREATE A USER
const login_create_post = (req, res) => {
  fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code: req.body.code,
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_SECRET,
      redirect_uri: GOOGLE_REDIRECT_URI,
      grant_type: "authorization_code"
    }),
  })
    .then(res => res.json())
    .then(data => getDataFromGoogle(data.id_token, res))
    .catch(() => res.status(404).json({ message: 'Authentication failed!' }))
}

const getDataFromGoogle = (data, res) => {
  const { sub, email, name, picture, given_name, family_name } = jwt.decode(data)

  EmailList.findOne({ email: email })
    .then(foundEmail => {
      if (!foundEmail) return res.status(400).json({ message: 'Couldn\'t find email' })

      User.findOne({ googleId: sub })
        .then(user => {
          if (!user) {
            user = new User({
              username: given_name,
              name: name,
              email: foundEmail.email,
              googleId: sub,
              picture: picture,
              role: foundEmail.role,
              plusOne: {
                isComing: false,
                name: "",
                foodSensitivity: ""
              },
              foodSensitivity: ""
            })

            user.save()
              .then(res => console.log("Done saving new user"))
          }
        })

      jwt.sign({
        "google": sub,
        "email": foundEmail.email,
        "name": name,
        "role": foundEmail.role
      }, JWT_SECRET, { expiresIn: '1h' },
        (err, token) => res.json({ token: token }))
    })
}


module.exports = {
  login_create_post
}