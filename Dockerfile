FROM node:12-buster

WORKDIR /app

RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get install -y software-properties-common \
    && apt-add-repository contrib \
    && apt-get update \
    && apt-get -y --autoremove install --no-install-recommends ttf-mscorefonts-installer fontconfig \
    && apt-get clean \
    && fc-cache

COPY package*.json ./

#RUN npm install
# If you are building your code for production
RUN npm ci --only=production

COPY . .

EXPOSE 8080
CMD [ "node", "server.js" ]
