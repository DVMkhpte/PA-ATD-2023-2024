<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page administarteur</title>
    <link rel="stylesheet" href="../CSS/modif_profil.css">
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
</head>
<body>
<?php  include("../includes/header.php") ?>
<main>
    <div class="recap_profil">

            <h1 class="h1_profil">Modifier votre profil</h1>
            <div id="updateProfil">

            </div>

    </div>

</main>
<script src="../javaScript/function_api.js"></script>
<script>
    async function loadForm() {
        var data = await requestApiNoBody("GET", "/user")
        console.log(data)

        const formInfo = document.getElementById("updateProfil")
        formInfo.innerHTML =
            "<div class=\"profil\">" +
            "    <div class=\"profil1\">" +
            "       <h2 class=\"nom_prenom\" id=\"nom\" onclick=\"modif(1)\">Nom : " + data.name + "</h2>" +
            "           <input id=\"input-1\"  type=\"text\" name=\"nom\" value=\"" + data.name + "\" placeholder=\"" + data.name + "\">" +
            "        <h3 class=\"h2_profil\" id=\"email\" onclick=\"modif(2)\">Email : " + data.email + "</h3>" +
            "            <input id=\"input-2\"  type=\"email\" name=\"email\" value=\"" + data.email + "\" placeholder=\"" + data.email + "\">" +
            "    </div>" +
            "    <div class=\"profil2\">" +
            "        <h3 class=\"h2_profil\" id=\"adresse\" onclick=\"modif(3)\">Adresse : " + data.adresse + ", " + data.ville + "</h3>" +
            "        <div id=\"input-3\">" +
            "           <input id=\"input-adresse\" type=\"text\" name=\"adresse\" value=\"" + data.adresse + "\" placeholder=\"" + data.adresse + "\">" +
            "           <input id=\"input-ville\" type=\"text\" name=\"ville\" value=\"" + data.ville + "\" placeholder=\"" + data.ville + "\">" +
            "        </div>" +
            "        <h3 class=\"h2_profil\" id=\"date\" onclick=\"modif(4)\">Code postal : " + data.code_postal + "</h3>" +
            "            <input id=\"input-4\"  type=\"text\" name=\"code_postal\" value=\"" + data.code_postal + "\" placeholder=\"" + data.code_postal + "\">" +
            "        <h3 class=\"h2_profil\" id=\"num_phone\" onclick=\"modif(5)\">Numeros de Telephone : " + data.num_telephone + "</h3>" +
            "            <input id=\"input-5\" type=\"text\" name=\"num_phone\" value=\"" + data.num_telephone + "\" placeholder=\"" + data.num_telephone + "\">" +
            "    </div>" +
            "</div>" +
            "<button id=\"valid\" type=\"submit\" value=\"Valider\" onclick='validModif()'>Valider</button>"

        for(var i=1; i<6; i++){
            var modif_input = document.getElementById("input-"+i);
            modif_input.style.display="none";
        }
    }
    loadForm()
</script>
<script src="../javaScript/update_profil.js"></script>
</body>
</html>