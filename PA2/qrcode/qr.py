import qrcode

def generate_qr_code(product_data):
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(format_product_data(product_data))  # Utilisation de la fonction pour formater les données du produit
    qr.make()

    qr_img = qr.make_image(fill_color="black", back_color="white")
    return qr_img

def format_product_data(product_data):
    # Extraction des données du dictionnaire product_data
    product_id = product_data.get("id")
    product_type = product_data.get("type")
    product_name = product_data.get("nom")
    arrival_date = product_data.get("date_arrive")
    expiry_date = product_data.get("date_limite")
    product_number = product_data.get("numero")
    shelf = product_data.get("etagere")

    # Formater les données extraites dans une chaîne de caractères
    formatted_data = f"ID: {product_id}\n" \
                     f"Type: {product_type}\n" \
                     f"Nom: {product_name}\n" \
                     f"Date d'arrivée: {arrival_date}\n" \
                     f"Date limite: {expiry_date}\n" \
                     f"Numéro: {product_number}\n" \
                     f"Étagère: {shelf}"
    
    return formatted_data

# Données de test pour un produit
product_data = {
    "id": "123",
    "type": "Produit",
    "nom": "Boites de Conserves",
    "date_arrive": "2024-05-10",
    "date_limite": "2025-05-23",
    "numero": "001",
    "etagere": "A2"
}

# Extraction des données du produit
product_id = product_data.get("id")
product_type = product_data.get("type")
product_name = product_data.get("nom")
arrival_date = product_data.get("date_arrive")
expiry_date = product_data.get("date_limite")
product_number = product_data.get("numero")
shelf = product_data.get("etagere")

# Génération du QR code à partir des données du produit
qr_code = generate_qr_code(product_data)
qr_code.save("product_qr_code.png")  # Sauvegarder le QR code dans un fichier image

# Affichage des données extraites du produit
print(f"ID: {product_id}")
print(f"Type: {product_type}")
print(f"Nom: {product_name}")
print(f"Date d'arrivée: {arrival_date}")
print(f"Date limite: {expiry_date}")
print(f"Numéro: {product_number}")
print(f"Étagère: {shelf}")