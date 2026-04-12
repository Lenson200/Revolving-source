FROM python:3.12-slim-bookworm

WORKDIR /app

# Copy everything (because root = backend already)
COPY . .

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8000

CMD ["sh", "-c", "python manage.py migrate --noinput && python manage.py collectstatic --noinput && gunicorn backend.wsgi:application --bind 0.0.0.0:$PORT --log-level debug"]