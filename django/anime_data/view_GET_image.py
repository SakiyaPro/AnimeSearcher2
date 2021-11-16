""" from requests_html import HTMLSession
import chromedriver_binary
from selenium import webdriver
import time
import requests
import uuid
from bs4 import BeautifulSoup

driver = webdriver.Chrome()

keyword = "アニメ 無料 鬼滅の刃"

# ダウンロードしたwebdriverのpathを指定
# webブラウザを起動
wd = webdriver.Chrome()
# googleにアクセス
wd.get('https://google.com')
# 検索boxを選択する. 選択する方法は複数ある
search_box = wd.find_element_by_name('q')
# search_box = wd.find_element_by_css_selector('input.gLFyf')
# search_box = wd.find_element_by_class_name('gLFyf')

# Qiitaを検索する
search_box.send_keys('Qiita')
search_box.submit()
time.sleep(5)
# webブラウザを終了する
wd.quit()
 """




"""
if keyword[-1:] == "%":
    keyword += "25"
if keyword[-1:] == "+":
    keyword += "2B"

session = HTMLSession()
url = f"https://www.google.com/search?safe=off&site=&tbm=isch&source=hp&q={keyword}&oq={keyword}&gs_l=img"

r = session.get(url)
soup = BeautifulSoup(r.text, 'lxml')
div = soup.find('div', class_="isv-r PNCib MSM1fd BUooTd")

session = HTMLSession()
url += "&#imgrc=" + div["data-id"]
r = session.get(url)
r.html.render()
print(r)
soup = BeautifulSoup(r.text, 'lxml')
print(soup)
img = soup.find("img", "n3VNCb")

r = requests.get(img['src'])
with open(str('./picture/')+str(uuid.uuid4())+str('.jpg'), 'wb') as file:
    file.write(r.content)
 """
