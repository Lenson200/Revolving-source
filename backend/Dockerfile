FROM python:3.12-slim-bookworm

WORKDIR /app

# Copy everything (because root = backend already)
COPY . .

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8080

