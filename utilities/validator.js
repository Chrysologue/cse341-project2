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

validate.createUserRules = function () {
  return [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Incorrect email format'),
    body('dateOfBirth')
      .isISO8601()
      .toDate()
      .withMessage('Date of birth must be a valid ISO date'),
  ]
}
validate.updateUserRules = function () {
  return [
    param('id').isMongoId().withMessage('Invalid user ID'),
    body('name').optional().trim().notEmpty(),
    body('email').optional().trim().notEmpty(),
    body('avatar').optional().trim().notEmpty(),
    body('phoneNumber').optional().trim().notEmpty(),
    body('dateOfBirth').optional().isISO8601().toDate(),
  ]
}
validate.deleteUserRules = function () {
  return [param('id').isMongoId().withMessage('Invalid user ID')]
}
validate.getUserByIdRules = function () {
  return [param('id').isMongoId().withMessage('Invalid User ID')]
}
validate.validateUserRules = async function (req, res, next) {
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
