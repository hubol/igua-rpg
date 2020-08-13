FROM node:12                                                                          
COPY . /src
RUN pwd; ls; apt-get update; apt-get install -y sox libsox-fmt-mp3; cd /src; npm install
ENTRYPOINT npm run build -- --outDir
