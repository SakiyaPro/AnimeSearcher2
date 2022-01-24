FROM node:16.13.0-buster-slim

WORKDIR /usr/src/nextjs

# Alpineで Linuxコマンド apt は使えないので、apk を使用
COPY ./package.json /usr/src/nextjs/
RUN npm install

COPY . /usr/src/nextjs/
