import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// If your repo is named "wedding" the site will be at: yourusername.github.io/wedding
// Change the base below to match your repo name
export default defineConfig({
  plugins: [react()],
  base: '/wedding/',
})
