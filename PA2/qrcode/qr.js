document.addEventListener("DOMContentLoaded", function() {
    // Fonction pour générer le QR code
    function generateQRCode(productData) {
        var qr = new QRCode(document.getElementById("qrCodeContainer"), {
            text: formatProductData(productData),
            width: 200,
            height: 200,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.L // Niveau de correction d'erreur L
        });
    }

    // Fonction pour formater les données du produit
    function formatProductData(productData) {
        var formattedData = "ID: " + productData.id + "\n" +
            "Type: " + productData.type + "\n" +
            "Nom: " + productData.nom + "\n" +
            "Date d'arrivee: " + productData.date_arrive + "\n" +
            "Date limite: " + productData.date_limite + "\n" +
            "Numero: " + productData.numero + "\n" +
            "Etagere: " + productData.etagere;
        return formattedData;
    }

    // Données de test pour un produit
    var productData = {
        id: "123",
        type: "Produit",
        nom: "NEVER GONNA GIVE YOU UP RICK ROLL EN 4K",
        date_arrive: "2024-05-10",
        date_limite: "2025-05-23",
        numero: "001",
        etagere: "A2"
    };

    // Générer le QR code lorsqu'on clique sur le bouton
    document.getElementById("generateQR").addEventListener("click", function() {
        generateQRCode(productData);
    });
});
