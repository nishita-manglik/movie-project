from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view

from actor.serializers import ActorSerializer
from dbmodels.models import Actor
from drf_spectacular.utils import extend_schema
from rest_framework import generics
from rest_framework import status


@extend_schema(
    summary="Actor Details",
    description="Returns the detail of an actor based on actor ID.",
    responses=ActorSerializer,
    tags=["Actors"]
)
class ActorDetailAPIView(generics.RetrieveAPIView):
    queryset = Actor.objects.all()
    serializer_class = ActorSerializer
    lookup_field = 'id'  # This tells DRF to look for actor by ID

    def get_object(self):
        try:
            return self.queryset.get(id=self.kwargs['id'])
        except Actor.DoesNotExist:
            return Response(
                    {"detail": "No actor data available in the database."},
                    status=status.HTTP_400_BAD_REQUEST
                )
        except Exception as e:
            return Response({"detail": f" {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)