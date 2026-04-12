#!/bin/bash
# Railway deployment script to run migrations
echo "Running Django migrations..."
python manage.py migrate --noinput
echo "Migrations completed!"