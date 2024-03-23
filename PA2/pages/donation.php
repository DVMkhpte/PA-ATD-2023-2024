<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Au Temps Donné - Accueil</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/style_don.css">

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


<section>
  <div class="header">
    <h1>Faites un don.</h1>
      <p>Aidez Au Temps Donné à se développer pour venir en aide aux autres.</p>
      <img src="../img/cash.png" alt="halouf" class="logo" width="200" height="200">
  </div>
  
  <form>
    
      <a href="">Connectez-vous</a> ou <a href="">Inscrivez-vous</a> en tant que bénévole.<br/></div>
    <b>Information</b><br/>
    Type de don :<br/>
    <input type="radio" value="monthly" name="gift-type"/> <label for="gift-type">Mensuel</label> 
    <input type="radio" value="one-time" name="gift-type"/> <label for="gift-type">En une fois</label><br/>

    Montant du don mensuel <span class="minimum">(10€ Min.)</span>
    <div class="amount-options">
      <label for="€50" class="amount"><input type="radio" name="amount" value="€50"/>€50</label>
      <label for="€35"  class="amount"><input type="radio" name="amount" value="€25"/>€35</label>
  <label for="€25" class="amount"><input type="radio" name="amount" value="€25"/>€25</label>
      <label for="€15"  class="amount"><input type="radio" name="amount" value="€10"/>€10</label>
    </div>
    <label for="amount-undefined" class="undefined-amount"><input type="number" min="0" step="0.01" name="amount-undefined" placeholder="0.00€"/></label>
    <button type="button" class="btn btn-primary">Faites un don</button>
    
    <p><a href="about_donation.php">Pourquoi faire un don ?</a></p>
</form>
</section>


<?php include('../includes/footer/footerNoConnexion/footerAccueil.php'); ?>


    
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>