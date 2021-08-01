const GoodWish = require('../models/goodWishModel')


//GET BACK ALL THE GOOD WISHES
const goodWish_create_get = (req, res) => {
  GoodWish.find()
    .then(goodWish => res.json(goodWish))
    .catch(err => res.status(403).json({ message: `Can\'t find good wishes` }))
}

//POST TO SERVER A GOOD WISH
const goodWish_create_post = (req, res) => {
  const goodWish = new GoodWish({
    goodWish: req.body.goodWish,
    from: req.body.from,
    email: req.body.email
  })

  goodWish.save()
    .then(data => res.json(data))
    .catch(err => res.status(401).json({ message: 'Can\'t save good wish' }))
}


module.exports = {
  goodWish_create_get,
  goodWish_create_post
}