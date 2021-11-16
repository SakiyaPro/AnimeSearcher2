from django.core.exceptions import ValidationError


def validation_list_and_dict(value):
    if type(value) is list:
        for v in value:
            if type(v) is dict:
                return
    raise ValidationError("1. list型で入力してください。 2. リストの中身はdict型で入力してください。")


def validation_list(value):
    if type(value) is list:
        return
    raise ValidationError("list型で入力してください。")


def validation_dict(value):
    if type(value) is dict:
        return
    raise ValidationError("dict型で入力してください。")
