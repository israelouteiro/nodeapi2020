FROM node:latest

RUN npm install nodemon -g

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lock.json

RUN npm install

COPY . /usr/src/app