FROM node:16-alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3001

ENTRYPOINT [ "npm", "start" ]
