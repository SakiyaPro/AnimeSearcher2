import requests
from django.template.response import TemplateResponse

from .models.AnimeData import AnimeData
from .models.CharacterData import CharacterData
from .models.PersonData import PersonData

import glob

from rest_framework import viewsets, filters
from .serializer import AnimeDataSerializer, CharacterDataSerializer, PersonDataSerializer


class AnimeDataViewSet(viewsets.ModelViewSet):
    queryset = AnimeData.objects.order_by('annictId').all()
    serializer_class = AnimeDataSerializer
    filter_fields = ('annictId',
                     'title',
                     'casts',
                     'staffs',
                     'episodes',
                     'episodesCount',
                     'seasonName',
                     'seasonYear',
                     'seriesList',
                     'watchersCount')


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


def CreateAnimeData(request):
    num1 = 100
    num100 = 300
    limit_annictId = 9200
    result = []

    while True:
        url = 'https://api.annict.com/graphql'
        annictIds = ' '.join(map(str, range(num1, num100)))
        query = """{
  searchWorks(annictIds: [""" + annictIds + """]) {
    nodes {
      annictId
      title
      titleEn
      titleKana
      titleRo
      casts {
        nodes{
          annictId
          name
          nameEn
          sortNumber
          person{
            annictId
            name
          }
          character{
            name
          }
        }
      }
      staffs {
        nodes{
          annictId
          name
          roleOther
          roleOtherEn
          roleText
        }
      }
      episodes{
        nodes{
          annictId
          number
          numberText
          title
        }
      }
      episodesCount
      seasonName
      seasonYear
      seriesList{
        nodes{
          name
          nameEn
          nameRo
        }
      }
      watchersCount
            }
        }
    }
    """
        headers = {
            "Authorization": "Bearer ddFGRn8UPCE7YMjHfLB08dp4mdMKrt82HLwWJbWBOko",
        }
        params = {
            "query": query,
        }

        try:
            r = requests.post(url, params=params, headers=headers).json()
            print("for文へ")
            for value in r["data"]["searchWorks"]["nodes"]:
                if value is None:
                    continue
                result.append(value)
                print("OK")

        except:
            print("""
            -
            -
            -
            -
            -
            -
            -
            ERROR  !!!!!!!!!!!!!
            -
            -
            -
            -
            -
            -
            -
            """)

        num1 += 200
        num100 += 200

        if num100 >= limit_annictId:
            break

    for value in result:
        value["casts"] = value["casts"]["nodes"]
        value["staffs"] = value["staffs"]["nodes"]
        value["episodes"] = value["episodes"]["nodes"]
        value["seriesList"] = value["seriesList"]["nodes"]
        AnimeData.objects.create(**value)
        print("data is created!")

    return TemplateResponse(request, 'index.html')


def CreateAnimeDataImage(request):
    data = AnimeData.objects.all().order_by('id')
    images = glob.glob('././anime_image_data/*.jpg')
    for img in images:
        str = img.removeprefix("././anime_image_data/").removesuffix(".jpg")
        data.filter(title=str).update(image='anime/thumbnail/'+str+'.jpg')

    return TemplateResponse(request, 'index.html')


def CreateCharacterData(request):
    num1 = 40400
    num100 = 40600
    limit_annictId = 40700
    result = []

    while True:
        url = 'https://api.annict.com/graphql'
        annictIds = ' '.join(map(str, range(num1, num100)))
        query = """{searchCharacters(annictIds: [""" + annictIds + """]){
            nodes {
                annictId
                name
                nameEn
                nameKana
                nickname
                nicknameEn
                age
                ageEn
                birthday
                birthdayEn
                bloodType
                birthdayEn
                height
                heightEn
                weight
                weightEn
                nationality
                nationalityEn
                occupation
                occupationEn
                description
                descriptionEn
                descriptionSource
                descriptionSourceEn
                favoriteCharactersCount
                series {
                    name
                    nameEn
                    nameRo
                }
            }
        }
    }"""
        headers = {
            "Authorization": "Bearer ddFGRn8UPCE7YMjHfLB08dp4mdMKrt82HLwWJbWBOko",
        }
        params = {
            "query": query,
        }

        try:
            r = requests.post(url, params=params, headers=headers).json()
            print("for文へ")
            for value in r["data"]["searchCharacters"]["nodes"]:
                if value is None:
                    continue
                result.append(value)
                print("OK")

        except:
            print("""
            -
            -
            -
            -
            -
            -
            -
            ERROR  !!!!!!!!!!!!!
            -
            -
            -
            -
            -
            -
            -
            """)

        num1 += 200
        num100 += 200

        if num100 >= limit_annictId:
            break

    for value in result:
        annictId = value["annictId"]
        name = value["name"]
        nameEN = value["nameEn"]
        nameKana = value["nameKana"]
        nickname = value["nickname"]
        nicknameEN = value["nicknameEn"]
        age = value["age"]
        ageEN = value["ageEn"]
        birthday = value["birthday"]
        birthdayEN = value["birthdayEn"]
        bloodType = value['bloodType']
        height = value['height']
        heightEN = value['heightEn']
        weight = value['weight']
        weightEN = value['weightEn']
        nationality = value['nationality']
        nationalityEN = value['nationalityEn']
        occupation = value['occupation']
        occupationEN = value['occupationEn']
        description = value['description']
        descriptionEN = value['descriptionEn']
        descriptionSource = value['descriptionSource']
        descriptionSourceEN = value['descriptionSourceEn']
        favoriteCharactersCount = value['favoriteCharactersCount']
        series = value['series']
        CharacterData.objects.create(
            annictId=annictId,
            name=name,
            nameEn=nameEN,
            nameKana=nameKana,
            nickname=nickname,
            nicknameEn=nicknameEN,
            age=age,
            ageEn=ageEN,
            birthday=birthday,
            birthdayEn=birthdayEN,
            bloodType=bloodType,
            height=height,
            heightEn=heightEN,
            weight=weight,
            weightEn=weightEN,
            nationality=nationality,
            nationalityEn=nationalityEN,
            occupation=occupation,
            occupationEn=occupationEN,
            description=description,
            descriptionEn=descriptionEN,
            descriptionSource=descriptionSource,
            descriptionSourceEn=descriptionSourceEN,
            favoriteCharactersCount=favoriteCharactersCount,
            series=series,
        )
        print("data is created!")

    return TemplateResponse(request, 'index.html')
