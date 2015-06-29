FROM ubuntu:14.04

RUN apt-get update

RUN apt-get install -y nodejs nodejs-legacy npm git git-core

ADD start.sh /tmp/

RUN chmod +x /tmp/start.sh

CMD ./tmp/start.sh
