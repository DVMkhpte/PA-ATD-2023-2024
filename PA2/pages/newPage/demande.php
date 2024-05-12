<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Bénéficiaire</title>
    <link rel="stylesheet" href="../../css/add.css">
    <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&display=swap"
            rel="stylesheet"
    />
    <link
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
            rel="stylesheet"
    />
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
</head>
<body>
<div class="container">
    <div id="leftPart">
        <h1 class="title">NOUVEAU</h1>
        <a href="../back_end.php" class="btn-link connexion">Retour</a>
    </div>
    <div id="add">
        <h1 class="title">Ajouter une activitée</h1>
        <p class="paragraphe">
            Veuillez remplir tous les champs
        </p>
        <form class="formulaire" id="createForm">
            <div class="group-form">
                <input type="text" id="nom" placeholder="Nom">
            </div>
            <div class="group-form">
                <input type="text" id="type" placeholder="Type">
            </div>
            <div class="group-form">
                <input type="text" id="description" placeholder="Description">
            </div>
            <div class="group-form">
                <input type="date" id="date_debut" placeholder="Date de debut">
                <input type="date" id="date_fin" placeholder="Date de fin">
            </div>
            <div class="group-form">
                <input type="number" id="nb_place" placeholder="Nombres de places">
                <select class="boutton" id="user" name="select">

                </select>
            </div>
            <div class="group-form">
                <input type="submit" class="add" value="Ajouter">
            </div>
        </form>
    </div>
</div>

</body>
<script src="../../javaScript/function_api.js"></script>
<script>var data = [{
        "id": 1,
        "name": "enzo",
        "code_postal": 91330,
        "ville": "yerres",
        "adresse": "affichage",
        "num_phone": "1234567891",
        "email": "test@test.fr",
        "role": "benevole",
        "email_verified": "False",
    },
        {
            "id": 2,
            "name": "titouan",
            "code_postal": 91330,
            "ville": "yerres",
            "adresse": "affichage",
            "num_phone": "1234567891",
            "email": "test@test.fr",
            "role": "benevole",
            "email_verified": "False",
        }
    ];

    var addOption = document.getElementById("user")
    var allUseursName = "<option selected disabled hidden id=\"choix\">Superviser par</option>"
    var userName = ""

    for (i = 0; i < data.length; i++) {
        usersName = "<option value=\"" + data[i].id + "\">" + data[i].name + "</option>";
        allUseursName = allUseursName.concat(usersName);
    }
    addOption.innerHTML = allUseursName


    document.getElementById('createForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        const nom = document.getElementById('nom').value;
        const description = document.getElementById('description').value;
        const date_debut = document.getElementById('date_debut').value;
        const date_fin = document.getElementById('date_fin').value;
        const nb_place = document.getElementById('nb_place').value;
        const idUser = document.getElementById('user').value;


        const formData = {
            nom: nom,
            description: description,
            date_debut: date_debut,
            date_fin: date_fin,
            nb_place: nb_place,
            supervise_par: idUser
        };

        console.log(formData)

        /*
        try {
            const response = await requestApi(formData, "POST", "/formations/add");
            if (response.status === 200) {
                showAlert("Création de la formation réussie !");
            } else {
                showAlert("Erreur lors de la création de l'utilisateur : " + response.status);
            }
        } catch (error) {
            showAlert('Erreur lors de la requête à l\'API : ' + error.message);
        }
        */
    });
</script>
</html>