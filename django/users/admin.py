from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _

from .models import CustomUser, Profile


class ProfileInline(admin.StackedInline):
    model = Profile
    max_num = 1
    can_delete = False

# Administrator(管理者権限でユーザー情報を編集可能にする)
class CustomUserAdmin(UserAdmin):
    inlines = [ProfileInline]
    fieldsets = (
        (None, {"fields": ("username", "password")}),
        # PersonalInfo == 編集可能項目
        (_("Personal info"), {
            "fields": ("first_name", "last_name", "email")}),
        (_("Permissions"), {"fields": ("is_active", "is_staff",
         "is_superuser", "groups", "user_permissions")}),
        (_("Important dates"), {"fields": ("last_login", "date_joined")}),
    )


admin.site.register(CustomUser, CustomUserAdmin)
