FROM node:20

WORKDIR /usr/src/app

COPY . .

WORKDIR /usr/src/app/client
RUN npm i
RUN npm run build

WORKDIR /usr/src/app/server
RUN npm i

EXPOSE 8080

CMD [ "node", "index.js" ]