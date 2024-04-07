import requests
import uuid
from bs4 import BeautifulSoup
import os

def read_html_content(file_path):
    if not os.path.exists(file_path):
        print("Le fichier spécifié n'existe pas.")
        return None

    with open(file_path, 'r', encoding='utf-8') as file:
        html_content = file.read()

    return html_content

def translate_text(text, from_lang='fr', to_lang=['en']):
    key = "f32f4d2ab3a34a14ae249e8811c79f5d"
    endpoint = "https://api.cognitive.microsofttranslator.com/translate"
    location = "francecentral"
    constructed_url = endpoint
    params = {
        'api-version': '3.0',
        'from': from_lang,
        'to': to_lang
    }
    headers = {
        'Ocp-Apim-Subscription-Key': key,
        'Ocp-Apim-Subscription-Region': location,
        'Content-type': 'application/json',
        'X-ClientTraceId': str(uuid.uuid4())
    }
    body = [{'text': text}]
    request = requests.post(constructed_url, params=params, headers=headers, json=body)
    response = request.json()
    print("Response from translation API:", response)  # Ajout d'une instruction print pour débogage
    translations = [item['translations'][0]['text'] for item in response]
    return translations

def translate_html_content(html_content):
    soup = BeautifulSoup(html_content, 'html.parser')

    text_to_translate = []


    for element in soup.find_all(["h1", "p", "a", "button", "span", "div", "label"], class_=True):
        text_to_translate.append(element.get_text())


    translated_text = translate_text(' '.join(text_to_translate))


    translated_index = 0
    for element in soup.find_all(["h1", "p", "a", "button", "span", "div", "label"], class_=True):
        element.string = translated_text[translated_index]
        translated_index += 1

    return str(soup)



file_path = "../pages/donation.php"
html_content = read_html_content(file_path)

if html_content:
    translated_html_content = translate_html_content(html_content)

    print(translated_html_content)
else:
    print("Impossible de lire le contenu du fichier.")
