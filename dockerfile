# 1️⃣ Usar una imagen de Node.js para construir la app
FROM node:18 AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# 2️⃣ Servir con Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# 🔹 Copiar el template para configurar las variables de entorno
COPY default.conf.template /etc/nginx/templates/default.conf.template  

# 🔹 Habilitar la sustitución de variables de entorno
CMD ["sh", "-c", "envsubst '$LOGIN_SERVICE_URL $USER_SERVICE_URL' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]
