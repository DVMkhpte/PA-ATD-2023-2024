<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Entrepot</title>
    <link rel="stylesheet" href="../CSS/stock.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
</head>
<body>
<header>
    <?php session_start() ?>
    <div class="left_partH">
        <img class="img_header" src="../img/logo.png">
        <a class="nav_link_acceuil" href="back_end.php">&lt;&lt;Retour</a>
    </div>
    <div class="mid_partH">
        <h1>Gestion des entrepots</h1>
    </div>
    <div class="right_partH">
        <div id="option">
            <button class="new_button" id="new_collect" onclick="newCollecte()">Nouvelle Collecte</button>
            <button class="new_button" id="new_maraude" onclick="newMaraude()">Nouvelle Maraude</button>
        </div>
    </div>
</header>

<main>
    <div id="mainStock">
        <div class="entrepot_nav">
            <div class="allEntrepot">
                <div class="select_entrepot" onclick="affichageStock('Saint Quentin')">
                    <h3>Saint Quentin</h3>
                    <img src="../img/entrepot.png">
                </div>
                <div class="select_entrepot" onclick="affichageStock('Laon')">
                    <h3>Laon</h3>
                    <img src="../img/entrepot.png">
                </div>
            </div>
        </div>

        <div id="container">
            <h1>Velliez selectionner un entrepot</h1>
        </div>

    </div>
</main>
</body>

<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBRgUYpS2R7KL3eZeSGVQYj8Gs9_lVy0x0&libraries=places"></script>
<script>
    async function getDistance(origin, destination) {
        return new Promise((resolve, reject) => {
            // Initialisation du service de la matrice de distances
            var distanceMatrixService = new google.maps.DistanceMatrixService();

            // Paramètres de la requête
            var request = {
                origins: [origin],
                destinations: [destination],
                travelMode: 'DRIVING',
                unitSystem: google.maps.UnitSystem.METRIC,
                avoidHighways: false,
                avoidTolls: false
            };

            distanceMatrixService.getDistanceMatrix(request, function (response, status) {
                if (status == 'OK') {
                    // Récupérer la distance
                    var distance = response.rows[0].elements[0].distance.text;
                    resolve(distance); // Résoudre la promesse avec la distance
                } else {
                    reject('Erreur:' + status); // Rejeter la promesse avec le statut d'erreur
                }
            });
        });
    }
</script>
<script src="../javaScript/function_api.js"></script>
<script src="../javaScript/trajet.js"></script>
<script src="../javaScript/stock.js"></script>
</html>