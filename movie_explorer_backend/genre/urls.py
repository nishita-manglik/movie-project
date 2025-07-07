from django.urls import path
from genre.views import GenreListView

urlpatterns = [
    path('', GenreListView.as_view(), name='genre-list'),
]