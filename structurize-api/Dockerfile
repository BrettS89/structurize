FROM node:lts-alpine

WORKDIR /app
COPY package.json .
RUN npm i --only=prod
COPY . .

CMD ["npm", "start"]
