const { body, param, validationResult } = require('express-validator')

const validate = {}

validate.createExpenseRules = function () {
  return [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('amount')
      .isFloat({ gt: 0 })
      .withMessage('Amount must be greater than 0'),
    body('category')
      .isIn(['Food', 'Transport', 'Rent', 'Utilities', 'Other'])
      .withMessage('Invalid category'),
    body('paymentMethod')
      .isIn(['Cash', 'Card', 'Mobile Money'])
      .withMessage('Invalid payment method'),
    body('date')
      .isISO8601()
      .toDate()
      .withMessage('Date must be a valid ISO date'),
  ]
}

validate.updateExpenseRules = function () {
  return [
    param('id').isMongoId().withMessage('Invalid expense ID'),
    body('title').optional().trim().notEmpty(),
    body('amount').optional().isFloat({ gt: 0 }),
    body('category')
      .optional()
      .isIn(['Food', 'Transport', 'Rent', 'Utilities', 'Other']),
    body('paymentMethod').optional().isIn(['Cash', 'Card', 'Mobile Money']),
    body('date').optional().isISO8601().toDate(),
  ]
}

validate.deleteExpenseRules = function () {
  return [param('id').isMongoId().withMessage('Invalid expense ID')]
}

validate.getExpenseByIdRules = function () {
  return [param('id').isMongoId().withMessage('Invalid expense ID')]
}
validate.validateRules = async function (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const allErrors = errors.array().map((err) => err.msg)
    return res.status(400).json({
      errors: allErrors,
    })
  }
  next()
}

module.exports = validate
