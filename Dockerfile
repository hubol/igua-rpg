FROM ubuntu:18.04
COPY . /src
RUN apt-get update; apt-get install -y nodejs; apt-get install -y sox
RUN cd /src; npm -g install static-server & npm install; npm run build
CMD static-server /src/dist/index.html
