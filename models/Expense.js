const mongoose = require('mongoose')

const expenseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    amount: { type: Number, required: true, min: 0 },
    category: {
      type: String,
      required: true,
      enum: ['Food', 'Transport', 'Rent', 'Utilities', 'Other'],
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ['Cash', 'Card', 'Mobile Money'],
    },
    note: { type: String },
    date: { type: Date, required: true },
    location: { type: String },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Expense', expenseSchema)
