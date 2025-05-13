import tailwindcss from 'tailwindcss'
// Or if using it as a plugin
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // If using React

export default defineConfig({
  plugins: [
    react(),
    // Configure tailwind as a PostCSS plugin
  ],
  css: {
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer,
      ],
    },
  },
})