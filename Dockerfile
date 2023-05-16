FROM nginx:1.24-alpine

# Install bash to use it in entrypoint script
RUN apk add --no-cache bash

# Copy nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy build artifacts to conteiner
COPY ./dist/storybook/components/ /usr/share/nginx/html

