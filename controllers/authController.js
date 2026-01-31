const jwt = require('jsonwebtoken')
require('dotenv').config()

const authController = {}

authController.googleCallback = (req, res) => {
  try {
    // Generate JWT
    const token = jwt.sign(
      { id: req.user._id, name: req.user.name },
      process.env.JWT_TOKEN,
      { expiresIn: '1h' }
    )
    res.status(200).json({
      message: 'Login success',
      user: req.user,
      token,
    })
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = authController
