const express = require('express')
const expenseRoute = require('./routes/index')
require('dotenv').config()
const swaggerUi = require('swagger-ui-express')
const swaggerDoc = require('./swagger.json')

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

app.use('/expenses', expenseRoute)

app.get('/', async (req, res) => {
  res.status(200).json({ message: 'Welcome to Expense API' })
})

app.use((req, res, next) => {
  next({ status: 404, message: 'Sorry we appeared to have lost the page' })
})

app.use((err, req, res, next) => {
  const status = err.status || 500

  const errorMessage = status === 404 ? err.message : 'Internal server error'
  res.status(status).json({ error: errorMessage })
})

app.listen(port, () => console.log('Server is running on port', port))
