# use: 
# docker build  -t scorpion .
# docker run --rm --name stinnger -d -p 4000:8800 scorpion

FROM alpine:latest

#ENV slack_cred abcdefg

RUN echo "Running Dockerfile"

RUN apk update && \
  apk upgrade && \
  apk add --no-cache bash git openssh && \
  apk add npm && \
  apk add curl && \
  apk add nodejs && \
  git --version && \
  cd /usr/local  && \
  mkdir server && \
  mkdir portal
# git clone https://github.com/lucsan/scorpion.git scorpion

COPY server/* /usr/local/server/
#COPY portal/* usr/local/portal/

WORKDIR /usr/local/


#ENTRYPOINT ["node", "server/wave.js"]
