const express = require('express')
const router = express.Router()
const expenseController = require('../controllers/expenseController')
const utilities = require('../utilities/index')
const validate = require('../utilities/validator')
const auth = require('../middleware/auth')

router.get(
  '/',
  auth,
  utilities.handleAsyncErrors(expenseController.getAllExpenses)
)
router.get(
  '/:id',
  auth,
  validate.getExpenseByIdRules(),
  validate.validateRules,
  utilities.handleAsyncErrors(expenseController.findExpenseById)
)
router.post(
  '/',
  auth,
  validate.createExpenseRules(),
  validate.validateRules,
  utilities.handleAsyncErrors(expenseController.createExpense)
)
router.put(
  '/:id',
  auth,
  validate.updateExpenseRules(),
  validate.validateRules,
  utilities.handleAsyncErrors(expenseController.updateExpense)
)
router.delete(
  '/:id',
  auth,
  validate.deleteExpenseRules(),
  validate.validateRules,
  utilities.handleAsyncErrors(expenseController.deleteExpense)
)

module.exports = router
