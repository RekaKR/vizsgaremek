const express = require('express')
const router = express.Router()
const Data = require('../models/apiModel')

router.get('/', (req, res) => {
  res.send('We are on api')
})

router.post('/', (req, res) => {
  //console.log(req.body)
  const post = new Data({
    name: req.body.name,
    article: req.body.article
  })

  post.save()
    .then(data => res.json(data))
    .catch(err => res.json({ message: err }))
})

//Can have multiple here
router.get('/specific', (req, res) => {
  res.send('specific api')
})

module.exports = router