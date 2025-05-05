import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://netflix-clone-xepk.vercel.app', // Replace with your backend server URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
