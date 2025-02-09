import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Cargar variables de entorno
export default defineConfig(({ mode }) => {
  // Carga las variables de entorno desde el archivo .env
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api/auth': {
          target: env.VITE_LOGIN_SERVICE_URL || 'http://54.235.29.178:3000',
          changeOrigin: true,
          secure: false,
        },
        '/api/users': {
          target: env.VITE_USER_SERVICE_URL || 'http://54.167.50.122:3000',
          changeOrigin: true,
          secure: false,
        },
        '/api/workspace': {
          target: env.VITE_WORKSPACE_SERVICE_URL || 'http://XX.XX.XX.XX:3000',
          changeOrigin: true,
          secure: false,
        },
        '/api/tasks': {
          target: env.VITE_TASKS_SERVICE_URL || 'http://XX.XX.XX.XX:3000',
          changeOrigin: true,
          secure: false,
        },
        '/api/notifications': {
          target: env.VITE_NOTIFICATIONS_SERVICE_URL || 'http://XX.XX.XX.XX:3000',
          changeOrigin: true,
          secure: false,
        },
        '/api/calendar': {
          target: env.VITE_CALENDAR_SERVICE_URL || 'http://XX.XX.XX.XX:3000',
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
