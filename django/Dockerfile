# 公式からpython3.7 on alpine linuxイメージをpull
FROM python:3.9-slim-buster

# 作業ディレクトリを設定
WORKDIR /usr/src/django

# environment
# Pythonがpyc filesとdiscへ書き込むことを防ぐ
ENV PYTHONDONTWRITEBYTECODE 1
# Pythonが標準入出力をバッファリングすることを防ぐ
ENV PYTHONUNBUFFERED 1

# Pipenvをインストール
RUN pip install --upgrade setuptools pip \
    && pip install pipenv \
    && apt update \
    && apt install -y sqlite3

# ホストのpipfileをコンテナの作業ディレクトリにコピー
COPY ./Pipfile /usr/src/django/Pipfile

# pipfileからパッケージをインストールしてDjango環境を構築
RUN pipenv install django==3.2
RUN pipenv install --skip-lock --system --dev

# ホストのカレントディレクトリ（現在はappディレクトリ）を作業ディレクトリにコピー
COPY . /usr/src/django/
