import pytest
from dbmodels.models import Actor, Director, Genre, Movie
from movie.serializers import MovieListSerializer, MovieDetailSerializer
from actor.serializers import ActorSerializer
from director.serializers import DirectorSerializer
from genre.serializers import GenreSerializer
from datetime import date

@pytest.fixture
def director():
    return Director.objects.create(name="Christopher Nolan", birth={"year": 1970}, description="Director", popular_movies="Inception")

@pytest.fixture
def actor():
    return Actor.objects.create(name="Leonardo DiCaprio", birth={"year": 1974}, description="Actor", popular_movies="Titanic")

@pytest.fixture
def genre():
    return Genre.objects.create(name="Thriller")

@pytest.fixture
def movie(director, actor, genre):
    movie = Movie.objects.create(
        title="Inception",
        year="2010",
        rated="PG-13",
        released=date(2010, 7, 16),
        runtime="148 min",
        plot="A dream within a dream.",
        language="English",
        country="USA",
        awards="Best Visual Effects",
        poster="http://poster.com/poster.jpg",
        imdb_rating=8.8,
        box_office="$829M",
        director=director
    )
    movie.actors.add(actor)
    movie.genres.add(genre)
    return movie

# ActorSerializer
@pytest.mark.django_db
def test_actor_serializer(actor):
    serializer = ActorSerializer(actor)
    assert serializer.data["name"] == "Leonardo DiCaprio"

# DirectorSerializer
@pytest.mark.django_db
def test_director_serializer(director):
    serializer = DirectorSerializer(director)
    assert serializer.data["name"] == "Christopher Nolan"

# GenreSerializer
@pytest.mark.django_db
def test_genre_serializer(genre):
    serializer = GenreSerializer(genre)
    assert serializer.data["name"] == "Thriller"
    assert "id" in serializer.data

# MovieListSerializer
@pytest.mark.django_db
def test_movie_list_serializer(movie):
    serializer = MovieListSerializer(movie)
    assert serializer.data["title"] == "Inception"
    assert serializer.data["imdbRating"] == 8.8
    assert "poster" in serializer.data

# MovieDetailSerializer
@pytest.mark.django_db
def test_movie_detail_serializer(movie):
    serializer = MovieDetailSerializer(movie)
    data = serializer.data
    assert data["title"] == "Inception"
    assert data["imdbRating"] == 8.8
    assert data["director"]["name"] == "Christopher Nolan"
    assert data["actors"][0]["name"] == "Leonardo DiCaprio"
    assert data["genre"][0]["name"] == "Thriller"
