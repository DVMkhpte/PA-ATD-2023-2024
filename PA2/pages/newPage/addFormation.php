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
</head>
<body>
<div class="container">
    <div id="leftPart">
        <h1 class="title">NOUVEAU</h1>
        <a href="../back_end.php" class="btn-link connexion">Retour</a>
    </div>
    <div id="add">
        <h1 class="title">Ajouter une formation</h1>
        <p class="paragraphe">
            Veuillez remplir tous les champs
        </p>
        <form class="formulaire" id="createForm">
            <div class="group-form">
                <input type="text" id="nom" placeholder="Nom">
            </div>
            <div class="group-form">
                <input type="text" id="adresse" placeholder="Adresse">
            </div>
            <div class="group-form">
                <textarea type="text" id="description" placeholder="Description"></textarea>
            </div>
            <div class="group-form">
                Date debut : <input type="datetime-local" id="date_debut" placeholder="Date de debut">
            </div>
            <div class="group-form">
                Date fin : <input type="datetime-local" id="date_fin" placeholder="Date de fin">
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
<script>

    async function selectVolonteer() {
        var data = await requestApiNoBody("GET", "/users/")
        var addOption = document.getElementById("user")
        var allUseursName =
            "<option id='user' selected disabled hidden value='0' >Superviser par</option>"+
            "<option id='user' value='0' >à definir</option>"
        var userName = ""

        for (i = 0; i < data.length; i++) {
            if(data[i].role === "benevole") {
                userName = "<option id='user' value=\"" + data[i].id + "\">" + data[i].name + "</option>";
                allUseursName = allUseursName.concat(userName);
            }
        }
        addOption.innerHTML = allUseursName
    }


    document.getElementById('createForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        const nom = document.getElementById('nom').value;
        const adresse = document.getElementById('adresse').value;
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
            adresse: adresse,
            nb_place: nb_place,
            supervise_par: idUser
        };
        console.log(formData)
        try {
            const response = await requestApi(formData, "POST", "/formations/add");
            showAlert("Création de la formation réussie !");
            window.location.href ="../back_end.php"
        } catch (error) {
            showAlert('Erreur lors de la requête à l\'API : ' + error.message);
        }

    });

    selectVolonteer()
</script>
</html>