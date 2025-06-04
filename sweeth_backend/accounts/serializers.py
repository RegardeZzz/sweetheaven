from rest_framework import serializers
from .models import CustomUser
import uuid  # Для генерации уникального username

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['email', 'first_name', 'last_name', 'phone', 'password']

    def create(self, validated_data):
        # Генерируем уникальный username — можно использовать email или uuid
        user = CustomUser(
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            phone=validated_data['phone']
        )
        user.set_password(validated_data['password'])  # Хешируем пароль
        user.save()
        return user
