##stage one
  #creates node:slim
  #node:slim is a small linux environment it works w the things it needs so it runs faster and use less space than a plain node env.
  FROM node:slim AS build

  #works here
  WORKDIR /frontend

  #copying the package.json & package lock files
  COPY package*.json ./

  #after copying package.json runs node env. & create node_modules folder
  RUN npm install

  #copying everything from the folder where Dockerfile is except .dockerignore
  COPY . .

  #runs build and create build folder
  RUN npm run build

##stage two
  #creates nginx:alpine
  #alpine is a small linux nginx env., smaller than the default nginx
  FROM nginx:alpine

  #copying build to its place (from stage one)
  COPY --from=build /frontend/build /usr/share/nginx/html

  #deletes nginx defaul config file
  RUN rm /etc/nginx/conf.d/default.conf
  
  #copying config file
  COPY config/nginx.conf /etc/nginx/conf.d/nginx.conf