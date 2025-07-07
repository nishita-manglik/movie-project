from dbmodels.models import Genre
from .serializers import GenreSerializer
from drf_spectacular.utils import extend_schema
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response

# Create your views here.


@extend_schema(
    summary="Get All Genres",
    description="Returns a list of all genres available in the database.",
    responses={200: GenreSerializer(many=True)},
    tags=["Genres"]
)
class GenreListView(APIView):

    def get(self, request):
        try:
            genres = Genre.objects.all()
            serializer = GenreSerializer(genres, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"detail": f"Server error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

