from rest_framework.response import Response
from drf_spectacular.utils import extend_schema
from dbmodels.models import Director
from director.serializers import DirectorSerializer
from rest_framework.views import APIView
from rest_framework import status

@extend_schema(
    summary="Director details",
    description="Returns the detail of an director based on director ID.",
    responses={200: DirectorSerializer},
    tags=["Directors"]
)
class DirectorDetailView(APIView):

    def get(self, request, id):
        try:
            director = Director.objects.get(id=id)
            serializer = DirectorSerializer(director)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Director.DoesNotExist:
            return Response({"detail": f"Director with id {id} not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"detail": f"Server error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)