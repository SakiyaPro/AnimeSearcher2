# coding: utf-8

from rest_framework import serializers

from .models.AnimeData import AnimeData
from .models.CharacterData import CharacterData
from .models.PersonData import PersonData


class AnimeDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnimeData
        exclude = ("id", "created", "modified")


class CharacterDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = CharacterData
        exclude = ("id", "created", "modified")


class PersonDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonData
        exclude = ("id", "created", "modified")
