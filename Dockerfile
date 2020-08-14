FROM node:12                                                                          
RUN apt-get update; apt-get install -y sox libsox-fmt-mp3; npm install; npm run build
CMD echo "All done"
