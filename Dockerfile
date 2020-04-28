FROM heroku/heroku:18-build
COPY . /src
RUN sudo apt-get install -y sox & npm -g install static-server & cd /src & npm install & npm run build
CMD static-server /src/dist/index.html
