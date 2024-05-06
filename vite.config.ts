import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/test': {
        target: 'https://4yorfdsddl.execute-api.us-east-1.amazonaws.com',
        changeOrigin: true,
      }
    }
  }
})
