# coding: utf-8
from rest_framework import routers
from . import views


router  = routers.DefaultRouter()
router.register('animedata', views.AnimeDataViewSet)
router.register('characterdata', views.CharacterDataViewSet)
router.register('persondata', views.PersonDataViewSet)
