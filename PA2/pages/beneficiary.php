<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Bénéficiaire</title>
    <link rel="stylesheet" href="../css/beneficiaire.css">
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

</head>

<body>
<?php  include("../includes/header.php") ?>

<main>
    <div id="root"></div>
    <div id="translated-content"></div>
    <div class="container_1">

        <div class="menu">
            <div class="nav_menu">
                <div class="div_img" id="Planning" onclick="affichageBeneficiaire('Planning')">
                 

                    <img class="img_menu" src="../img/planning.png" alt="planning">
                </div>
                <div id="planningContainer"></div>
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
            <button class="voir" onclick="affichageBeneficiaire('Mes demande')">Mes demande</button>
            <button class="voir" onclick="affichageBeneficiaire('Mes Activité')">Mes activité</button>
            <div class="aide_profil">
                <button class="benevole" onclick=""><a href="contact.php" class="a_button">Devenir bénévole</a></button>
            </div>
        </div>


    </div>

</main>

<?php // include("../includes/footer.php") ?>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>



<script src="../javaScript/function_api.js"></script>
<script src="../javaScript/beneficiare.js"></script>
<script src="../javaScript/beneficiare_function/activity.js"></script>
<script src="../javaScript/beneficiare_function/ask.js"></script>
<script>

    document.addEventListener('DOMContentLoaded', function() {
        verifconnection();
        var roleUser = localStorage.getItem('role')
        if(roleUser !== "beneficiaire"){
            window.location.href ='index.php'
        }
    });

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
    affichageBeneficiaire('Mes demande')


</script>

