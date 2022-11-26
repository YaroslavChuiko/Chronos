FROM node:16-alpine

WORKDIR /app

COPY package*.json /app/

COPY prisma/ /app/prisma/

RUN npm install

COPY . .

EXPOSE 8000

RUN rm -rf /var/cache/apk/*

CMD ["npm", "run", "docker"]
