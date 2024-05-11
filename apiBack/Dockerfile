FROM php:8

RUN apt-get update -y && apt-get install -y openssl zip unzip git
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN docker-php-ext-install pdo_mysql && docker-php-ext-enable pdo_mysql

WORKDIR /apiback
COPY . .

RUN chmod +x startAPI.sh

RUN composer install && php artisan key:generate

ENTRYPOINT ["/apiback/startAPI.sh"]

EXPOSE 8888


