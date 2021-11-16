from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _

from .models import CustomUser


# Administrator(管理者権限でユーザー情報を編集可能にする)
class CustomUserAdmin(UserAdmin):

    fieldsets   = (
            (None,{"fields":("username","password")}),
            (_("Personal info"),{"fields":("first_name","last_name","email", "user_icon")}),  # PersonalInfo == 編集可能項目
            (_("Permissions"),{"fields":("is_active","is_staff","is_superuser","groups","user_permissions")}),
            (_("Important dates"),{"fields":("last_login","date_joined")}),
    )


admin.site.register(CustomUser, CustomUserAdmin)
