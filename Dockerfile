FROM node:12
RUN apt-get update; apt-get install -y sox libsox-fmt-mp3 & npm -g install http-server
COPY . /src     
RUN cd /src; npm -g install http-server & npm install; npm run build
CMD http-server /src/dist -p $PORT
