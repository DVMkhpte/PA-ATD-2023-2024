import requests

# Exemple de données JSON
data = {
    "token": "59|hRVrvYB0BzOLcE4wNINF3Hj60RLnBtgSbLeb74WG",
    "role": "admin",
    "id": 3
}

# URL de l'API
url = "http://localhost:8000/api/user/login"

# Envoyer une requête POST avec les données JSON
response = requests.post(url, json=data)

# Vérifier si la requête a réussi (code de statut 200)
if response.status_code == 200:
    # Extraire les données JSON de la réponse
    response_data = response.json()

    # Accéder aux données de la réponse
    token = response_data["token"]
    role = response_data["role"]
    user_id = response_data["id"]

    # Effectuer des actions en fonction du rôle
    if role == "admin":
        # Rediriger l'utilisateur vers la page d'administration
        print("Redirection vers la page d'administration...")
    else:
        # Rediriger l'utilisateur vers une autre page
        print("Redirection vers une autre page...")

else:
    # Afficher un message d'erreur si la requête a échoué
    print("La requête a échoué avec le code de statut:", response.status_code)
