FROM node:14-alpine as builder

WORKDIR /app

COPY ./package.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:14-alpine as production

WORKDIR /app

COPY ./package.json ./
COPY --from=builder /app/dist ./

CMD ["npm", "run", "start:prod"]