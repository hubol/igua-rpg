FROM ubuntu:18.04
COPY . /src
WORKDIR /src
RUN apt-get update; curl -sL https://deb.nodesource.com/setup_12.x | -E bash -; apt-get install -y nodejs; apt-get install -y sox; apt-get install -y npm; npm -g install static-server & npm install
RUN npm run build
CMD static-server /dist/index.html
