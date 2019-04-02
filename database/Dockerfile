FROM mariadb:latest

ADD ./tshirtshop.sql /docker-entrypoint-initdb.d/tshirtshop.sql
ADD ./zaltertable.sql /docker-entrypoint-initdb.d/zaltertable.sql

ADD ./.env /.env
ADD ./export.sh /export.sh

RUN chmod +x /export.sh

ADD ./import-aws.sh /import-aws.sh

RUN chmod +x /import-aws.sh

ENV MYSQL_ROOT_PASSWORD=turing \
  MYSQL_DATABASE=turing \
  MYSQL_USER=turing \
  MYSQL_PASSWORD=turing

CMD [ "mysqld" ]