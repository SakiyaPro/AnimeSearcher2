from django.contrib import admin
from django.urls import path, include
from . import settings
from django.contrib.staticfiles.urls import static
from anime_data.urls import router as anime_data_router
from users.urls import router as users_router
from anime_data import views as anime_data_views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('allauth.urls')),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),

    path('api/', include(anime_data_router.urls)),
    path('users/', include(users_router.urls)),

    path('animeDataCreate/', anime_data_views.CreateData),
    path('animeImageCreate/', anime_data_views.CreateAnimeDataImage)
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
