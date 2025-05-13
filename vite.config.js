import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwind from '@tailwindcss/vite'
import autoprefixer from 'autoprefixer' // Only adding this import to fix the reference error

export default defineConfig({
  plugins: [
    react(),
    tailwind(),
    // No PostCSS configuration
  ],
  // No PostCSS configuration here either
})