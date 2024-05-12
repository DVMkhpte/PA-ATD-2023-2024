<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ajout commercant</title>
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
        <h1 class="title">Ajouter un commercant</h1>
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
                <input type="text" id="type" placeholder="Type du commercant">
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

    document.getElementById('createForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        const nom = document.getElementById('nom').value;
        const adresse = document.getElementById('adresse').value;
        const type = document.getElementById("type").value;

        const formData = {
            nom: nom,
            adresse: adresse,
            type : type
        };
        console.log(formData)
        try {
            const response = await requestApi(formData, "POST", "/commercants/add");
            showAlert("Création du commercant réussie !");
            window.location.href ="../back_end.php"
        } catch (error) {
            showAlert('Erreur lors de la requête à l\'API : ' + error.message);
        }

    });
</script>
</html>