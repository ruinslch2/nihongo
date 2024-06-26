import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/nihongo',
  server: {
    proxy: {
      '/test': {
        target: 'https://4yorfdsddl.execute-api.us-east-1.amazonaws.com',
        changeOrigin: true,
      }
    }
  },
  preview: {
    host: '192.168.24.85',
    port: 4173,
  }
})
