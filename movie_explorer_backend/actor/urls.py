from django.urls import path
from . import views


urlpatterns = [
    path('<int:id>/', views.ActorDetailView.as_view(), name='actor-detail'),
    
]
