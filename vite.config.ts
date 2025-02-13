import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/auth': {
        target: 'http://34.234.86.131:3001', // LOGIN-SERVICE
        changeOrigin: true,
        secure: false,
      },
      '/api/users': {
        target: 'http://54.167.171.189:3000', // USER-SERVICE
        changeOrigin: true,
        secure: false,
      },
      '/api/board': {
        target: 'http://52.45.52.31:4000', // USER-SERVICE
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
