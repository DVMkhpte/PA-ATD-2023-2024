


document.addEventListener("DOMContentLoaded", function() {
    function formatProductData(productData) {
        var formattedData = "ID: " + productData.id + "\n" +
            "Type: " + productData.type + "\n" +
            "Nom: " + productData.nom + "\n" +
            "Date d'arrivee: " + productData.date_arrivee + "\n" +
            "Date limite: " + productData.date_limite + "\n" +
            "Numero etagere: " + productData.id_etagere;
        return formattedData;
    }

    async function generateQrCode(productData) {
        // Fonction pour générer le QR code
        var qr = new QRCode(document.getElementById("qrCodeContainer"), {
            text: formatProductData(productData),
            width: 200,
            height: 200,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.L // Niveau de correction d'erreur L
        });

        // Téléchargement du QR code lorsque le bouton est cliqué
        document.getElementById("downloadQR").addEventListener("click", function () {
            // Récupération de l'image du QR code
            var qrCodeImage = document.querySelector("#qrCodeContainer img");
            // Création d'un élément de lien pour télécharger l'image
            var link = document.createElement('a');
            link.download = "product_qr_code.png";
            link.href = qrCodeImage.src;
            // Simulation d'un clic sur le lien pour déclencher le téléchargement
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });

    }

    var productData = {
        id: "123",
        type: "Produit",
        nom: "NEVER GONNA GIVE YOU UP RICK ROLL EN 4K",
        date_arrive: "2024-05-10",
        date_limite: "2025-05-23",
        id_etagere: "A2"
    }


});
