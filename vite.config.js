import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1', // Change to your preferred host
    port: 3000,        // Change to your preferred port
    strictPort: true,  // Ensures Vite runs only on the specified port
  },
})
