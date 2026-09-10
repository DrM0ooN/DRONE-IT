from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView

from .models import AccountProfile
from .serializers import RegisterSerializer, build_user_payload


def ensure_profile(user, user_type='customer'):
    profile, _ = AccountProfile.objects.get_or_create(user=user, defaults={'user_type': user_type})
    if not profile.user_type:
        profile.user_type = user_type
        profile.save(update_fields=['user_type'])
    return profile


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token, _ = Token.objects.get_or_create(user=user)
        return Response({'token': token.key, 'user': build_user_payload(user)}, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username', '').strip()
        password = request.data.get('password', '')
        user = authenticate(username=username, password=password)

        if not user:
            return Response({'detail': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

        ensure_profile(user)
        token, _ = Token.objects.get_or_create(user=user)
        return Response({'token': token.key, 'user': build_user_payload(user)})


class UpdateProfileView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user
        profile = ensure_profile(user)

        user_fields = ('first_name', 'last_name', 'email')
        profile_fields = (
            'user_type',
            'phone_number',
            'address',
            'city',
            'postal_code',
            'company_name',
            'business_registration_number',
            'tax_id',
        )

        changed_user_fields = []
        for field in user_fields:
            if field in request.data:
                setattr(user, field, request.data[field])
                changed_user_fields.append(field)

        changed_profile_fields = []
        for field in profile_fields:
            if field in request.data:
                setattr(profile, field, request.data[field])
                changed_profile_fields.append(field)

        if changed_user_fields:
            user.save(update_fields=changed_user_fields)
        if changed_profile_fields:
            profile.save(update_fields=changed_profile_fields)

        return Response({'user': build_user_payload(user)})