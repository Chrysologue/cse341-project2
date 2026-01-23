const { connectToDb } = require('../database/db')
const Expense = require('../models/Expense')
const mongoose = require('mongoose')

const expenseCont = {}

expenseCont.createExpense = async function (req, res) {
  try {
    await connectToDb()
    const dummyUserId = '65af2c8e9f3a2c0012ab45cd'
    const newExpense = await Expense.create({
      ...req.body,
      userId: dummyUserId,
    })
    console.log('Expense inserted successfully')
    res.status(201).json({
      message: 'Expense created successfully',
      expense: newExpense,
    })
  } catch (e) {
    console.log(e.message)
    res.status(500).json({
      error: 'Internal server error',
    })
  }
}

expenseCont.getAllExpenses = async function (req, res) {
  try {
    await connectToDb()
    const allExpenses = await Expense.find()
    if (allExpenses.length === 0) {
      return res.status(404).json({ error: 'No expense found' })
    }
    console.log('All expenses retrieved')
    res.status(200).json(allExpenses)
  } catch (e) {
    console.log(e.message)
    res.status(500).json({
      error: 'Internal server error',
    })
  }
}

expenseCont.findExpenseById = async (req, res) => {
  try {
    const id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid expense id' })
    }
    const expense = await Expense.findById(id)
    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' })
    }
    console.log('Expense retrieved')
    res.status(200).json(expense)
  } catch (e) {
    console.log(e.message)
    res.status(500).json({
      error: 'Internal server error',
    })
  }
}

expenseCont.updateExpense = async function (req, res) {
  try {
    const id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid expense id' })
    }
    const toUpdate = { ...req.body }
    delete toUpdate._id
    const result = await Expense.findByIdAndUpdate(id, toUpdate, {
      new: true,
      runValidators: true,
    })
    if (!result) {
      return res.status(404).json({ error: 'Expense not found' })
    }
    console.log('Expense updated successfully')
    res.status(200).json({
      message: 'Expense updated successfully',
      updatedExpense: result,
    })
  } catch (e) {
    console.log(e.message)
    res.status(500).json({
      error: 'Internal server error',
    })
  }
}

expenseCont.deleteExpense = async function (req, res) {
  try {
    const id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid expense id' })
    }
    const result = await Expense.findByIdAndDelete(id)
    if (!result) {
      return res.status(404).json({ error: 'Expense not found' })
    }
    res.status(200).json({
      message: 'Expense deleted successfully',
    })
  } catch (e) {
    console.log(e.message)
    res.status(500).json({
      error: 'Internal server error',
    })
  }
}
module.exports = expenseCont
