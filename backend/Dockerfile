#creates node:13.14-alpine
FROM node:13.14-alpine

#works here
WORKDIR /backend

#copying the package.json & package lock files
COPY package*.json ./

#install dev-dep
RUN npm install --only=production

#copying everything from the folder where Dockerfile is except .dockerignore
COPY . .

#makes PORT to 3001
EXPOSE 3001

#
CMD [ "node", "start.js" ]