# syntax=docker/dockerfile:1

FROM node:14-alpine
ENV NODE_ENV=development

WORKDIR /server
COPY package*.json .

RUN npm install

COPY . .
