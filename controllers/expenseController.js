const Expense = require('../models/Expense')
const mongoose = require('mongoose')

const expenseCont = {}

expenseCont.createExpense = async function (req, res) {
  try {
    const newExpense = await Expense.create({
      ...req.body,
      userId: req.user.id,
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
    const allExpenses = await Expense.find({ userId: req.user.id })
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
    const expenseId = req.params.id
    const userId = req.user.id
    if (!mongoose.Types.ObjectId.isValid(expenseId)) {
      return res.status(400).json({ error: 'Invalid expense id' })
    }
    const expense = await Expense.findOne({ _id: expenseId, userId: userId })
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
    const expenseId = req.params.id
    const userId = req.user.id
    if (!mongoose.Types.ObjectId.isValid(expenseId)) {
      return res.status(400).json({ error: 'Invalid expense id' })
    }
    const expense = await Expense.findById(expenseId)
    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' })
    }

    if (!expense.userId.equals(userId)) {
      return res.status(403).json({ error: 'Forbidden, cannot update expense' })
    }
    const result = await Expense.findByIdAndUpdate(expenseId, req.body, {
      new: true,
      runValidators: true,
    })
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
    const expenseId = req.params.id
    const userId = req.user.id
    if (!mongoose.Types.ObjectId.isValid(expenseId)) {
      return res.status(400).json({ error: 'Invalid expense id' })
    }
    const deletedExpense = await Expense.findOneAndDelete({
      _id: expenseId,
      userId: userId,
    })
    if (!deletedExpense) {
      return res.status(404).json({ error: 'Expense not found or forbidden' })
    }
    res.status(200).json({
      message: 'Expense deleted successfully',
      deletedExpense,
    })
  } catch (e) {
    console.log(e.message)
    res.status(500).json({
      error: 'Internal server error',
    })
  }
}
module.exports = expenseCont
