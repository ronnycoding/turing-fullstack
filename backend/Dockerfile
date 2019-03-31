FROM node:8.15.1-jessie

EXPOSE 3000

RUN set -ex; \
  apt-get update; \
  apt-get install -y --no-install-recommends \
  python-pip \
  curl

RUN ln -sf /usr/share/zoneinfo/Etc/UTC /etc/localtime

RUN pip install --upgrade pip; \
  pip install awscli; \
  pip install awscli --upgrade

RUN yarn global add nodemon sequelize-auto mysql serverless

RUN curl -sf https://up.apex.sh/install | BINDIR=/usr/local/bin/ sh \
  && up version \
  && up upgrade

RUN chown -R $(whoami) /usr/local/bin/

ADD ./.env /.env

ADD ./start.sh /start.sh

ADD ./package.json /var/www/app/package.json

ADD ./yarn.lock /var/www/app/yarn.lock

WORKDIR /var/www/app/

RUN yarn install && yarn cache clean

RUN chmod +x /start.sh

ENTRYPOINT ["/start.sh"]
