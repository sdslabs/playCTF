# Using node15 base image
FROM node:15 AS builder

# Move to working directory /app
WORKDIR /usr/app

# Copy all files to this folder
COPY . /usr/app

# Install dependencies
RUN npm i

# Copy the code into the container
COPY . .

# Make build for prod
RUN npm run build

# Serve build using nginx image
FROM nginx:1.19-alpine AS server
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/app/dist /usr/share/nginx/html
