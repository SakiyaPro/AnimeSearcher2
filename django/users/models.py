from django.contrib.auth.models import AbstractUser
from django.db.models.fields.files import ImageField


# add CustomUserModel
class CustomUser(AbstractUser):
    user_icon = ImageField(upload_to="user/img/icon", null=True, blank=True)

    class Meta(AbstractUser.Meta):
        db_table    = 'custom_users'
