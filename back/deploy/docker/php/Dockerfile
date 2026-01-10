FROM php:8.5-fpm AS base

WORKDIR /app

RUN apt update -y \
    && DEBIAN_FRONTEND=noninteractive apt upgrade -y \
    && apt install -y curl zip unzip

RUN docker-php-ext-install pdo_mysql

COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

FROM base AS dev

RUN groupadd -g 1000 hostgroup \
    && useradd -m -u 1000 -g 1000 hostuser

USER hostuser

CMD ["php-fpm"]

FROM base AS prod

COPY . .

RUN composer install --no-dev --optimize-autoloader --no-interaction

#RUN chmod +x deploy/docker/php/entrypoint.sh
#ENTRYPOINT ["deploy/docker/php/entrypoint.sh"]

CMD ["php-fpm"]

