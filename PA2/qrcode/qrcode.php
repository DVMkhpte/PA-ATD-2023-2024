<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Générateur de QR Code</title>
</head>
<body>
<h1>Générateur de QR Code</h1>
<!-- Bouton pour générer le QR code -->
<button id="generateQR">Générer QR Code</button>
<!-- Conteneur pour afficher le QR code -->
<div id="qrCodeContainer"></div>
<!-- Lien pour télécharger le QR code -->
<a href="#" id="downloadQR" download="product_qr_code.png">Télécharger QR Code</a>

<script src="QRCode.js"></script>
<script src="qrcode.min.js"></script>
<script src="qr.js"></script>
</body>
</html>
