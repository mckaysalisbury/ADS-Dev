FROM ubuntu:14.04

RUN apt-get update

RUN apt-get install -y nodejs nodejs-legacy npm git git-core

RUN adduser --home /tmp --disabled-password --gecos ADSUser --no-create-home adsuser

ADD start.sh /tmp/

RUN chmod +x /tmp/start.sh

USER adsuser

CMD /tmp/start.sh
