<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Bénévole</title>
    <link rel="stylesheet" href="../CSS/stock.css">
</head>
<body>
<header>
    <?php session_start() ?>
    <div class="left_partH">
        <img class="img_header" src="../img/logo.png">
        <a class="nav_link_acceuil" href="back_end.php">&lt;&lt;Retour</a>
    </div>
    <div class="mid_partH">
        <h1>Gestion des stock</h1>
    </div>
    <div class="right_partH">
        <div id="option">
            <button class="new_button" id="new_collect">Nouvelle Collecte</button>
            <button class="new_button" id="new_maraude">Nouvelle Maraude</button>
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

<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD6CUzOUwOwUUoHYp7s5ZFpow70ao6eC_0=places"></script>
    <script>
    // Initialisation du service de la matrice de distances
    var distanceMatrixService = new google.maps.DistanceMatrixService();

    // Définir les adresses de départ et d'arrivée
    var origin = '5 Rue Jules Ferry, 91330 Yerres';
    var destination = 'Parc Astérix, 60128 Plailly';

    // Paramètres de la requête
    var request = {
        origins: [origin],
        destinations: [destination],
        travelMode: 'DRIVING', // Mode de transport (DRIVING, WALKING, BICYCLING, TRANSIT)
        unitSystem: google.maps.UnitSystem.METRIC, // Unité de mesure (METRIC, IMPERIAL)
        avoidHighways: false, // Éviter les autoroutes
        avoidTolls: false // Éviter les péages
    };

    // Envoi de la requête au service de la matrice de distances
    distanceMatrixService.getDistanceMatrix(request, function(response, status) {
        if (status == 'OK') {
            // Récupérer la distance et la durée
            var distance = response.rows[0].elements[0].distance.text;
            var duration = response.rows[0].elements[0].duration.text;

            // Afficher les résultats
            console.log('Distance:', distance);
            console.log('Durée:', duration);
        } else {
            console.log('Erreur:', status);
        }
    });
</script>
<script src="../javaScript/function_api.js"></script>
<script src="../javaScript/stock.js"></script>
</html>