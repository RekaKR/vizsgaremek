const EmailList = require('../models/EmailListModel')


//GET BACK ALL THE EMAILLISTS
const emailList_create_get = (req, res) => {
  EmailList.find()
    .then(emaillists => res.json(emaillists))
    .catch(err => res.status(403).json({ message: `Can\'t find email list` }))
}

//POST TO SERVER AN EMAILLIST
const emailList_create_post = (req, res) => {
  const emailList = new EmailList({
    email: req.body.email,
    role: req.body.role
  })

  emailList.save()
    .then(data => res.json(data))
    .catch(err => res.status(401).json({ message: 'Can\'t save email list' }))
}

//DELETE AN EMAILLIST BY ID
const emailList_delete_one = (req, res) => {
  EmailList.deleteOne({ _id: req.params.id })
    .then(deletedEmailList => res.json(deletedEmailList))
    .catch(err => res.status(400).json({ message: 'Can\'t delete this email-list' }))
}


module.exports = {
  emailList_create_get,
  emailList_create_post,
  emailList_delete_one
}