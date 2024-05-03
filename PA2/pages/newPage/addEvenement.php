<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nouvel evenement</title>
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
                <input type="text" id="type" placeholder="Type">
            </div>
            <div class="group-form">
                <input type="text" id="adresse" placeholder="Adresse">
                <input type="text" id="ville" placeholder="Ville">
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
            </div>
        </form>
    </div>
</div>

</body>
<script src="../../javaScript/function_api.js"></script>
<script>
    document.getElementById('createForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        const nom = document.getElementById('nom').value;
        const adresse = document.getElementById('adresse').value;
        const description = document.getElementById('description').value;
        const date_debut = document.getElementById('date_debut').value;
        const date_fin = document.getElementById('date_fin').value;
        const ville = document.getElementById('ville').value;
        const type = document.getElementById('type').value;

        const formData = {
            nom: nom,
            description: description,
            date_debut: date_debut,
            date_fin: date_fin,
            adresse: adresse,
            ville: ville,
            type : type
        };
        console.log(formData)
        try {
            const response = await requestApi(formData, "POST", "/evenements/add");
            showAlert("Création de l'evenement réussie !");
            window.location.href ="../back_end.php"
        } catch (error) {
            showAlert('Erreur lors de la requête à l\'API : ' + error.message);
        }

    });

    selectVolonteer()
</script>
</html>