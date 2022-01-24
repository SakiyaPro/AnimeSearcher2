from django.db import models
from django.db.models.fields import IntegerField, TextField

from core_models.models import TimeStampedModel
from .models_validations.models_validations import *
from anime_data.models.AnimeSeriesData import AnimeSeriesData


class CharacterData(TimeStampedModel):
    # ------------AnnictAPI searchCharacters-------------------------------------------
    annictId = IntegerField("AnnictId", unique=True)
    name = TextField("キャラ名", null=True, blank=True)
    nameEn = TextField("キャラ名EN", null=True, blank=True)
    nameKana = TextField("キャラ名かな", null=True, blank=True)
    nickname = TextField("ニックネーム", null=True, blank=True)
    nicknameEn = TextField("ニックネームEN", null=True, blank=True)
    age = TextField("年齢", null=True, blank=True)
    ageEn = TextField("年齢EN", null=True, blank=True)
    birthday = TextField("誕生日", null=True, blank=True)
    birthdayEn = TextField("誕生日EN", null=True, blank=True)
    bloodType = TextField("血液型", null=True, blank=True)
    bloodTypeEn = TextField("血液型EN", null=True, blank=True)
    height = TextField("誕生日", null=True, blank=True)
    heightEn = TextField("誕生日", null=True, blank=True)
    weight = TextField("誕生日", null=True, blank=True)
    weightEn = TextField("誕生日", null=True, blank=True)
    nationality = TextField("国籍", null=True, blank=True)
    nationalityEn = TextField("国籍EN", null=True, blank=True)
    occupation = TextField("職業", null=True, blank=True)
    occupationEn = TextField("職業EN", null=True, blank=True)
    description = TextField("キャラ紹介", null=True, blank=True)
    descriptionEn = TextField("キャラ紹介EN", null=True, blank=True)
    descriptionSource = TextField("キャラ紹介ソース", null=True, blank=True)
    descriptionSourceEn = TextField("キャラ紹介ソースEN", null=True, blank=True)
    favoriteCharactersCount = IntegerField(
        "Annictユーザーお気に入り数", null=True, blank=True)
    # --------------------------------------------------------------------------

    class Meta:
        app_label = 'anime_data'
        verbose_name_plural = "CharacterData"
        db_table = "anime_character_db"
