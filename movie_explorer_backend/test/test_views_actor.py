from rest_framework.test import APIClient
from dbmodels.models import Actor
import pytest

@pytest.mark.django_db
def test_actor_detail_view():
    actor = Actor.objects.create(name="Brad Pitt", birth={"year": 1963}, description="Hollywood actor", popular_movies="Fight Club")
    client = APIClient()
    response = client.get(f"/api/actors/{actor.id}/")
    assert response.status_code == 200
    assert response.data['name'] == "Brad Pitt"
