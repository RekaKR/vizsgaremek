const fetch = require('node-fetch')
const jwt = require('jsonwebtoken')

require('dotenv').config()
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_SECRET = process.env.GOOGLE_SECRET
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI
const JWT_SECRET = process.env.JWT_SECRET

const User = require('../models/userModel')

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
    .then((res) => res.json())
    .then(data => getDataFromGoogle(data.id_token, res))
    .catch(() => res.status(404).json({ msg: 'Authentication failed!' }))

  const getDataFromGoogle = (data, res) => {
    const { sub, email, name, picture, given_name, family_name } = jwt.decode(data)

    const user = User.findOne({ googleId: sub })
      .then(user => {
        if (!user) {
          const user = new User({
            username: `${family_name} ${given_name}`,
            name: name,
            email: email,
            googleId: sub,
            picture: picture,
            plusOne: {
              isComing: false,
              name: "",
              foodSensitivity: ""
            },
            foodSensitivity: ""
          })

          user.save()
            .then(data => res.json(data))
            .catch(err => console.log(`somethingWentWrong ${err}`))
        }

        jwt.sign({
          "google": sub,
          "email": email,
          "name": name
        }, JWT_SECRET, { expiresIn: '1h' },
          (err, token) => res.json({ token: token }))
      })
      .catch(err => res.status(400).json({ message: `Couldn't find user ${err}` }))
  }

}

module.exports = {
  login_create_post
}