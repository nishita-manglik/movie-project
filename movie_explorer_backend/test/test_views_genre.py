from rest_framework.test import APIClient
from dbmodels.models import Genre
import pytest

@pytest.mark.django_db
def test_genre_list_view():
    Genre.objects.create(name="Action")
    Genre.objects.create(name="Comedy")

    client = APIClient()
    response = client.get("/api/genres/")
    assert response.status_code == 200
    assert len(response.data) == 2
