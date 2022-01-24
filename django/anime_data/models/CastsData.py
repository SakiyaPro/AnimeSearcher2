from django.db import models
from django.db.models.fields import IntegerField, TextField

from core_models.models import TimeStampedModel
from anime_data.models.CharacterData import CharacterData
from anime_data.models.PersonData import PersonData


class CastsData(TimeStampedModel):
    """ アニメのスタッフを記録 """
    annictId = IntegerField("AnnictId", unique=True)
    name = TextField("声優名", null=True, blank=True)
    nameEn = TextField("声優名EN", null=True, blank=True)
    sortNumber = IntegerField("ソート番号", null=True, blank=True)
    person = models.ManyToManyField(PersonData)
    character = models.ManyToManyField(CharacterData)

    class Meta:
        app_label = 'anime_data'
        verbose_name_plural = "CastsData"
        db_table = "anime_casts_db"
