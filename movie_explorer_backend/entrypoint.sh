#!/bin/bash

# Wait for PostgreSQL to be ready
echo "Waiting for PostgreSQL..."
while ! nc -z db 5432; do
  sleep 1
done
echo "PostgreSQL started."

# Run Django migrations and collect static files
python manage.py makemigrations
python manage.py migrate
python manage.py collectstatic --noinput

# Check if Movie data exists to avoid re-loading fixtures
echo "Checking if initial data is already loaded..."
if python manage.py shell -c "from movies.models import Movie; exit(0) if Movie.objects.exists() else exit(1)"; then
    echo "Data already loaded. Skipping fixtures."
else
    echo "No data found. Loading fixtures..."
    python manage.py loaddata actors_fixture.json
    python manage.py loaddata directors_fixture.json
    python manage.py loaddata genres_fixture.json
    python manage.py loaddata movie_fixture.json
    python manage.py loaddata movie_actor_fixture.json
    python manage.py loaddata movie_genre_fixture.json
fi

# Start Gunicorn WSGI server
exec gunicorn movie_explorer_backend.wsgi:application --bind 0.0.0.0:8000
