# Simple NGINX setup for serving static HTML files with volume mounts
FROM nginx:alpine

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
