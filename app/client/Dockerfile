FROM node:18.17.0-alpine
ENV HOME=/usr/src/app
RUN mkdir -p $HOME
WORKDIR $HOME
RUN npm install -g @angular/cli
EXPOSE 4200
COPY package.json $HOME
RUN npm install
CMD ng serve --host 0.0.0.0 --port 4200 --poll=2000
# RUN npm run build
