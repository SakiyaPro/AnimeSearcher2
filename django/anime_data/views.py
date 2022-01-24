from multiprocessing.sharedctypes import Value
import requests
import time
import types
from django.template.response import TemplateResponse

from anime_data.models.AnimeData import AnimeData
from anime_data.models.AnimeSeriesData import AnimeSeriesData
from anime_data.models.CastsData import CastsData
from anime_data.models.CharacterData import CharacterData
from anime_data.models.EpisodesData import EpisodesData
from anime_data.models.PersonData import PersonData
from anime_data.models.StaffsData import StaffsData

import glob

from django_filters import rest_framework as filters
from rest_framework import viewsets

from .serializer import AnimeDataSerializer, CharacterDataSerializer, PersonDataSerializer


class AnimeDataFilter(filters.FilterSet):
    # filter => annictId
    annictId_gte = filters.NumberFilter(
        field_name="annictId", lookup_expr='gte')  # ◯◯以上
    annictId_lte = filters.NumberFilter(
        field_name="annictId", lookup_expr='lte')  # 〇〇以下
    # filter => title
    title = filters.CharFilter(
        field_name="title", lookup_expr='contains')  # 部分一致
    titleEn = filters.CharFilter(
        field_name="titleEn", lookup_expr='contains')  # 部分一致
    titleKana = filters.CharFilter(
        field_name="titleKana", lookup_expr='contains')  # 部分一致
    titleRo = filters.CharFilter(
        field_name="titleRo", lookup_expr='contains')  # 部分一致
    # filter => casts, staffs
    casts = filters.CharFilter(
        field_name="casts", lookup_expr='contains')  # 部分一致
    staffs = filters.CharFilter(
        field_name="staffs", lookup_expr='contains')  # 部分一致
    # filter => episodes
    episodes = filters.CharFilter(
        field_name="episodes", lookup_expr='contains')  # 部分一致
    episodesCount_gte = filters.NumberFilter(
        field_name="episodesCount", lookup_expr='gte')  # ◯◯以上
    # filter => season
    seasonName = filters.CharFilter(
        field_name="seasonName", lookup_expr='contains')  # 部分一致
    seasonYear = filters.CharFilter(
        field_name="seasonYear", lookup_expr='contains')  # 部分一致
    seriesList = filters.CharFilter(
        field_name="seriesList", lookup_expr='contains')  # 部分一致
    # filter => watchersCount
    watchersCount_gte = filters.NumberFilter(
        field_name="watchersCount", lookup_expr='gte')  # ◯◯以上
    # filter => good & badCount
    goodCoount_gte = filters.NumberFilter(
        field_name="goodCoount", lookup_expr='gte')  # ◯◯以上
    badCoount_gte = filters.NumberFilter(
        field_name="badCoount", lookup_expr='gte')  # ◯◯以上
    # filter => image, tags
    image = filters.BooleanFilter(field_name="image")  # True or False
    tags = filters.BooleanFilter(field_name="tags")  # True or False

    class Meta:
        model = AnimeData
        # フィルタを列挙する。
        # デフォルトの検索方法でいいなら、モデルフィールド名のフィルタを直接定義できる。
        fields = '__all__'


class AnimeDataViewSet(viewsets.ModelViewSet):
    queryset = AnimeData.objects.order_by('annictId').all()
    serializer_class = AnimeDataSerializer
    filter_class = AnimeDataFilter


class CharacterDataViewSet(viewsets.ModelViewSet):
    queryset = CharacterData.objects.order_by('annictId').all()
    serializer_class = CharacterDataSerializer
    filter_fields = ("annictId",
                     "name",
                     "nameEn",
                     "nameKana",
                     "nickname",
                     "nicknameEn",
                     "age",
                     "ageEn",
                     "birthday",
                     "bloodType",
                     "birthdayEn",
                     "height",
                     "heightEn",
                     "weight",
                     "weightEn",
                     "nationality",
                     "nationalityEn",
                     "occupation",
                     "occupationEn",
                     "favoriteCharactersCount",
                     "series")


class PersonDataViewSet(viewsets.ModelViewSet):
    queryset = PersonData.objects.order_by('annictId').all()
    serializer_class = PersonDataSerializer
    filter_fields = ("annictId",
                     "name",
                     "nameEn",
                     "nameKana",
                     "nickname",
                     "nicknameEn",
                     "birthday",
                     "bloodType",
                     "genderText",
                     "height",
                     "castsCount",
                     "favoritePeopleCount")


def CreateAnimeDataImage(request):
    AnimeData.objects.filter(image="").update(
        image="anime/thumbnail/NoImageサンプル画像.jpg")

    data = AnimeData.objects.filter(image="NoImageサンプル画像.jpg")
    images = glob.glob('././anime_image_data/*.jpg')
    for img in images:
        str = img.removeprefix("././anime_image_data/").removesuffix(".jpg")
        try:
            data.filter(title=str).update(image='anime/thumbnail/'+str+'.jpg')
        except AnimeData.DoesNotExist:
            # ファイル名などに指定できないNGワードは事前に全角表示にリネームしているため、半角表示に戻して再度データを検索する
            NG_WORD = {"＼": "\\",
                       "／": "/",
                       "＊": "*",
                       "？": "?",
                       "``": '"',
                       "＜": "<",
                       "＞": ">",
                       "｜": "|", }
            for ng_word_key, ng_word_value in NG_WORD.items():
                if ng_word_key in str:
                    before_rename_str = str.replace(ng_word_key, ng_word_value)
            data.filter(title=before_rename_str).update(
                image='anime/thumbnail/'+str+'.jpg')

    return TemplateResponse(request, 'index.html')


def CreateData(request):
    url = 'https://api.annict.com/graphql'
    headers = {
        "Authorization": "Bearer y0dNazZ_ruzpUj4k_GhJ5Nn9PycfTWxixpGcRkrH7ow"}
    # animeData = AnimeData.objects.all().delete()
    annictIds = 664

    while True:
        work_query = """
    { searchWorks(annictIds: """ + str(annictIds) + """)
        { nodes
            { annictId title titleEn titleKana titleRo
            casts {
                nodes{
                    annictId name nameEn sortNumber
                    person {
                        annictId name nameEn nameKana nickname nicknameEn birthday bloodType genderText height castsCount favoritePeopleCount
                    }
                    character {
                        annictId name nameEn nameKana nickname nicknameEn age ageEn birthday birthdayEn bloodType bloodTypeEn height heightEn weight weightEn nationality nationalityEn occupation occupationEn description descriptionEn descriptionSource descriptionSourceEn favoriteCharactersCount
                    }
                }
            }
            staffs {
                nodes {
                    annictId name roleOther roleOtherEn
                }
            }
            episodes {
                nodes {
                    annictId number numberText title
                }
            }
            episodesCount seasonName seasonYear
            seriesList {
                nodes {
                    annictId name nameEn nameRo
                }
            }
            watchersCount
            }
        }
    }
"""
        params = {"query": work_query}

        try:
            res = requests.post(url, params=params, headers=headers).json()
            result = res["data"]["searchWorks"]["nodes"][0]
        except:
            annictIds += 1
            continue

        # AnimeData
        # annictId title titleEn titleKana titleRo
        # [casts: [character][person]] [staffs] [episodes]
        # episodesCount seasonName seasonYear
        # [seriesList]
        # watchersCount
        """
        create_data作成理由
        「update_or_createの際、resultデータを使用すると、
        annictIdが競合してしまうためエラーになるため」
        """
        create_data = result.copy()
        castsData = result["casts"]["nodes"]
        staffsData = result["staffs"]["nodes"]
        episodesData = result["episodes"]["nodes"]
        animeSeriesData = result["seriesList"]["nodes"]

        del create_data["annictId"], create_data["casts"], create_data["staffs"], create_data["episodes"], create_data["seriesList"]
        AnimeData.objects.update_or_create(
            annictId=result["annictId"], **create_data)
        anime_data = AnimeData.objects.get(annictId=result["annictId"])

        # CastsData
        # CharacterData
        # [annictId name nameEn nameKana nickname nicknameEn age ageEn birthday birthdayEn bloodType bloodTypeEn height heightEn weight weightEn nationality nationalityEn occupation occupationEn description descriptionEn descriptionSource descriptionSourceEn favoriteCharactersCount]
        # PersonData
        # [annictId birthday bloodType castsCount favoritePeopleCount genderText height name nameEn nameKana nickname nicknameEn]
        for cast in castsData:
            if cast is None:
                continue
            cast_annictId = cast.pop("annictId")
            person_annictId = cast["person"].pop("annictId")
            character_annictId = cast["character"].pop("annictId")
            # Person & Character Create
            PersonData.objects.update_or_create(
                annictId=person_annictId, **cast["person"])
            CharacterData.objects.update_or_create(
                annictId=character_annictId, **cast["character"])
            # Cast Create
            add_person = PersonData.objects.get(annictId=person_annictId)
            add_character = CharacterData.objects.get(
                annictId=character_annictId)
            del cast["person"], cast["character"]
            CastsData.objects.update_or_create(
                annictId=cast_annictId,
                **cast)
            add_cast = CastsData.objects.get(annictId=cast_annictId)
            add_cast.person.add(add_person)
            add_cast.character.add(add_character)
            # AnimeData Create
            anime_data.casts.add(add_cast)

        # StaffsData
        # [annictId name roleOther roleOtherEn roleText]
        for staff in staffsData:
            if staff is None:
                continue
            staff_annictId = staff.pop("annictId")
            StaffsData.objects.update_or_create(
                annictId=staff_annictId, **staff)
            add_staff = StaffsData.objects.get(annictId=staff_annictId)
            anime_data.staffs.add(add_staff)

        # EpisodesData
        # [annictId number numberText title]
        for episode in episodesData:
            if episode is None:
                continue
            episode_annictId = episode.pop("annictId")
            EpisodesData.objects.update_or_create(
                annictId=episode_annictId, **episode)
            add_episode = EpisodesData.objects.get(annictId=episode_annictId)
            anime_data.episodes.add(add_episode)

        # AnimeSeriesData
        # [annictId name nameEn nameRo]
        for series in animeSeriesData:
            if series is None:
                continue
            series_annictId = series.pop("annictId")
            AnimeSeriesData.objects.update_or_create(
                annictId=series_annictId, **series)
            add_series = AnimeSeriesData.objects.get(annictId=series_annictId)
            anime_data.seriesList.add(add_series)

        annictIds += 1
        if annictIds == 9200:
            break

    return TemplateResponse(request, 'index.html')
