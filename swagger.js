const swaggerAutogen = require('swagger-autogen')()
require('dotenv').config()

const isProd = process.env.NODE_ENV === 'production'

const doc = {
  info: {
    title: 'Expense tracker API',
    description: 'API documentation for tracking expenses',
  },
  host: isProd ? process.env.SWAGGER_HOST : `localhost:7700`,
  schemes: [isProd ? 'https' : 'http'],
}

const outputFile = './swagger.json'
const endpointsFile = ['./server.js']

swaggerAutogen(outputFile, endpointsFile, doc)
