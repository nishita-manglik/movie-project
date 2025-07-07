from django.urls import path
from . import views


urlpatterns = [
    path('<int:id>/', views.ActorDetailAPIView.as_view(), name='actor-detail'),
    
]