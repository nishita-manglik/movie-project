from rest_framework import serializers

from dbmodels.models import Actor

class ActorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actor
        fields = '__all__'