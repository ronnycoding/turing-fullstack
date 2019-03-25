FROM node:10.15.3-alpine

EXPOSE 3000

RUN yarn global add nodemon sequelize-auto mysql

ADD ./start.sh /start.sh

ADD ./.env /.env

ADD ./package.json /var/www/app/package.json

ADD ./yarn.lock /var/www/app/yarn.lock

WORKDIR /var/www/app/

RUN yarn install && yarn cache clean

RUN chmod +x /start.sh

ENTRYPOINT ["/start.sh"]
