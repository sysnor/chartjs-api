# [Choice] Node.js version: 22, 20, 18
ARG VARIANT="24-trixie"
FROM mcr.microsoft.com/devcontainers/javascript-node:5-${VARIANT}

RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && echo "deb http://deb.debian.org/debian trixie contrib" > /etc/apt/sources.list.d/contrib.list \
    && echo "ttf-mscorefonts-installer msttcorefonts/accepted-mscorefonts-eula select true" | debconf-set-selections \
    && apt-get update \
    && apt-get -y install --no-install-recommends ttf-mscorefonts-installer fontconfig \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && fc-cache -f
