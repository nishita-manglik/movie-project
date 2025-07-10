from django.urls import path
from . import views


urlpatterns = [
    path('<int:id>/', views.DirectorDetailView.as_view(), name='director-detail'),
    
]