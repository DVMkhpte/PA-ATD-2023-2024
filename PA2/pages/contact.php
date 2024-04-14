<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Au Temps Donné - Accueil</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/contact.css">
</head>
<body>

<?php include('../includes/header/headerNoConnexion/headerAccueil.php') ?>

<div class="container mt-5">
    <h2>Contactez-nous</h2>
    <form onsubmit="return validateForm()">
        <div class="form-group">
            <label for="name">Nom et Prenom :</label>
            <input type="text" class="form-control" id="name">
        </div>

        <div class="form-group">
            <label for="email">Adresse Email :</label>
            <input type="email" class="form-control" id="email">
        </div>

        <div class="form-group">
            <label for="email">Adresse Email :</label>
            <input type="email" class="form-control" id="email" placeholder="takamura@ippo.fr" required>
        </div>

        <select class="form-select custom-select" aria-label="Default select example" required>
            <option selected>Choisissez une catégorie</option>
            <option value="aide_service_administratif">Besoin d'aide Administratif</option>
            <option value="demande_navette">Demande de Transport</option>
            <option value="demande_visite">Demande de Visite</option>
            <option value="autre">Autre</option>
        </select>

        <div class="form-group">
            <label for="demande">Message (Donner le plus de detail possible, Date, Adresse) :</label>
            <textarea class="form-control" id="demande" rows="10" placeholder="Entrez votre message" required></textarea>
        </div>

        <button type="submit" class="btn btn-primary">Envoyer</button>
    </form>
</div>

<?php include('../includes/footer/footerNoConnexion/footerAccueil.php'); ?>

<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    
<script>
    function validateForm() {

        var nom = document.getElementById("nom").value;
        if (!/^[A-Za-zÀ-ÿ\s]+$/.test(nom)) {
            alert("Veuillez saisir un nom valide (sans chiffres).");
            return false;
        }


        var email = document.getElementById("email").value;
        if (!/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,4}$/.test(email)) {
            alert("Veuillez saisir une adresse email valide (au format takamura@example.fr).");
            return false;
        }


        
        return true;
    }
</script>

</body>
</html>
