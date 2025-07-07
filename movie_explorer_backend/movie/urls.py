from django.urls import path
from . import views

urlpatterns = [
    path('', views.MovieListAPIView.as_view(), name='movie-list'),
    path('<int:id>/', views.MovieDetailAPIView.as_view(), name='movie-detail'),
    path('by-director/', views.MoviesByDirectorView.as_view(), name='movies-by-director'),
    path('by-name/', views.MoviesByNameView.as_view(), name='movies-by-name'),
    path('by-genre/', views.MoviesByGenreView.as_view(), name='movies-by-genre'),
    path('by-actor/', views.MoviesByActorView.as_view(), name='movies-by-actor'),
    
]
