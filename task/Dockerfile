FROM node:14.15.1-alpine

WORKDIR /task

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm","start" ]