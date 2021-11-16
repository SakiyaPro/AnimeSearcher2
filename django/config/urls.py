from django.contrib import admin
from django.urls import path, include
from . import settings
from django.contrib.staticfiles.urls import static
from anime_data.urls import router as anime_data_router


urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('allauth.urls')),

    path('api/', include(anime_data_router.urls))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
