FROM node:14-alpine as builder

WORKDIR /usr/src/app

COPY . .

RUN npm install

CMD ["npm", "start"]