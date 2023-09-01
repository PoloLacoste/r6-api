FROM node:20.5-alpine as builder

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm run build

FROM node:20.5-alpine as production

WORKDIR /usr/src/app

COPY ./package.json ./

RUN npm install --only=production

COPY --from=builder /usr/src/app/dist ./dist

CMD ["node", "dist/main"]