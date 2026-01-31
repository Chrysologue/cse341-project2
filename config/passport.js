const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth2').Strategy
const User = require('../models/User')
require('dotenv').config()

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      //The production URL will be handle dynamically
      callbackURL:
        process.env.NODE_ENV === 'production'
          ? 'https://cse341-project2-15tl.onrender.com/auth/google/callback'
          : 'http://localhost:7700/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        //Check if user exists
        let user = await User.findOne({ googleId: profile.id })
        if (!user) {
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value,
          })
        }
        return done(null, user)
      } catch (e) {
        return done(e, null)
      }
    }
  )
)

passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => done(null, user))
})

module.exports = passport
