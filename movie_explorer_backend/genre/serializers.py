# serializers.py
from rest_framework import serializers
from dbmodels.models import Genre

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['id', 'name']
