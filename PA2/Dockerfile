FROM php:8-apache

RUN apt-get update && apt-get install -y \
    nodejs \
    npm

WORKDIR /var/www/html

COPY . .

WORKDIR /var/www/html/planning/node_modules

RUN chmod 777 react-scripts

WORKDIR /var/www/html/planning/src/components

EXPOSE 80

CMD npm run start
