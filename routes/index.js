const express = require('express')
const router = express.Router()
const expenseController = require('../controllers/expenseController')
const utilities = require('../utilities/index')
const validate = require('../utilities/validator')

router.get('/', utilities.handleAsyncErrors(expenseController.getAllExpenses))
router.get(
  '/:id',
  validate.getExpenseByIdRules(),
  validate.validateRules,
  utilities.handleAsyncErrors(expenseController.findExpenseById)
)
router.post(
  '/',
  validate.createExpenseRules(),
  validate.validateRules,
  utilities.handleAsyncErrors(expenseController.createExpense)
)
router.put(
  '/:id',
  validate.updateExpenseRules(),
  validate.validateRules,
  utilities.handleAsyncErrors(expenseController.updateExpense)
)
router.delete(
  '/:id',
  validate.deleteExpenseRules(),
  validate.validateRules,
  utilities.handleAsyncErrors(expenseController.deleteExpense)
)

module.exports = router
