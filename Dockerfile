FROM node

COPY package*.json ./

RUN npm install

COPY dist ./

EXPOSE 80

CMD [ "node", "index.js" ]
