FROM swiftlang/swift:nightly-focal
# RUN apk add --no-cache python2 g++ make
WORKDIR /code/mock-weather-server
# COPY . .
RUN apt-get update
RUN DEBIAN_FRONTEND='noninteractive' apt-get -y install nodejs
CMD ["node", "index.js"]