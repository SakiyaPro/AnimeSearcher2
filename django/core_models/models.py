from django.db import models


"""
created,modifiedフィールドを更新する抽象基底クラス
"""

class TimeStampedModel(models.Model):

    created = models.DateTimeField(auto_now_add=True)  # 作成日時
    modified = models.DateTimeField(auto_now=True)  # 更新日時

    class Meta:
        abstract = True
