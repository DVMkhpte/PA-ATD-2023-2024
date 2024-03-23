<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Au Temps Donné - Accueil</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/donation.css">
    

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
    <div class="text-display">
        <h1>Pourquoi faire un don ?</h1>
        <p>
            Bienvenue chez Au Temps Donné ! Chaque don compte, même les plus petits ! En soutenant notre cause, vous transformez des heures en espoir. Votre contribution finance des projets concrets pour améliorer des vies. Ensemble, créons un impact positif. Faites un don maintenant et partagez votre temps pour un monde meilleur. Merci pour votre générosité !
        </p>
        
        <button type="button" class="btn btn-primary" onclick="window.location.href='don.php'">Faites un don</button>

    </div>
    <div class="image-display">
        <img src="../img/don.jpg" alt="Description de l'image">
    </div>
    
</div>

<?php include('../includes/footer/footerNoConnexion/footerAccueil.php'); ?>
    
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>
