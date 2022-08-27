'use strict'

import { defineConfig } from 'vite'
import supercharge from '@supercharge/vite'

export default defineConfig({
  plugins: [
    supercharge({
      input: ['resources/js/app.js', 'resources/css/app.css'],
    }),
  ],
})
