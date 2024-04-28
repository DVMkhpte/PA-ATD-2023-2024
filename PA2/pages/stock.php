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
<script src="../javaScript/function_api.js"></script>
<script src="../javaScript/stock.js"></script>
</html>