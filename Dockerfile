FROM node

COPY package*.json ./

COPY .env.example ./

COPY .env.prod .env

RUN npm install

COPY dist dist

EXPOSE 8080

CMD [ "npm", "start" ]