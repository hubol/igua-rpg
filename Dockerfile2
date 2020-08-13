FROM node:12                                                                          
COPY . /src     
RUN apt-get update; apt-get install -y sox libsox-fmt-mp3; cd /src; npm install; npm run build
CMD echo "Success"
