from django.contrib import admin
from django.utils.safestring import mark_safe

from .models import AnimeData, PersonData, CharacterData


class AnimeData_Admin(admin.ModelAdmin):
    list_display = ('annictId', 'title', 'image_preview')
    search_fields = ['annictId', 'title']
    ordering = ('annictId',)
    def image_preview(self, obj):
        if obj.image:
            return mark_safe('<img src="{}" style="width:100px; height:auto;">'.format(obj.image.url))
        else:
            return

    image_preview.short_description = 'プレビュー'


admin.site.register(AnimeData, AnimeData_Admin)
admin.site.register(PersonData)
admin.site.register(CharacterData)
