# Base Node.js Image
FROM node:12-alpine

WORKDIR /usr/src/app

COPY . .

RUN yarn install

RUN yarn start