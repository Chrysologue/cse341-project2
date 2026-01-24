const swaggerAutogen = require('swagger-autogen')()
require('dotenv').config()

const isProd = process.env.NODE_ENV === 'production'

const doc = {
  info: {
    title: 'Expense tracker API',
    description: 'API documentation for tracking expenses',
    version: '1.0.0',
  },
  host: isProd
    ? process.env.SWAGGER_HOST
    : `localhost:${process.env.PORT || 7700}`,
  schemes: ['http', 'https'],
  basePath: '/',
}

const outputFile = './swagger.json'
const endpointsFile = ['./server.js']

swaggerAutogen(outputFile, endpointsFile, doc)
