FROM node:12                                                                          
COPY . /repo
WORKDIR /repo
RUN apt-get update; apt-get install -y sox libsox-fmt-mp3; npm install
ENTRYPOINT npm run build -- --outDir
