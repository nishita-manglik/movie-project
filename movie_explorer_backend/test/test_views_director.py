from rest_framework.test import APIClient
from dbmodels.models import Director
import pytest

@pytest.mark.django_db
def test_director_detail_view():
    director = Director.objects.create(name="James Cameron", birth={"year": 1954}, description="Known for Avatar", popular_movies="Titanic")
    client = APIClient()
    response = client.get(f"/api/directors/{director.id}/")
    assert response.status_code == 200
    assert response.data['name'] == "James Cameron"
