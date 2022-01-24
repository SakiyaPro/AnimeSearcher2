from django.db.models.fields import IntegerField, TextField

from core_models.models import TimeStampedModel


class EpisodesData(TimeStampedModel):
    """ アニメのエピソードを記録 """
    annictId = IntegerField("AnnictId", unique=True)
    number = IntegerField("第◯話", null=True, blank=True)
    numberText = TextField("第◯話テキスト", null=True, blank=True)
    title = TextField("エピソードタイトル", null=True, blank=True)

    class Meta:
        app_label = 'anime_data'
        verbose_name_plural = "EpisodesData"
        db_table = "anime_episodes_db"
