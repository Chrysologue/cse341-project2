const express = require('express')
const router = express.Router()
const passport = require('../config/passport')
const authController = require('../controllers/authController')
const utilities = require('../utilities/index')

//Step 1: start Google login:
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

//Step 2: Google callback
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/' }),
  utilities.handleAsyncErrors(authController.googleCallback)
)

module.exports = router
