const jwt = require('jsonwebtoken')
require('dotenv').config()

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization missing' })
  }
  const [scheme, token] = authHeader.split(' ')

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Invalid token' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN)
    req.user = decoded
    next()
  } catch (e) {
    console.log(e.message)
    return res.status(401).json({ error: 'Invalid token' })
  }
}

module.exports = auth
