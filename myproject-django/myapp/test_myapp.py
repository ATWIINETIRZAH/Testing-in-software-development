from django.test import TestCase

# # Create your tests here.

#test for creating user
# import pytest
# from myapp.models import User

# @pytest.mark.django_db
# def test_create_user():
#     user = User.objects.create(name="John Doe", email="john@example.com")
#     assert user.name == "John Doe"



# from django.contrib.auth.models import User
# from rest_framework import status
# from rest_framework.test import APITestCase

# class UserAuthenticationTestCase(APITestCase):

#     def setUp(self):
#         # Create a user for testing login
#         self.username = "testuser"
#         self.password = "testpassword123"
#         self.user = User.objects.create_user(username=self.username, password=self.password)
#         self.login_url = '/auth/login/'

#     def test_login_valid_user(self):
#         # Test login with valid credentials
#         data = {'username': self.username, 'password': self.password}
#         response = self.client.post(self.login_url, data, format='json')

#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertIn('token', response.data)
#         self.assertEqual(response.data['message'], 'Login successful')

#     def test_login_invalid_user(self):
#         # Test login with invalid credentials
#         data = {'username': self.username, 'password': 'wrongpassword'}
#         response = self.client.post(self.login_url, data, format='json')

#         self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
#         self.assertEqual(response.data['error'], 'Invalid credentials')

#     def test_login_user_not_found(self):
#         # Test login with a non-existing user
#         data = {'username': 'nonexistentuser', 'password': 'anypassword'}
#         response = self.client.post(self.login_url, data, format='json')

#         self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
#         self.assertEqual(response.data['error'], 'Invalid credentials')


# from rest_framework.test import APITestCase
# from rest_framework import status
# from django.contrib.auth.models import User

# class UserAuthenticationTestCase(APITestCase):
#     def setUp(self):
#         # Create a user for testing login
#         self.username = "testuser"
#         self.password = "testpassword123"
#         self.user = User.objects.create_user(username=self.username, password=self.password)
#         self.login_url = '/auth/login/'

#     def test_login_valid_user(self):
#         # Test login with valid credentials
#         data = {'username': self.username, 'password': self.password}
#         response = self.client.post(self.login_url, data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertIn('token', response.data)
#         self.assertEqual(response.data['message'], 'Login successful')

#     def test_login_invalid_user(self):
#         # Test login with invalid credentials
#         data = {'username': self.username, 'password': 'wrongpassword'}
#         response = self.client.post(self.login_url, data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
#         self.assertEqual(response.data['error'], 'Invalid credentials')

#     def test_login_user_not_found(self):
#         # Test login with a non-existing user
#         data = {'username': 'nonexistentuser', 'password': 'anypassword'}
#         response = self.client.post(self.login_url, data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
#         self.assertEqual(response.data['error'], 'Invalid credentials')

#     def setUp(self):
#         # Create a test user in the database
#         self.username = 'testuser'
#         self.password = 'testpassword'
#         self.user = User.objects.create_user(username=self.username, password=self.password)
#         self.login_url = '/api/login/'  # Adjust to your actual login URL



from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from rest_framework import status

class UserAuthenticationTestCase(APITestCase):
    def setUp(self):
        self.username = "testuser"
        self.password = "testpassword123"
        self.user = User.objects.create_user(username=self.username, password=self.password)
        self.login_url = '/login/'  # Correct URL for login

    def test_login_valid_user(self):
        data = {'username': self.username, 'password': self.password}
        response = self.client.post(self.login_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('token', response.data)  # Check that the token is in the response
        self.assertIn('refresh_token', response.data)  # Optionally check the refresh token
        self.assertEqual(response.data['message'], 'Login successful')

    def test_login_invalid_user(self):
        data = {'username': self.username, 'password': 'wrongpassword'}
        response = self.client.post(self.login_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'Invalid credentials')

    def test_login_user_not_found(self):
        data = {'username': 'nonexistentuser', 'password': 'anypassword'}
        response = self.client.post(self.login_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'Invalid credentials')
