FROM node:15
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm i
COPY . .
EXPOSE 8080
CMD ["npm", "run", "serve"]
