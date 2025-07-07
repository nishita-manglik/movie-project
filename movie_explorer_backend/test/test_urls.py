from django.urls import resolve
from actor.views import ActorDetailAPIView as ActorView
from director.views import ActorDetailAPIView as DirectorView  # Note: this should likely be renamed
from genre.views import GenreListView
from movie.views import (
    MovieListAPIView,
    MovieDetailAPIView,
    MoviesByNameView,
    MoviesByDirectorView,
    MoviesByGenreView,
    MoviesByActorView,
)

# --- Actor URL tests ---
def test_actor_detail_url():
    resolver = resolve("/api/actors/1/")
    assert resolver.func.view_class == ActorView

# --- Director URL tests ---
def test_director_detail_url():
    resolver = resolve("/api/directors/1/")
    assert resolver.func.view_class == DirectorView

# --- Genre URL tests ---
def test_genre_list_url():
    resolver = resolve("/api/genres/")
    assert resolver.func.view_class == GenreListView

# --- Movie URL tests ---
def test_movie_list_url():
    resolver = resolve("/api/movies/")
    assert resolver.func.view_class == MovieListAPIView

def test_movie_detail_url():
    resolver = resolve("/api/movies/1/")
    assert resolver.func.view_class == MovieDetailAPIView

def test_movie_by_name_url():
    resolver = resolve("/api/movies/by-name/")
    assert resolver.func.view_class == MoviesByNameView

def test_movie_by_director_url():
    resolver = resolve("/api/movies/by-director/")
    assert resolver.func.view_class == MoviesByDirectorView

def test_movie_by_genre_url():
    resolver = resolve("/api/movies/by-genre/")
    assert resolver.func.view_class == MoviesByGenreView

def test_movie_by_actor_url():
    resolver = resolve("/api/movies/by-actor/")
    assert resolver.func.view_class == MoviesByActorView
