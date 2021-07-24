const jwt = require('jsonwebtoken')

require('dotenv').config()
const JWT_SECRET = process.env.JWT_SECRET

const EmailList = require('../models/EmailListModel')
const User = require('../models/userModel')

//GET BACK ALL THE EMAILLISTS
const emailList_create_get = (req, res) => {
  EmailList.find()
    .then(emailLists => res.json(emailLists))
    .catch(err => res.status(400).json({ message: `Couldn't find accommodation ${err}` }))
}

//POST TO SERVER AN EMAILLIST
const emailList_create_post = (req, res) => {
  let payload

  if (!req.headers.authorization) return res.status(401).json({ message: 'Token missing' })

  try {
    payload = jwt.verify(req.headers.authorization, JWT_SECRET)
  } catch (err) {
    return res.status(401).json({ message: 'Token invalid' })
  }

  User.findOne({ googleId: payload.google })
    .then(user => {
      if (user && user.role === "admin") {
        const emailList = new EmailList({
          email: req.body.email,
          role: req.body.role
        })

        emailList.save()
          .then(data => res.json(data))
          .catch(err => res.json({ message: 'Couldn\'t save email list', err: err }))
      } else {
        res.status(401).json({ message: 'User is not correct' })
      }
    })
}

//DELETE A TODO BY ID
//HA NEM JÖN BE ADAT, AKKOR FALSE. HANDLING KELL!!!!
const emailList_delete_one = (req, res) => {
  console.log('YOLO')
  console.log(req.params.id)

  EmailList.deleteOne({ _id: req.params.id }, function (err) {
    if (err) {
      console.log(err)
    } else {
      console.log("Successful deletion")
    }
  })
    .then(deletedEmailList => res.json(deletedEmailList))
    .catch(err => res.json({ message: err }))
}


module.exports = {
  emailList_create_get,
  emailList_create_post,
  emailList_delete_one
}