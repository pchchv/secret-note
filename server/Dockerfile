FROM node:16.11-alpine

WORKDIR /

COPY tsconfig.json ./
COPY package*.json ./
COPY yarn.lock ./
COPY src ./src
COPY .env ./

EXPOSE 1337

RUN yarn