import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Vite configuration for GitHub Pages deployment
export default defineConfig({
  base: '/Portfolio/',
  plugins: [
    tailwindcss(),
    react(),
  ],
})
