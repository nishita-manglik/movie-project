from rest_framework.response import Response
from rest_framework.views import APIView

from actor.serializers import ActorSerializer
from dbmodels.models import Actor
from drf_spectacular.utils import extend_schema
from rest_framework import status

@extend_schema(
    summary="Actor Details",
    description="Returns the detail of an actor based on actor ID.",
    responses=ActorSerializer,
    tags=["Actors"]
)
class ActorDetailView(APIView):

    def get(self, request, id):
        try:
            actor = Actor.objects.get(id=id)
            serializer = ActorSerializer(actor)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Actor.DoesNotExist:
            return Response({"detail": f"Actor with id {id} not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"detail": f"Server error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)