<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Bénévole</title>
    <link rel="stylesheet" href="../css/benevole.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>

    <script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js" defer></script>
    <script>
        window.OneSignalDeferred = window.OneSignalDeferred || [];
        OneSignalDeferred.push(function(OneSignal) {
            OneSignal.init({
                appId: "1dfaa878-05eb-4597-acb4-ae4366122434",
            });
        });
    </script>
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
</head>
<body>
<?php  include("../includes/header.php") ?>

<main>

    <div class="container_1">
        <div class="menu">
            <div class="nav_menu">
                <div class="div_img" id="Planning" onclick="affichageBenevole('Planning')" ><img class="img_menu" src="../img/planning.png"></div>
                <div class="div_img" id="Formation" onclick="affichageBenevole('Formation')"><img class="img_menu" src="../img/formation.png"></div>
                <div class="div_img" id="Demande en attente" onclick="affichageBenevole('Demande en attente')"><img class="img_menu" src="../img/demande.png"></div>
                <div class="div_img" id="Evenement" onclick="affichageBenevole('Evenement')"><img class="img_menu" src="../img/evenement.png"></div>
            </div>

            <div class="titre">
                <h1 id="titre">Formation :</h1>
            </div>
        </div>


        <div id="container_2">

        </div>

    </div>

    <div class="profil_part">
        <div id="info_profil_general">
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
            <div class="profil_option">
                <button class="modif" onclick="updateProfil()">Modifier</button>
                <button class="deco" onclick="deconexion()">Deconnexion</button>
                <button class="extract" onclick="extractionPdf()">Extraction profil</button>
                <button class="aide" onclick="aide()">Aide</button>
            </div>
            <button class="voir" onclick="affichageBenevole('Mes evenement')">Mes evenement</button>
            <button class="voir" onclick="affichageBenevole('Mes missions')">Mes missions</button>
            <button class="voir" onclick="affichageBenevole('Mes Formations')">Mes Formations</button>
        </div>


    </div>

</main>

<?php // include("../includes/footer.php") ?>

<script src="../javaScript/function_api.js"></script>
<script src="../javaScript/benevole.js"></script>
<script src="../javaScript/volonteer_function/demande.js"></script>
<script src="../javaScript/volonteer_function/formation.js"></script>
<script src="../javaScript/volonteer_function/myMission.js"></script>
<script src="../javaScript/volonteer_function/evenement.js"></script>
<script src="../javaScript/volonteer_function/myEvent.js"></script>
<script src="../javaScript/volonteer_function/myFormation.js"></script>
<script>
    document.addEventListener('DOMContentLoaded', function() {
        verifconnection();
        var roleUser = localStorage.getItem('role')
        if(roleUser !== "benevole"){
            window.location.href ='index.php'
        }
    });

    console.log(localStorage.getItem("token"))
    async function loadProfil() {
        var data = await requestApiNoBody("GET", "/user")

        const profil = document.getElementById('info_profil_general');
        profil.innerHTML =
            "<h1>Profil :</h1>" +
            "<div class=\"info_profil_1\">" +
            "    <div id=\"nom_profil\" class=\"info_profil\">" + data.name + "</div>" +
            "   <div id=\"num_profil\" class=\"info_profil\">" + data.num_telephone + "</div>" +
            "</div>" +
            "<div class=\"info_profil_2\">" +
            "   <div id=\"email_profil\" class=\"info_profil\">" + data.email + "</div>" +
            "</div>" +
            "<div class=\"info_profil_3\">" +
            "    <div id=\"ville_profil\" class=\"info_profil\">" + data.adresse + ", " + data.code_postal + " " + data.ville + "</div>" +
            "</div>"
    }
    loadProfil()

    affichageBenevole('Mes missions')


</script>
</body>
</html>