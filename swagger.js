const fs = require('fs')
require('dotenv').config()

const isProd = process.env.NODE_ENV === 'production'

const swaggerDoc = {
  swagger: '2.0',
  info: {
    title: 'Expense tracker API',
    description: 'API documentation for tracking expenses',
    version: '1.0.0',
  },
  host: isProd ? process.env.SWAGGER_HOST : 'localhost:7700',
  basePath: '/',
  schemes: [isProd ? 'https' : 'http'],
  paths: {
    '/': {
      get: {
        description: 'Welcome endpoint',
        responses: {
          200: {
            description: 'OK',
          },
        },
      },
    },
    '/expenses/': {
      get: {
        description: 'Get all expenses',
        responses: {
          200: {
            description: 'List of all expenses',
          },
          404: {
            description: 'No expenses found',
          },
        },
      },
      post: {
        description: 'Create a new expense',
        parameters: [
          {
            name: 'body',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/definitions/Expense',
            },
          },
        ],
        responses: {
          201: {
            description: 'Expense created successfully',
          },
          400: {
            description: 'Validation error',
          },
        },
      },
    },
    '/expenses/{id}': {
      get: {
        description: 'Get expense by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
            description: 'Expense ID',
          },
        ],
        responses: {
          200: {
            description: 'Expense details',
          },
          400: {
            description: 'Invalid expense ID',
          },
          404: {
            description: 'Expense not found',
          },
        },
      },
      put: {
        description: 'Update an expense',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
            description: 'Expense ID',
          },
          {
            name: 'body',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/definitions/Expense',
            },
          },
        ],
        responses: {
          200: {
            description: 'Expense updated successfully',
          },
          400: {
            description: 'Validation error',
          },
          404: {
            description: 'Expense not found',
          },
        },
      },
      delete: {
        description: 'Delete an expense',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
            description: 'Expense ID',
          },
        ],
        responses: {
          200: {
            description: 'Expense deleted successfully',
          },
          400: {
            description: 'Invalid expense ID',
          },
          404: {
            description: 'Expense not found',
          },
        },
      },
    },
    '/users/': {
      get: {
        description: 'Get all users',
        responses: {
          200: { description: 'List of all users' },
          404: { description: 'No users found' },
        },
      },
      post: {
        description: 'Create a new user',
        parameters: [
          {
            name: 'body',
            in: 'body',
            required: true,
            schema: { $ref: '#/definitions/User' },
          },
        ],
        responses: {
          201: { description: 'User created successfully' },
          400: { description: 'Validation error' },
        },
      },
    },
    '/users/{id}': {
      get: {
        description: 'Get user by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
            description: 'User ID',
          },
        ],
        responses: {
          200: { description: 'User details' },
          400: { description: 'Invalid user ID' },
          404: { description: 'User not found' },
        },
      },
      put: {
        description: 'Update a user',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
            description: 'User ID',
          },
          {
            name: 'body',
            in: 'body',
            required: true,
            schema: { $ref: '#/definitions/User' },
          },
        ],
        responses: {
          200: { description: 'User updated successfully' },
          400: { description: 'Validation error' },
          404: { description: 'User not found' },
        },
      },
      delete: {
        description: 'Delete a user',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
            description: 'User ID',
          },
        ],
        responses: {
          200: { description: 'User deleted successfully' },
          400: { description: 'Invalid user ID' },
          404: { description: 'User not found' },
        },
      },
    },
  },
  definitions: {
    Expense: {
      type: 'object',
      required: ['title', 'amount', 'category', 'paymentMethod', 'date'],
      properties: {
        title: {
          type: 'string',
          example: 'Lunch',
        },
        amount: {
          type: 'number',
          example: 15.99,
        },
        category: {
          type: 'string',
          enum: ['Food', 'Transport', 'Rent', 'Utilities', 'Other'],
          example: 'Food',
        },
        paymentMethod: {
          type: 'string',
          enum: ['Cash', 'Card', 'Mobile Money'],
          example: 'Card',
        },
        note: {
          type: 'string',
          example: 'Lunch at restaurant',
        },
        date: {
          type: 'string',
          format: 'date-time',
          example: '2025-01-28T10:00:00Z',
        },
        location: {
          type: 'string',
          example: 'Antananarivo',
        },
      },
    },
    User: {
      type: 'object',
      required: ['name', 'email'],
      properties: {
        name: { type: 'string', example: 'Alice' },
        email: { type: 'string', example: 'alice@example.com' },
        avatar: { type: 'string', example: 'https://example.com/avatar.png' },
        phoneNumber: { type: 'string', example: '+261 34 12 345 67' },
        dateOfBirth: {
          type: 'string',
          format: 'date-time',
          example: '1990-01-01T00:00:00Z',
        },
      },
    },
  },
}

fs.writeFileSync('./swagger.json', JSON.stringify(swaggerDoc, null, 2))
console.log('swagger.json generated successfully')
