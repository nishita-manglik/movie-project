from django.db import models

# Create your models here.

class Director(models.Model):
    name = models.CharField(max_length=255)
    birth = models.JSONField(default=dict)
    description = models.CharField(unique=False, max_length=2000)
    popular_movies = models.CharField(unique=False, max_length=2000)

    class Meta:
        db_table = 'directors'



class Actor(models.Model):
    name = models.CharField(max_length=255)
    birth = models.JSONField(default=dict)
    description = models.CharField(unique=False, max_length=2000)
    popular_movies = models.CharField(unique=False, max_length=2000)

    class Meta:
        db_table = 'actors'



class Genre(models.Model):
    name = models.CharField(max_length=100)

    class Meta:
        db_table = 'genres'



class Movie(models.Model):
    title = models.CharField(max_length=255) 
    year = models.CharField(max_length=10)  
    rated = models.CharField(max_length=10)
    released = models.DateField(null=True, blank=True)
    runtime = models.CharField(max_length=50)
    plot = models.TextField()   
    language = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    awards = models.TextField()
    poster = models.URLField()  
    imdb_rating = models.FloatField()   
    box_office = models.CharField(max_length=50)

    director = models.ForeignKey(Director, on_delete=models.CASCADE, related_name='movies')

    # Many-to-Many with through tables
    actors = models.ManyToManyField('Actor', through='MovieActor', related_name='movies')
    genres = models.ManyToManyField('Genre', through='MovieGenre', related_name='movies')

    class Meta:
        db_table = 'movies'



class MovieActor(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    actor = models.ForeignKey(Actor, on_delete=models.CASCADE)

    class Meta:
        db_table = 'movie_actors'
        unique_together = ('movie', 'actor')


class MovieGenre(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE)

    class Meta:
        db_table = 'movie_genres'
        unique_together = ('movie', 'genre')
