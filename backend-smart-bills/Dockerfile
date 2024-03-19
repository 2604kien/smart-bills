FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3500

CMD [ "npm", "run", "start:dev" ]
