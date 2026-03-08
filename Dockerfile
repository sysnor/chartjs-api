FROM node:22-bookworm

WORKDIR /app

RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && echo "deb http://deb.debian.org/debian bookworm contrib" > /etc/apt/sources.list.d/contrib.list \
    && echo "ttf-mscorefonts-installer msttcorefonts/accepted-mscorefonts-eula select true" | debconf-set-selections \
    && apt-get update \
    && apt-get -y install --no-install-recommends ttf-mscorefonts-installer fontconfig \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && fc-cache -f

COPY package*.json ./

#RUN npm install
# If you are building your code for production
RUN npm ci --omit=dev

COPY . .

EXPOSE 8080
CMD [ "node", "server.js" ]
