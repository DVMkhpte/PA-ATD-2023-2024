FROM php:8-apache

RUN apt-get update && apt-get install -y \
    nodejs \
    npm

WORKDIR /var/www/html

COPY . .

RUN npm install

WORKDIR /var/www/html/planning/src/components

EXPOSE 80

CMD ["npm", "run", "start"]