# Simple NGINX setup for serving static HTML files
FROM nginx:alpine

# Copy all static files directly to NGINX html directory
COPY . /usr/share/nginx/html

# Remove unnecessary files from the web directory
RUN rm -f /usr/share/nginx/html/Dockerfile \
    /usr/share/nginx/html/docker-compose.yml \
    /usr/share/nginx/html/package*.json \
    /usr/share/nginx/html/README*.md \
    && rm -rf /usr/share/nginx/html/node_modules

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
