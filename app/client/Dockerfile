FROM node:18.17.0-alpine
RUN npm install -g @angular/cli
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
# RUN npm run build
