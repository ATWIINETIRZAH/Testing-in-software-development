from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny 

# class LoginAPI(APIView):
#     def post(self, request):

#         permission_classes = [AllowAny]

#         # Get username and password from the request body
#         username = request.data.get('username')
#         password = request.data.get('password')

#         # Check if the user exists
#         try:
#             user = User.objects.get(username=username)
#         except User.DoesNotExist:
#             return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

#         # Authenticate the user
#         if user.check_password(password):
#             # Generate token using Simple JWT
#             refresh = RefreshToken.for_user(user)
#             return Response({
#                 "message": "Login successful",
#                 "token": str(refresh.access_token),  # Provide the access token
#                 "refresh_token": str(refresh),      # Optionally, include the refresh token
#             }, status=status.HTTP_200_OK)
#         else:
#             return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)


from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

class LoginAPI(APIView):
    permission_classes = [AllowAny]

    @method_decorator(csrf_exempt)  # Disable CSRF validation
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

        if user.check_password(password):
            refresh = RefreshToken.for_user(user)
            return Response({
                "message": "Login successful",
                "token": str(refresh.access_token),
                "refresh_token": str(refresh),
            }, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)
