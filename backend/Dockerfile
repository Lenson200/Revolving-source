FROM python:3.12-slim-bookworm

WORKDIR /app

# Copy only backend code
COPY backend /app

# Install dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Expose port
EXPOSE 8000

# Start app
CMD ["sh", "-c", "python manage.py migrate --noinput && gunicorn backend.wsgi:application --bind 0.0.0.0:$PORT --log-level debug"]