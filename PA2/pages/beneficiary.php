<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Bénéficiaire</title>
    <link rel="stylesheet" href="../CSS/beneficiaire.css">
</head>
<body>
<?php  include("../includes/header.php") ?>

<main>
    <div id="translated-content"></div>
    <div class="container_1">

        <div class="menu">
            <div class="nav_menu">
                <div class="div_img" id="Planning" onclick="affichageBeneficiaire('Planning')" ><img class="img_menu" src="../img/planning.png"></div>
                <div class="div_img" id="Activitée" onclick="affichageBeneficiaire('Activitée')"><img class="img_menu" src="../img/activitee.png"></div>
                <div class="div_img" id="Demande" onclick="affichageBeneficiaire('Demande')"><img class="img_menu" src="../img/demande.png"></div>
            </div>

            <div class="titre">
                <h1 id="titre">Demande</h1>
            </div>
        </div>


        <div id="container_2">

        </div>

    </div>

    <div class="profil_part">
        <div class="info_profil_general">
            <h1>Profil :</h1>
            <div class="info_profil_1">
                <div id="nom_profil" class="info_profil">Nom</div>
                <div id="prenom_profil" class="info_profil">Prenom</div>
            </div>
            <div class="info_profil_2">
                <div id="email_profil" class="info_profil">Email</div>
                <div id="mdp_profil" class="info_profil">Mot de passe</div>
            </div>
            <div class="info_profil_3">
                <div id="ville_profil" class="info_profil">Ville</div>
                <div id="adresse_profil" class="info_profil">adresse</div>
            </div>

        </div>

        <div class="nav_profil">
            <button class="modif" onclick="modifProfil()">Modifier</button>
            <button class="voir" onclick="affichageBeneficiaire('Mes demande')">Mes demande</button>
            <button class="voir" onclick="affichageBeneficiaire('Mes Activité')">Activité</button>
            <div class="aide_profil">
                <button class="aide" onclick="">Aides ?</button>
                <button class="benevole" onclick=""><a href="contact.php" class="a_button">Devenir bénévole</a></button>
            </div>
        </div>

        
    </div>

</main>

<?php // include("../includes/footer.php") ?>

<script src="../javaScript/beneficiare.js"></script>
<script src="../javaScript/beneficiare_function/activity.js"></script>
<script src="../javaScript/beneficiare_function/ask.js"></script>
<script> affichageBeneficiaire("Activitée") </script>

</body>
</html>