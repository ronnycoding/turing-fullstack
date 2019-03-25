FROM mariadb:latest

ADD ./tshirtshop.sql /docker-entrypoint-initdb.d/tshirtshop.sql

ENV MYSQL_ROOT_PASSWORD turing
ENV MYSQL_DATABASE turing
ENV MYSQL_USER turing
ENV MYSQL_PASSWORD turing

CMD [ "mysqld" ]