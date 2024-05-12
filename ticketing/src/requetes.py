import requests

data = {
    "token": "59|hRVrvYB0BzOLcE4wNINF3Hj60RLnBtgSbLeb74WG",
    "role": "admin",
    "id": 3
}

url = "http://localhost:8000/api/user/login"

response = requests.post(url, json=data)

if response.status_code == 200:
    response_data = response.json()

    token = response_data["token"]
    role = response_data["role"]
    user_id = response_data["id"]

    if role == "admin":
        print("Redirection vers la page d'administration...")
    else:
        print("Redirection vers une autre page...")

else:
    print("La requête a échoué avec le code de statut:", response.status_code)
