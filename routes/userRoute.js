const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const validate = require('../utilities/validator')
const utilities = require('../utilities/index')

router.get('/', utilities.handleAsyncErrors(userController.getAllUsers))
router.get(
  '/:id',
  validate.getUserByIdRules(),
  validate.validateUserRules,
  utilities.handleAsyncErrors(userController.getUserById)
)
router.post(
  '/',
  validate.createUserRules(),
  validate.validateUserRules,
  utilities.handleAsyncErrors(userController.createUser)
)
router.put(
  '/:id',
  validate.updateUserRules(),
  validate.validateUserRules,
  utilities.handleAsyncErrors(userController.updateUserById)
)

router.delete(
  '/:id',
  validate.deleteUserRules(),
  validate.validateUserRules,
  utilities.handleAsyncErrors(userController.deleteUserById)
)

module.exports = router
