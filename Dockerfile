FROM ubuntu:18.04
COPY . /src
RUN apt install nodejs & apt install -y sox & npm -g install static-server & cd /src & npm install & npm run build
CMD static-server /src/dist/index.html
