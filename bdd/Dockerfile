FROM mysql:latest

ADD apiback.sql /docker-entrypoint-initdb.d

ENV MYSQL_ROOT_PASSWORD=exemplepwd
ENV DB_DATABASE=apiback
ENV DB_USERNAME=root

EXPOSE 3306