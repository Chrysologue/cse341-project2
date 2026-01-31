const express = require('express')
const authRoute = require('./routes/authRoute')
const expenseRoute = require('./routes/index')
require('dotenv').config()
const swaggerUi = require('swagger-ui-express')
const swaggerDoc = require('./swagger.json')
const userRoute = require('./routes/userRoute')
const { connectToDb } = require('./database/db')

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

app.use('/auth', authRoute)
app.use('/expenses', expenseRoute)
app.use('/users', userRoute)

app.get('/', async (req, res) => {
  res.status(200).json({ message: 'Welcome to Expense API' })
})

app.use((req, res, next) => {
  next({ status: 404, message: 'Sorry we appeared to have lost the page' })
})

app.use((err, req, res, next) => {
  console.log('Error caught:', err)
  const status = err.status || 500

  const errorMessage = status === 404 ? err.message : 'Internal server error'
  res.status(status).json({ error: errorMessage })
})

connectToDb().then(() =>
  app.listen(port, () => console.log('Server is running on port', port))
)
