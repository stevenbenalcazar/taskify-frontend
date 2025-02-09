import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Definir las variables de entorno para los microservicios
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/auth': {
        target: process.env.VITE_LOGIN_SERVICE_URL || 'http://54.235.29.178:3000',
        changeOrigin: true,
        secure: false,
      },
      '/api/users': {
        target: process.env.VITE_USER_SERVICE_URL || 'http://54.167.50.122:3000',
        changeOrigin: true,
        secure: false,
      },
      '/api/workspace': {
        target: process.env.VITE_WORKSPACE_SERVICE_URL || 'http://XX.XX.XX.XX:3000',
        changeOrigin: true,
        secure: false,
      },
      '/api/tasks': {
        target: process.env.VITE_TASKS_SERVICE_URL || 'http://XX.XX.XX.XX:3000',
        changeOrigin: true,
        secure: false,
      },
      '/api/notifications': {
        target: process.env.VITE_NOTIFICATIONS_SERVICE_URL || 'http://XX.XX.XX.XX:3000',
        changeOrigin: true,
        secure: false,
      },
      '/api/calendar': {
        target: process.env.VITE_CALENDAR_SERVICE_URL || 'http://XX.XX.XX.XX:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
