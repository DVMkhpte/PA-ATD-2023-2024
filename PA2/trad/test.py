import requests

url = "http://localhost:63342/PA-ATD-2023-2024/PA2/pages/donation.php"
response = requests.get(url)
html_content = response.text

