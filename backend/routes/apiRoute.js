const express = require('express')
const router = express.Router()
const Api = require('../models/apiModel')

router.get('/', (req, res, next) => {
  res.send('We are on api')
  next()
})

router.post('/', (req, res) => {
  const api = new Api({
    name: req.body.name,
    article: req.body.article
  })

  api.save()
    .then(data => res.json(data))
    .catch(err => res.json({ message: err }))
})

router.get('/specific', (req, res) => {
  res.send('specific api')
})

module.exports = router