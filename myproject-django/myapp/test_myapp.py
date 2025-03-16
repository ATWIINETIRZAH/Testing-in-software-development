from django.test import TestCase

# Create your tests here.

import pytest
from myapp.models import User

@pytest.mark.django_db
def test_create_user():
    user = User.objects.create(name="John Doe", email="john@example.com")
    assert user.name == "John Doe"
