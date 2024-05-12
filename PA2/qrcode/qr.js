


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
        var qr = new QRCode(document.getElementById("qrCodeContainer"), {
            text: formatProductData(productData),
            width: 200,
            height: 200,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.L
        });

        document.getElementById("downloadQR").addEventListener("click", function () {
            var qrCodeImage = document.querySelector("#qrCodeContainer img");
            var link = document.createElement('a');
            link.download = "product_qr_code.png";
            link.href = qrCodeImage.src;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });

    }


});

var productData = {
    id: "123",
    type: "Produit",
    nom: "NEVER GONNA GIVE YOU UP RICK ROLL EN 4K",
    date_arrive: "2024-05-10",
    date_limite: "2025-05-23",
    id_etagere: "A2"
}


generateQrCode(productData)
