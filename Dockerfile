# syntax=docker/dockerfile:1
FROM node:18-alpine
WORKDIR /reviews-server
COPY . .
RUN npm install --production
CMD ["node", "./server/index.js"]
# CMD ["node", "../TechStyles/client/src/index.jsx"]
EXPOSE 3000