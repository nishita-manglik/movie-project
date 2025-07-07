from django.shortcuts import render
from rest_framework.response import Response
from dbmodels.models import Actor, Director, Genre, Movie
from movie.serializers import MovieDetailSerializer, MovieListSerializer
from drf_spectacular.utils import extend_schema, OpenApiParameter
from drf_spectacular.types import OpenApiTypes
from rest_framework.views import APIView
from rest_framework import status


@extend_schema(
    summary="List Movies",
    description="Returns a list of movies with selected fields: id, poster, title, year, imdbRating.",
    responses=MovieListSerializer(many=True),
    tags=["Movies"]
)
class MovieListAPIView(APIView):

    def get(self, request):
        try:
            movies = Movie.objects.all()
            serializer = MovieListSerializer(movies, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"detail": f"Server error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



@extend_schema(
    summary="Get Movie Details by ID",
    description="Returns full details of a movie including director name, actors, and genres.",
    responses=MovieDetailSerializer,
    tags=["Movies"]
)
class MovieDetailAPIView(APIView):

    def get(self, request, id):
        try:
            movie = Movie.objects.get(id=id)
            serializer = MovieDetailSerializer(movie)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Movie.DoesNotExist:
            return Response({"detail": f"Movie with id {id} not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"detail": f"Server error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@extend_schema(
        summary="Get Movies by Director Name (partial, case-insensitive)",
        description="Returns all movies with poster, title, year, imdbRating, id for directors whose names contain the given string.",
        parameters=[
            OpenApiParameter(
                name="director_name",
                description="Partial or full name of the director (case-insensitive)",
                required=True,
                type=OpenApiTypes.STR,
                location=OpenApiParameter.QUERY
            )
        ],
        responses=MovieListSerializer(many=True),
        tags=["Movies"]
    )
class MoviesByDirectorView(APIView):

    
    def get(self, request):
        try:
            director_name = request.query_params.get('director_name')
            if not director_name:
                return Response({"detail": "The 'director_name' query parameter is required."}, status=status.HTTP_400_BAD_REQUEST)

            # Filter directors with partial, case-insensitive match
            directors = Director.objects.filter(name__icontains=director_name)
            if not directors.exists():
                return Response({"detail": f"No directors found matching '{director_name}'."}, status=status.HTTP_400_BAD_REQUEST)

            # Fetch all movies for these directors using related_name='movies'
            movies = []
            for director in directors:
                movies.extend(director.movies.all())

            serializer = MovieListSerializer(movies, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"detail": f" {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@extend_schema(
        summary="Get Movies by Movie Name (partial, case-insensitive)",
        description="Returns all movies matching the partial movie name with poster, title, year, imdbRating, and id.",
        parameters=[
            OpenApiParameter(
                name="movie_name",
                description="Partial or full movie title (case-insensitive)",
                required=True,
                type=OpenApiTypes.STR,
                location=OpenApiParameter.QUERY
            )
        ],
        responses=MovieListSerializer(many=True),
        tags=["Movies"]
    )
class MoviesByNameView(APIView):

    
    def get(self, request):
        try:
            movie_name = request.query_params.get('movie_name')
            if not movie_name:
                return Response({"detail": "The 'movie_name' query parameter is required."}, status=status.HTTP_400_BAD_REQUEST)

            movies = Movie.objects.filter(title__icontains=movie_name)
            if not movies.exists():
                return Response({"detail": f"No movies found matching '{movie_name}'."}, status=status.HTTP_400_BAD_REQUEST)

            serializer = MovieListSerializer(movies, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"detail": f" {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@extend_schema(
        summary="Get Movies by Genre ID",
        description="Returns all movies with poster, title, year, imdbRating, id for a given genre ID.",
        parameters=[
            OpenApiParameter(
                name="genre_id",
                description="ID of the genre",
                required=True,
                type=OpenApiTypes.INT,
                location=OpenApiParameter.QUERY
            )
        ],
        responses=MovieListSerializer(many=True),
        tags=["Movies"]
    )
class MoviesByGenreView(APIView):

    
    def get(self, request):
        try:
            genre_id = request.query_params.get('genre_id')
            if not genre_id:
                return Response({"detail": "The 'genre_id' query parameter is required."}, status=status.HTTP_400_BAD_REQUEST)

            # Validate genre exists
            try:
                genre = Genre.objects.get(id=genre_id)
            except Genre.DoesNotExist:
                return Response({"detail": f"Genre with id {genre_id} not found."}, status=status.HTTP_400_BAD_REQUEST)

            # Filter movies that have this genre
            movies = Movie.objects.filter(genres=genre).distinct()

            if not movies.exists():
                return Response({"detail": f"No movies found for genre id {genre_id}."}, status=status.HTTP_400_BAD_REQUEST)

            serializer = MovieListSerializer(movies, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"detail": f" {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

@extend_schema(
        summary="Get Movies by Actor Name (partial, case-insensitive)",
        description="Returns all movies with poster, title, year, imdbRating, id for actors whose names contain the given string.",
        parameters=[
            OpenApiParameter(
                name="actor_name",
                description="Partial or full name of the actor (case-insensitive)",
                required=True,
                type=OpenApiTypes.STR,
                location=OpenApiParameter.QUERY
            )
        ],
        responses=MovieListSerializer(many=True),
        tags=["Movies"]
)
class MoviesByActorView(APIView):

    
    def get(self, request):
        try:
            actor_name = request.query_params.get('actor_name')
            if not actor_name:
                return Response({"detail": "The 'actor_name' query parameter is required."}, status=status.HTTP_400_BAD_REQUEST)

            actors = Actor.objects.filter(name__icontains=actor_name)
            if not actors.exists():
                return Response({"detail": f"No actors found matching '{actor_name}'."}, status=status.HTTP_400_BAD_REQUEST)

            # Filter movies where actors are in the filtered actors queryset
            movies = Movie.objects.filter(actors__in=actors).distinct()

            if not movies.exists():
                return Response({"detail": f"No movies found for actor name '{actor_name}'."}, status=status.HTTP_400_BAD_REQUEST)

            serializer = MovieListSerializer(movies, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"detail": f" {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)