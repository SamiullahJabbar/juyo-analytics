from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
from django.core.exceptions import ObjectDoesNotExist

# Get the custom User model
User = get_user_model()

class PasswordUpdateSerializer(serializers.Serializer):
    email = serializers.EmailField()
    current_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True, min_length=8)

    def validate(self, data):
        email = data.get('email')
        current_password = data.get('current_password')

        # Try to fetch the user using email
        try:
            user = User.objects.get(email=email)
        except ObjectDoesNotExist:
            raise serializers.ValidationError("User with this email does not exist.")

        # Authenticate user using email and current password
        # Adjust if your custom User model uses `email` as the username field
        authenticated_user = authenticate(username=user.username, password=current_password)
        if not authenticated_user:
            raise serializers.ValidationError("Invalid current password.")

        return data

    def update_password(self):
        email = self.validated_data['email']
        new_password = self.validated_data['new_password']

        # Get the user by email
        user = User.objects.get(email=email)

        # Update the password
        user.set_password(new_password)
        user.save()
        return user
