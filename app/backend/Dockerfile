FROM node:16-alpine

WORKDIR /usr/app

COPY package*.json ./

COPY prisma ./prisma/

COPY .env ./

COPY tsconfig.json ./

COPY . .

RUN npm install

RUN npx prisma generate

EXPOSE 3001

RUN npm run build

CMD [ "npm", "start" ]
