import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Necesario para que model-viewer funcione sin warnings
  optimizeDeps: {
    exclude: ['@google/model-viewer']
  }
})
