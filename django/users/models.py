from django.db import models
from django.contrib.auth.models import AbstractUser

from anime_data.models.AnimeData import AnimeData


# カスタムユーザー
class CustomUser(AbstractUser):
    username = models.CharField('username', max_length=150, blank=True, null=True)
    email = models.EmailField('email', unique=True)

    # username認証からemail認証に変更
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta(AbstractUser.Meta):
        db_table = 'custom_users'


# ユーザープロフィール
class Profile(models.Model):
    user = models.OneToOneField(
        CustomUser, verbose_name="ユーザー", on_delete=models.CASCADE, null=True)  # ログインユーザーを指定
    user_icon = models.ImageField(
        "ユーザーアイコン", upload_to="user/icon", blank=True, null=False)
    favorite_anime = models.ManyToManyField(
        AnimeData, verbose_name="お気に入りのアニメ")
