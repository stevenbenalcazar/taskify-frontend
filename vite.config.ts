import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {} // Agrega esto para evitar el error en react-trello
  },
  server: {
    proxy: {
      '/api/auth': {
        target: 'http://3.229.31.59:3001', // LOGIN-SERVICE
        changeOrigin: true,
        secure: false,
      },
      '/api/users': {
        target: 'http://54.167.171.189:3000', // USER-SERVICE
        changeOrigin: true,
        secure: false,
      },
      '/api/board': {
        target: 'http://52.45.52.31:4000', // BOARD-SERVICE
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
