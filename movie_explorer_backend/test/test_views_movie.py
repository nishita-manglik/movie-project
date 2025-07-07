import pytest
from rest_framework.test import APIClient
from django.urls import reverse, resolve
from dbmodels.models import Movie, Director, Genre, Actor
from datetime import date

@pytest.fixture
def director():
    return Director.objects.create(name="Nolan", birth={"year": 1970}, description="Famous", popular_movies="Inception")

@pytest.fixture
def actor():
    return Actor.objects.create(name="DiCaprio", birth={"year": 1974}, description="Oscar winner", popular_movies="Titanic")

@pytest.fixture
def genre():
    return Genre.objects.create(name="Sci-Fi")

@pytest.fixture
def movie(director):
    return Movie.objects.create(
        title="Inception",
        year="2010",
        rated="PG-13",
        released=date(2010, 7, 16),
        runtime="148 min",
        plot="A thief steals corporate secrets through dream-sharing.",
        language="English",
        country="USA",
        awards="Oscar",
        poster="http://poster.url",
        imdb_rating=8.8,
        box_office="$800M",
        director=director
    )

@pytest.mark.django_db
def test_movie_list_view(movie):
    client = APIClient()
    response = client.get("/api/movies/")
    assert response.status_code == 200
    assert len(response.data) == 1
    assert response.data[0]["title"] == "Inception"

@pytest.mark.django_db
def test_movie_detail_view(movie):
    client = APIClient()
    response = client.get(f"/api/movies/{movie.id}/")
    assert response.status_code == 200
    assert response.data["title"] == "Inception"

@pytest.mark.django_db
def test_movies_by_director_view(movie, director):
    client = APIClient()
    response = client.get(f"/api/movies/by-director/?director_name={director.name}")
    assert response.status_code == 200
    assert response.data[0]["title"] == movie.title

@pytest.mark.django_db
def test_movies_by_name_view(movie):
    client = APIClient()
    response = client.get(f"/api/movies/by-name/?movie_name=incep")
    assert response.status_code == 200
    assert response.data[0]["title"] == movie.title

@pytest.mark.django_db
def test_movies_by_genre_view(movie, genre):
    movie.genres.add(genre)
    client = APIClient()
    response = client.get(f"/api/movies/by-genre/?genre_id={genre.id}")
    assert response.status_code == 200
    assert response.data[0]["title"] == movie.title

@pytest.mark.django_db
def test_movies_by_actor_view(movie, actor):
    movie.actors.add(actor)
    client = APIClient()
    response = client.get(f"/api/movies/by-actor/?actor_name=dicap")
    assert response.status_code == 200
    assert response.data[0]["title"] == movie.title

