from rest_framework import serializers

from users.models import CustomUser, Profile
from anime_data.models.AnimeData import AnimeData
from anime_data.serializer import AnimeDataSerializer


class CustomUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = '__all__'


class ProfileSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer()
    favorite_anime = AnimeDataSerializer(many=True)

    class Meta:
        model = Profile
        fields = '__all__'
