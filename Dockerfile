FROM node:15
WORKDIR /app
RUN npm i
EXPOSE 8080
CMD ["npm", "run", "serve"]
