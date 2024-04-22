<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Devenir bénévole</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/contact.css">
</head>
<body>

<style>
    .form-check-label{
        margin-right: 25px;
        margin-left: 25px;
    }

    .form-check-check-inline{
        padding-bottom: 10px;
    }

    .popup {
        position: fixed;
        top: 10%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #225B7C;
        padding: 20px;
        border: 2px solid white;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        z-index: 1000;
        color: whitesmoke;
        font-family: "Euclid Circular A", "Poppins";
    }



</style>

<div class="container mt-5">
    <h2 data-translate="become_volunteer_title">Devenir bénévole</h2>
    <form id="demandeForm">
        <div class="form-group">
            <label for="name" data-translate="name_label">Nom et Prenom :</label>
            <input type="text" class="form-control" id="name">
        </div>

        <div class="form-group">
            <label for="email" data-translate="email_label">Adresse Email :</label>
            <input type="email" class="form-control" id="email">
        </div>

        <div class="form-group">
            <label for="demande" data-translate="reason_label">Pourquoi voulez vous nous rejoindre ? (Parlez-vous des langues ? Des connaisances en particulier ?) :</label>
            <textarea class="form-control" id="demande" rows="10" required></textarea>
        </div>

        <div class="form-check-check-inline">
            <label class="form-check-label" for="flexCheckDefault" data-translate="license_label">Avez-vous le permis ?</label>
            <label class="form-check-label" for="inlineCheckbox1" data-translate="no_license_option">Non :</label>
            <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="Non">
            <label class="form-check-label" for="inlineCheckbox2" data-translate="license_a_option">Permis A (moto) :</label>
            <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="A">
            <label class="form-check-label" for="inlineCheckbox3" data-translate="license_b_option">Permis B (voiture) :</label>
            <input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="B">
            <label class="form-check-label" for="inlineCheckbox4" data-translate="license_c_option">Permis C (camions) :</label>
            <input class="form-check-input" type="checkbox" id="inlineCheckbox4" value="C">
        </div>

        <button type="submit" class="btn btn-primary" data-translate="submit_button">Envoyer</button>
    </form>
</div>


<?php include('../includes/footer/footerNoConnexion/footerAccueil.php'); ?>

<script src="../javaScript/trad.js"></script>
<script src="../javaScript/function_api.js"></script>
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

<script>

    document.getElementById('inlineCheckbox1').addEventListener('change', function(event) {
        var nonCheckbox = document.getElementById('inlineCheckbox1');
        var otherCheckboxes = document.querySelectorAll('input[type="checkbox"]:not(#inlineCheckbox1)');

        if (nonCheckbox.checked) {
            otherCheckboxes.forEach(function(checkbox) {
                checkbox.disabled = true;
            });
        } else {
            otherCheckboxes.forEach(function(checkbox) {
                checkbox.disabled = false;
            });
        }
    });


    const storedEmail = localStorage.getItem('email');
    const storedId = localStorage.getItem('id');


    if (storedEmail) {
        document.getElementById('email').value = storedEmail;
        localStorage.removeItem('email');
    }

    document.getElementById('demandeForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        var nom = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var demande = document.getElementById("demande").value;
        var permis = [];
        var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        checkboxes.forEach(function(checkbox) {
            permis.push(checkbox.value);
        });
        var type = "demande_benevole"
        var etat = "En attente"
        var permisString = permis.join(',');

        var formData = {
            type: type,
            demande: demande,
            permis: permisString,
            etat: etat,
        };

        try {
            const data = await requestApi(formData, "POST", "/demande/add");
            if (data) {
                showAlert("Votre demande a bien été pris en charge !");
            }else{
                showAlert("Erreur:" + data)
            }
        }catch (error) {
            console.error('Erreur lors de la requête à l\'API :', error.message);
        }
    })

</script>

</body>
</html>
