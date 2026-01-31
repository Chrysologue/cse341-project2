const fs = require('fs')
require('dotenv').config()

const isProd = process.env.NODE_ENV === 'production'

const swaggerDoc = {
  swagger: '2.0',
  info: {
    title: 'Expense Tracker API',
    description:
      'API documentation for tracking expenses with Google OAuth and JWT authentication',
    version: '1.0.0',
  },

  host: isProd
    ? process.env.SWAGGER_HOST
    : `localhost:${process.env.PORT || 7700}`,

  basePath: '/',
  schemes: [isProd ? 'https' : 'http'],

  /* ============================
     🔐 JWT AUTH CONFIG (IMPORTANT)
     ============================ */
  securityDefinitions: {
    BearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: 'Enter JWT like: Bearer <your_token>',
    },
  },

  /* Apply JWT globally */
  security: [
    {
      BearerAuth: [],
    },
  ],

  paths: {
    /* ===== PUBLIC ROUTES ===== */
    '/': {
      get: {
        security: [],
        description: 'Welcome endpoint',
        responses: {
          200: { description: 'OK' },
        },
      },
    },

    '/auth/google': {
      get: {
        security: [],
        description: 'Redirect user to Google OAuth login',
        responses: {
          302: { description: 'Redirect to Google login page' },
        },
      },
    },

    '/auth/google/callback': {
      get: {
        security: [],
        description: 'Google OAuth callback. Returns JWT token and user info',
        responses: {
          200: { description: 'Login successful' },
          401: { description: 'Unauthorized' },
          500: { description: 'Internal server error' },
        },
      },
    },

    /* ===== EXPENSES (PROTECTED) ===== */
    '/expenses/': {
      get: {
        description: 'Get all expenses (JWT required)',
        responses: {
          200: { description: 'Expenses retrieved' },
          401: { description: 'Unauthorized' },
        },
      },
      post: {
        description: 'Create new expense (JWT required)',
        parameters: [
          {
            name: 'body',
            in: 'body',
            required: true,
            schema: { $ref: '#/definitions/Expense' },
          },
        ],
        responses: {
          201: { description: 'Expense created' },
          400: { description: 'Validation error' },
          401: { description: 'Unauthorized' },
        },
      },
    },

    '/expenses/{id}': {
      get: {
        description: 'Get expense by ID (JWT required)',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          200: { description: 'Expense found' },
          400: { description: 'Invalid ID' },
          404: { description: 'Not found' },
          401: { description: 'Unauthorized' },
        },
      },

      put: {
        description: 'Update expense (JWT required)',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
          },
          {
            name: 'body',
            in: 'body',
            required: true,
            schema: { $ref: '#/definitions/Expense' },
          },
        ],
        responses: {
          200: { description: 'Expense updated' },
          403: { description: 'Forbidden' },
          404: { description: 'Not found' },
          401: { description: 'Unauthorized' },
        },
      },

      delete: {
        description: 'Delete expense (JWT required)',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          200: { description: 'Expense deleted' },
          404: { description: 'Not found' },
          401: { description: 'Unauthorized' },
        },
      },
    },
  },

  /* ===== MODELS ===== */
  definitions: {
    Expense: {
      type: 'object',
      required: ['title', 'amount', 'category', 'paymentMethod', 'date'],
      properties: {
        title: { type: 'string', example: 'Lunch' },
        amount: { type: 'number', example: 12.5 },
        category: {
          type: 'string',
          enum: ['Food', 'Transport', 'Rent', 'Utilities', 'Other'],
        },
        paymentMethod: {
          type: 'string',
          enum: ['Cash', 'Card', 'Mobile Money'],
        },
        note: { type: 'string', example: 'Lunch with friends' },
        date: {
          type: 'string',
          format: 'date-time',
          example: '2025-01-28T10:00:00Z',
        },
        location: { type: 'string', example: 'Antananarivo' },
      },
    },
  },
}

fs.writeFileSync('./swagger.json', JSON.stringify(swaggerDoc, null, 2))
console.log('✅ swagger.json generated successfully')
