FROM --platform=linux/amd64 node:20

ENV NODE_ENV production

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY ./dist ./dist

EXPOSE 3000

CMD [ "node", "dist/src/serverless.js" ]
