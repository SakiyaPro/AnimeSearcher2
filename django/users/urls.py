# coding: utf-8
from rest_framework import routers
from users.views import CustomUserViewSet, ProfileViewSet

router = routers.DefaultRouter()
router.register('user', CustomUserViewSet)
router.register('profile', ProfileViewSet)
