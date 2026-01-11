#!/bin/sh
set -eu

# Wait for database
echo "Waiting for database..."
until php -r "try { new PDO('mysql:host=db;dbname=app', 'user', 'pass'); } catch (Exception \$e) { exit(1); }" >/dev/null 2>&1; do
  sleep 2
done
echo "Database is ready."

# Run dev setup commands
composer install --no-interaction
if [ ! -f .env ]; then
  cp .env.example .env
  php artisan key:generate
fi
php artisan migrate --force

# Start the main container process
exec "$@"
