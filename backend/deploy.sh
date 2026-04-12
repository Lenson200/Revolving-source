#!/bin/bash
# Railway deployment script for SQLite
echo "Starting Railway deployment with SQLite..."

# Navigate to backend directory
cd backend

# Create database directory if it doesn't exist
mkdir -p .

# Run migrations
echo "Running database migrations..."
python manage.py migrate --noinput

# Collect static files if needed
echo "Collecting static files..."
python manage.py collectstatic --noinput --clear

echo "SQLite database setup complete!"
echo "Database file: $(pwd)/db.sqlite3"
echo "Starting Gunicorn server..."
exec gunicorn backend.wsgi --bind 0.0.0.0:$PORT