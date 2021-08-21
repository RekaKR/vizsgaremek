const jwt = require('jsonwebtoken')

require('dotenv').config()
const JWT_SECRET = process.env.JWT_SECRET


const aChecker = (req, res, next) => {
  let payload

  if (!req.headers.authorization) return res.status(401).json({ message: 'Token missing' })

  try {
    payload = jwt.verify(req.headers.authorization, JWT_SECRET)
  } catch (err) {
    return res.status(401).json({ message: 'Token invalid' })
  }

  if (payload.role !== 'couple' && payload.role !== 'weddingP') return res.status(401).json({ message: 'User is not correct' })

  next()
}

const guestChecker = (req, res, next) => {
  let payload

  if (!req.headers.authorization) return res.status(401).json({ message: 'Token missing' })

  try {
    payload = jwt.verify(req.headers.authorization, JWT_SECRET)
  } catch (err) {
    return res.status(401).json({ message: 'Token invalid' })
  }

  if (payload.role !== 'couple' && payload.role !== 'weddingP' && payload.role !== 'guest') return res.status(401).json({ message: 'User is not correct' })

  next()
}


module.exports = {
  aChecker,
  guestChecker
}