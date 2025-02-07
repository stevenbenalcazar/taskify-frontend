# 1️⃣ Usar una imagen de Node.js para construir la app
FROM node:18 AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# 2️⃣ Servir con Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80 para acceder al frontend
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
