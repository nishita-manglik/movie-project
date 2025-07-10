from rest_framework import serializers
from dbmodels.models import Actor, Director, Genre, Movie

class MovieListSerializer(serializers.ModelSerializer):
    imdbRating = serializers.FloatField(source='imdb_rating')

    class Meta:
        model = Movie
        fields = ['id', 'poster', 'title', 'year', 'imdbRating']

        
class MovieDetailSerializer(serializers.ModelSerializer):
    imdbRating = serializers.FloatField(source='imdb_rating')
    director = serializers.SerializerMethodField()
    actors = serializers.SerializerMethodField()
    genre = serializers.SerializerMethodField()

    class Meta:
        model = Movie
        fields = [
            'id',
            'title',
            'year',
            'rated',
            'released',
            'runtime',
            'plot',
            'language',
            'country',
            'awards',
            'poster',
            'imdbRating',
            'box_office',
            'director',
            'actors',
            'genre'
        ]

    def get_director(self, obj):
        if obj.director:
            return {
                "id": obj.director.id,
                "name": obj.director.name
            }
        return None

    def get_actors(self, obj):
        return [{"id": actor.id, "name": actor.name} for actor in obj.actors.all()]

    def get_genre(self, obj):
        return [{"id": genre.id, "name": genre.name} for genre in obj.genres.all()]

