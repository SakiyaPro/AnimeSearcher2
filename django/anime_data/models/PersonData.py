from django.db import models
from django.db.models.fields import IntegerField, TextField

from core_models.models import TimeStampedModel


class PersonData(TimeStampedModel):
    # ------------AnnictAPI searchPeople-------------------------------------------
    ''' 声優の詳細情報
    '''
    annictId = IntegerField("AnnictId", unique=True)
    name = TextField("声優名", unique=True)
    nameEn = TextField("声優名EN", null=True, blank=True)
    nameKana = TextField("声優名かな", null=True, blank=True)
    nickname = TextField("ニックネーム", null=True, blank=True)
    nicknameEn = TextField("ニックネームEN", null=True, blank=True)
    birthday = TextField("誕生日", null=True, blank=True)
    bloodType = TextField("血液型", null=True, blank=True)
    genderText = TextField("性別", null=True, blank=True)
    height = TextField("身長", null=True, blank=True)
    castsCount = IntegerField("出演本数", null=True, blank=True)
    favoritePeopleCount = TextField("Annictユーザーお気に入り数", null=True, blank=True)
    # --------------------------------------------------------------------------

    class Meta:
        app_label = 'anime_data'
        verbose_name_plural = "PersonData"
        db_table = "anime_person_db"
