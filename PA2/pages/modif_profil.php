<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page administarteur</title>
    <link rel="stylesheet" href="../CSS/modif_profil.css">
</head>
<body>
<?php  include("../includes/header.php") ?>
<main>
    <div class="recap_profil">

            <h1 class="h1_profil">Modifier votre profil</h1>
            <form id="recherche" action="verif_modif_profil.php" method="post">
                <div class="profil">
                    <div class="profil1">        
                        <h1 class="nom_prenom" id="nom" onclick="modif(1)">Nom : nom</h1>
                            <input id="input-1" type="text" name="nom" placeholder="nom">
                        <h1 class="nom_prenom" id="prenom" onclick="modif(2)">Prenom : prenom</h1>
                            <input id="input-2" type="text" name="prenom" placeholder="prenom">

                    </div>
                    <div class="profil2">
                        <h2 class="h2_profil" id="adresse" onclick="modif(3)">Adresse : ville, 5 rue du pa.'</h2> 
                            <div id="input-3" style="display: none;">
                                <input type="text" name="ville" placeholder="ville'"> 
                                <input type="text" name="adresse" placeholder="5 rue du pa">
                            </div>
                        <h2 class="h2_profil" id="date" onclick="modif(5)">Code postal : 91330</h2>
                            <input class="input_profil" id="input-5" type="text" name="code_postal" placeholder="91330">
                        <h2 class="h2_profil" id="num_phone" onclick="modif(4)">Numeros de Telephone : 07 14 17 37 82</h2>
                            <input id="input-4" type="text" name="num_phone" placeholder="07 14 17 37 82">
                    </div>
                </div>
                <input id="valid" type="submit" value="Valider">
            </form>   

    </div>

</main>
<script src="../javaScript/profil.js"></script>
</body>
</html>