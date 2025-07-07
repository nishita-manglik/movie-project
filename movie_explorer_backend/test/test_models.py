import pytest
from dbmodels.models import Actor, Director, Genre, Movie

@pytest.mark.django_db
def test_create_actor():
    actor = Actor.objects.create(name="Tom Hardy", birth={"year": 1977}, description="British actor", popular_movies="Inception")
    assert actor.name == "Tom Hardy"

@pytest.mark.django_db
def test_create_director():
    director = Director.objects.create(name="Christopher Nolan", birth={"year": 1970}, description="Known for complex films", popular_movies="Inception")
    assert director.name == "Christopher Nolan"

@pytest.mark.django_db
def test_create_genre():
    genre = Genre.objects.create(name="Sci-Fi")
    assert genre.name == "Sci-Fi"

@pytest.fixture
def director_factory(db):
    def create_director(**kwargs):
        return Director.objects.create(**kwargs)
    return create_director

@pytest.mark.django_db
def test_create_movie( director_factory):
    director = director_factory()
    movie = Movie.objects.create(
        title="Inception",
        year="2010",
        rated="PG-13",
        released="2010-07-16",
        runtime="148 min",
        plot="Dreams within dreams",
        language="English",
        country="USA",
        awards="Oscar",
        poster="http://poster.url",
        imdb_rating=8.8,
        box_office="$800M",
        director=director
    )
    assert movie.title == "Inception"
