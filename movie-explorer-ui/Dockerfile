# Stage 1: Build Angular app
FROM node:20.9.0 as build

WORKDIR /app
COPY . .

# Install dependencies (with legacy-peer-deps to avoid version conflicts)
RUN npm install --legacy-peer-deps

# Build Angular app into /dist folder
RUN npm run build -- --output-path=dist

# Stage 2: Serve built app with Nginx
FROM nginx:alpine

# Copy compiled Angular files to Nginx's HTML directory
COPY --from=build /app/dist /usr/share/nginx/html

# Replace default nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for the frontend
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
