# Stage 1: Build
FROM node:22-alpine AS build
WORKDIR /app

# Add this line to accept the variable during build
ARG VITE_API_BASE_URL 
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# Enable pnpm or just use npm
COPY package*.json ./
RUN npm install

COPY . .
# This runs tsc -b && vite build as per your scripts
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:stable-alpine
# Vite builds to the 'dist' folder by default
COPY --from=build /app/dist /usr/share/nginx/html

# Important: Custom Nginx config to handle React Router paths
# RUN echo 'server { \
#     listen 80; \
#     location / { \
#         root /usr/share/nginx/html; \
#         try_files $uri $uri/ /index.html; \
#     } \
#     location /api/ {\
#         proxy_pass https://api.bloodshot.in/api/; \
#         proxy_set_header Host api.bloodshot.in; \
#         proxy_set_header X-Real-IP $remote_addr; \
#     }\
# }' > /etc/nginx/conf.d/default.conf

RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        try_files $uri $uri/ /index.html; \
    } \
    location /api/ { \
        # Use the Docker Service Name and Internal Port (9096)
        proxy_pass http://apiGateway-service:9096/api/; \
        proxy_set_header Host $host; \
        proxy_set_header X-Real-IP $remote_addr; \
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; \
        proxy_set_header X-Forwarded-Proto $scheme; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]