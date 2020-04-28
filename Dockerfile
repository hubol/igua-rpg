FROM ubuntu:18.04
COPY . /src
WORKDIR /src
RUN apt-get update; apt-get install -y sox; apt-get install -y npm; npm -g install static-server & npm install
RUN npx generate-howls
RUN npm run build
CMD static-server /dist/index.html
