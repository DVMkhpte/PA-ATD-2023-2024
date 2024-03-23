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
    
<nav class="navbar navbar-dark" style="background-color: #38A7A6;">
    <div class="container">
        <a href="index.php" class="navbar-brand">
            <img src="../img/logo.png" alt="Logo Au Temps Donné" class="logo" width="70" height="70"> </a>
        
            <button class="navbar-toggler custom-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
</button>

<div class="collapse navbar-collapse custom-navbar-collapse" id="navbarResponsive">
    <ul class="navbar-nav ml-auto">
        <li class="nav-item">
            <a class="nav-link" href="about.php">Qui sommes-nous</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="contact.php">Nous contacter</a>
        </li>
    </ul>
</div>
    </div>
</nav>

<div class="container mt-5">
    <h2>Contactez-nous</h2>
    <form onsubmit="return validateForm()">
        <div class="form-group">
            <label for="nom">Nom :</label>
            <input type="text" class="form-control" id="nom" placeholder="Mamoru" pattern="[A-Za-zÀ-ÿ\s]+" required>
        </div>

        <div class="form-group">
            <label for="prenom">Prenom :</label>
            <input type="text" class="form-control" id="prenom" placeholder="Takamura" pattern="[A-Za-zÀ-ÿ\s]+" required>
        </div>

        <div class="form-group">
            <label for="email">Adresse Email :</label>
            <input type="email" class="form-control" id="email" placeholder="takamura@ippo.fr" required>
        </div>

        <select class="form-select custom-select" aria-label="Default select example" required>
            <option selected>Choisissez une catégorie</option>
            <option value="1">Devenir Bénévole</option>
            <option value="2">Signaler un problème</option>
            <option value="3">Formation</option>
            <option value="4">Autre</option>
        </select>

        <div class="form-group">
            <label for="message">Message :</label>
            <textarea class="form-control" id="message" rows="4" placeholder="Entrez votre message" required></textarea>
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
