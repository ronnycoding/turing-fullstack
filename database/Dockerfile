FROM mariadb:latest

ADD ./tshirtshop.sql /docker-entrypoint-initdb.d/tshirtshop.sql
ADD ./zaltertable.sql /docker-entrypoint-initdb.d/zaltertable.sql

ENV MYSQL_ROOT_PASSWORD=turing \
  MYSQL_DATABASE=turing \
  MYSQL_USER=turing \
  MYSQL_PASSWORD=turing

CMD [ "mysqld" ]