from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from drf_spectacular.utils import extend_schema
from dbmodels.models import Director
from director.serializers import DirectorSerializer
from rest_framework import generics
from rest_framework import status


@extend_schema(
    summary="Director Details",
    description="Returns the detail of an director based on actor ID.",
    responses=DirectorSerializer,
    tags=["Directors"]
)
class ActorDetailAPIView(generics.RetrieveAPIView):
    queryset = Director.objects.all()
    serializer_class = DirectorSerializer
    lookup_field = 'id'  # This tells DRF to look for actor by ID

    def get_object(self):
        try:
            return self.queryset.get(id=self.kwargs['id'])
        except Director.DoesNotExist:
            return Response(
                    {"detail": "No director data available in the database."},
                    status=status.HTTP_400_BAD_REQUEST
                )
        except Exception as e:
            return Response({"detail": f" {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)