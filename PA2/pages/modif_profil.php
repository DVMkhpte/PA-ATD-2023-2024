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
            <form id="updateProfil" method="post">

            </form>   

    </div>

</main>
<script>
    //const idUser = localStorage.getItem("id")
    //var data = await requestApiNoBody("GET", "/users/"+idUser)
    var data = {
        "id": 1,
        "nom": "Chauche",
        "prenom": "Titouan",
        "code_postal": 91330,
        "ville": "yerres",
        "adresse": "affichage",
        "num_phone": "1234567891",
        "email": "test@test.fr",
        "role": "benevole",
        "email_verified": "False",
    }

    const formInfo = document.getElementById("updateProfil")
    formInfo.innerHTML =
        "<div class=\"profil\">"+
        "    <div class=\"profil1\">"+
        "       <h2 class=\"nom_prenom\" id=\"nom\" onclick=\"modif(1)\">Nom : "+ data.nom +"</h2>"+
        "           <input id=\"input-1\" id=\"input-nom\" type=\"text\" name=\"nom\" value=\""+ data.nom +"\" placeholder=\""+ data.nom +"\">"+
        "        <h2 class=\"nom_prenom\" id=\"prenom\" onclick=\"modif(2)\">Prenom : "+ data.prenom +"</h2>"+
        "            <input id=\"input-2\" id=\"input-prenom\" type=\"text\" name=\"prenom\" value=\""+ data.prenom +"\" placeholder=\""+ data.prenom +"\">"+
        "        <h3 class=\"h2_profil\" id=\"email\" onclick=\"modif(6)\">Email : "+ data.email +"</h3>"+
        "            <input id=\"input-6\" id=\"input-email\" type=\"email\" name=\"email\" value=\""+ data.email +"\" placeholder=\""+ data.email +"\">"+
        "    </div>"+
        "    <div class=\"profil2\">"+
        "        <h3 class=\"h2_profil\" id=\"adresse\" onclick=\"modif(3)\">Adresse : "+ data.adresse +", "+ data.ville +"</h3>"+
        "        <div id=\"input-3\">"+
        "           <input id=\"input-adresse\" type=\"text\" name=\"adresse\" value=\""+ data.email +"\" placeholder=\""+ data.email +"\">"+
        "           <input id=\"input-ville\" type=\"text\" name=\"ville\" value=\""+ data.ville +"\" placeholder=\""+ data.ville +"\">"+
        "        </div>"+
        "        <h3 class=\"h2_profil\" id=\"date\" onclick=\"modif(4)\">Code postal : "+ data.code_postal +"</h3>"+
        "            <input id=\"input-4\" id=\"input-codePostal\" type=\"text\" name=\"code_postal\" value=\""+ data.code_postal +"\" placeholder=\""+ data.code_postal +"\">"+
        "        <h3 class=\"h2_profil\" id=\"num_phone\" onclick=\"modif(5)\">Numeros de Telephone : "+ data.num_phone +"</h3>"+
        "            <input id=\"input-5\" id=\"input-numPhone\" type=\"text\" name=\"num_phone\" value=\""+ data.num_phone +"\" placeholder=\""+ data.num_phone +"\">"+
        "    </div>"+
        "</div>"+
        "<input id=\"valid\" type=\"submit\" value=\"Valider\" onclick='validModif()'>"

</script>
<script src="../javaScript/update_profil.js"></script>
</body>
</html>