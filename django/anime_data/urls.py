
# coding: utf-8
from django.urls import path
from rest_framework import routers

from . import views


router  = routers.DefaultRouter()
router.register('animedata', views.AnimeDataViewSet)
router.register('characterdata', views.CharacterDataViewSet)
router.register('persondata', views.PersonDataViewSet)


""" urlpatterns = [
    # AnimeData の情報を AnnictAPI から取得・反映
    path('CreateAnimeData/', views.CreateAnimeData,
         name="CreateAnimeData"),
    # AnimeData のうち、AnnictAPI から取得できない image を取得・反映
    path('CreateAnimeDataImage/', views.CreateAnimeDataImage,
         name='CreateAnimeDataImage'),
    # CharacterData の情報を AnnictAPI から取得・反映
    path('CreateCharacterData/', views.CreateCharacterData,
         name="CreateCharacterData"),
] """
