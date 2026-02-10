FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --omit=dev

COPY server.js ./server.js
COPY db.json ./db.json

EXPOSE 3000
CMD ["node", "server.js"]
