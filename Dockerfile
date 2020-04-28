FROM node:12
COPY . /src
WORKDIR /src
RUN apt-get update; apt-get install -y sox; npm -g install static-server & npm install
RUN npm run build
CMD static-server /dist/index.html
