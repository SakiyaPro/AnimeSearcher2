from django.contrib.auth.forms import UserCreationForm
from .models import CustomUser


# CustomUser が入力できる Form を作成
class SignupForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model   = CustomUser
        fields  = ("username","email")
