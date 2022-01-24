from django.db.models.fields import IntegerField, TextField

from core_models.models import TimeStampedModel


class StaffsData(TimeStampedModel):
    """ アニメのスタッフを記録 """
    annictId = IntegerField("AnnictId", unique=True)
    name = TextField("スタッフ名", null=True, blank=True)
    roleOther = TextField("職業", null=True, blank=True)
    roleOtherEn = TextField("職業EN", null=True, blank=True)

    class Meta:
        app_label = 'anime_data'
        verbose_name_plural = "StaffsData"
        db_table = "anime_staffs_db"
