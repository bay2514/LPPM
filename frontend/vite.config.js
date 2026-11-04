import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@app': path.resolve(import.meta.dirname, './src/app'),
      '@public': path.resolve(import.meta.dirname, './src/public'),
      '@admin': path.resolve(import.meta.dirname, './src/admin'),
      '@shared': path.resolve(import.meta.dirname, './src/shared'),
      '@assets': path.resolve(import.meta.dirname, './src/assets'),
      '@components': path.resolve(import.meta.dirname, './src/components'),
    },
  },
})
