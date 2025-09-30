# Dockerfile para Frontend React + Vite

# Etapa 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Instalar dependências necessárias para Rollup no Alpine
RUN apk add --no-cache python3 make g++

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências e forçar instalação do binário correto do Rollup
RUN npm install && npm install @rollup/rollup-linux-x64-musl --force

# Copiar código fonte
COPY . .

# Build da aplicação
RUN npm run build

# Etapa 2: Production com Nginx
FROM nginx:alpine AS production

# Copiar build para o Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuração customizada do Nginx (para SPA)
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Expor porta
EXPOSE 80

# Comando padrão do Nginx
CMD ["nginx", "-g", "daemon off;"]