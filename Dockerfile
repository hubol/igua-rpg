FROM node:12                                                                          
COPY . /repo 
RUN cd /repo; apt-get update; apt-get install -y sox libsox-fmt-mp3; npm install; npm run build
ENTRYPOINT ["sh", "-c", "pwd; ls; cd /repo; pwd; ls; cp -R /dist"]
