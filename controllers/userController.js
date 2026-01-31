const User = require('../models/User')
const mongoose = require('mongoose')

const userCont = {}

userCont.getAllUsers = async function (req, res) {
  try {
    const allUsers = await User.find()
    if (allUsers.length === 0) {
      console.log('No users found')
      return res.status(404).json({ error: 'No users found' })
    }
    console.log('All users retreived')
    res.status(200).json(allUsers)
  } catch (e) {
    console.log(e.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}

userCont.createUser = async (req, res) => {
  try {
    const insertedUser = await User.create(req.body)
    res.status(201).json({
      message: 'User created successfully',
      user: insertedUser,
    })
  } catch (e) {
    console.log(e.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}

userCont.getUserById = async function (req, res) {
  try {
    const id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log('Invalid user ID')
      return res.status(400).json({ error: 'Invalid user ID' })
    }
    const user = await User.findById(id)
    if (!user) {
      console.log('User not found')
      return res.status(404).json({ error: 'User not found' })
    }
    console.log('User retrieved successfully')
    res.status(200).json({ message: 'User retrieved successfully', user })
  } catch (e) {
    console.log(e.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}

userCont.updateUserById = async function (req, res) {
  try {
    const id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log('Invalid user ID')
      return res.status(400).json({ error: 'Invalid user ID' })
    }
    const userToUpdate = req.body
    delete userToUpdate._id
    const updatedUser = await User.findByIdAndUpdate(id, userToUpdate, {
      new: true,
      runValidators: true,
    })
    if (!updatedUser) {
      console.log('User not found')
      return res.status(404).json({ error: 'User not found' })
    }
    res.status(200).json({ message: 'User updated successfully', updatedUser })
  } catch (e) {
    console.log(e.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}

userCont.deleteUserById = async function (req, res) {
  try {
    const id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log('Invalid user ID')
      return res.status(400).json({ error: 'Invalid user ID' })
    }
    const result = await User.findByIdAndDelete(id)
    if (!result) {
      return res.status(404).json({ error: 'User not found' })
    }
    console.log('User deleted successfully')
    res.status(200).json({
      message: 'User deleted successfully',
    })
  } catch (e) {
    console.log(e.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = userCont
