import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Load environment variables from .env file
import { config } from 'dotenv'
config()

// Export the Vite config
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env
  }
})