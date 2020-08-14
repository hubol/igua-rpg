FROM node:12                                                                          
COPY . /repo 
RUN cd /repo; apt-get update; apt-get install -y sox libsox-fmt-mp3; npm install
ENTRYPOINT ["sh", "-c", "cd /repo; npm run build"]
