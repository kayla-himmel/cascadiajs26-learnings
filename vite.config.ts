import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        cssColors: resolve(__dirname, 'src/css-colors.html'),
        docsLinking: resolve(__dirname, 'src/docs-linking.html'),
        tools: resolve(__dirname, 'src/tools.html'),
      },
    },
  },
})
