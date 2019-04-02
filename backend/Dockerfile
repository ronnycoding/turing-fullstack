FROM circleci/node:8.10

EXPOSE 3000

RUN sudo apt-get update; \
  sudo apt-get install -y --no-install-recommends \
  python-pip

RUN sudo pip install --user --upgrade pip; \
  sudo pip install --user awscli; \
  sudo pip install --user awscli --upgrade

RUN sudo npm install sequelize-auto mysql serverless sequelize -g

ADD ./package.json /var/www/app/package.json
ADD ./yarn.lock /var/www/app/yarn.lock

ADD ./start.sh /start.sh

RUN sudo chmod +x /start.sh

ENTRYPOINT ["/start.sh"]
