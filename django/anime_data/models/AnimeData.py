from core_models.models import TimeStampedModel
from django.db import models
from django.db.models.fields import IntegerField, TextField, PositiveIntegerField
from django.db.models.fields.files import ImageField, FileField
from taggit.managers import TaggableManager

from .models_validations.models_validations import *


class AnimeData(TimeStampedModel):
    # --------AnnictAPI searchWorks-------------------------------------
    annictId = IntegerField("AnnictId", unique=True)
    title = TextField("タイトル", unique=True)
    titleEn = TextField("タイトルEN", null=True, blank=True)
    titleKana = TextField("タイトルかな", null=True, blank=True)
    titleRo = TextField("タイトルRO", null=True, blank=True)
    casts = TextField("キャスト・声優", validators=[
                      validation_list_and_dict], null=True, blank=True)  # キャスト
    staffs = TextField("スタッフ・制作会社", validators=[
                       validation_list_and_dict], null=True, blank=True)  # 制作会社
    episodes = TextField("各エピソード詳細", validators=[
                         validation_list_and_dict], null=True, blank=True)  # エピソード詳細
    episodesCount = IntegerField("総エピソード数", null=True, blank=True)
    seasonName = TextField("放送季節", null=True, blank=True)
    seasonYear = TextField("放送年", null=True, blank=True)
    seriesList = TextField("アニメシリーズ", validators=[
                           validation_dict], null=True, blank=True)  # シリーズ名
    watchersCount = IntegerField(
        "Annict視聴者数", null=True, blank=True)  # GoodRate出来上がるまでの指標
    # ------------MyAPI---------------------------------------------------------
    goodCoount = PositiveIntegerField("Good Count", null=True, blank=True)
    badCoount = PositiveIntegerField("bad Count", null=True, blank=True)
    image = ImageField(upload_to='anime/thumbnail')
    tags = TaggableManager(blank=True)
    # --------------------------------------------------------------------------

    def __str__(self):
        return str(self.annictId) + '-' + self.title

    class Meta:
        app_label = 'anime_data'
        verbose_name_plural = "AnimeData"
        db_table = "anime_db"
