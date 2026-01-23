const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    provider: { type: String, required: true, enum: ['google'] },
    providerId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String },
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)
