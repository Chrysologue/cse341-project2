import js from '@eslint/js'
import globals from 'globals'
import prettierConfig from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'], // ✅ all JS files
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs', // ✅ backend
      globals: globals.node, // ✅ Node globals, not browser
    },
    plugins: { prettier: prettierPlugin }, // ✅ prettier plugin
    rules: {
      ...js.configs.recommended.rules, // ✅ eslint:recommended
      ...prettierConfig.rules, // ✅ disables conflicting eslint rules
      'prettier/prettier': 'error', // ✅ report prettier issues as errors
      'no-console': 'off', // ✅ backend logs allowed
    },
  },
])
