<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Au Temps Donné - Accueil</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
<style>
    section{
        font-family: "Euclid Circular A", "Poppins";
    }
</style>

</head>
<body>


<?php include('../includes/header/headerNoConnexion/headerAccueil.php') ?>

<section>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h1 class="card-title">Faites un don.</h1>
      </div>
      <div class="card-body">
        <p class="card-text">Aidez Au Temps Donné à se développer pour venir en aide aux autres.</p>
        <img src="../img/cash.png" alt="halouf" class="logo" width="200" height="200">
        <form>
          <div class="form-group">
            <a href="login.php" class="btn btn-link">Connectez-vous</a> ou <a href="createAccount.php" class="btn btn-link">Inscrivez-vous</a> en tant que bénévole.
          </div>
          <div class="form-group">
            <strong>Information</strong><br/>
            Type de don :
            <div class="form-check">
              <input type="radio" value="monthly" id="monthly" name="gift-type" class="form-check-input"/>
              <label for="monthly" class="form-check-label">Mensuel</label>
            </div>
            <div class="form-check">
              <input type="radio" value="one-time" id="one-time" name="gift-type" class="form-check-input"/>
              <label for="one-time" class="form-check-label">En une fois</label>
            </div>
          </div>
          <div class="form-group">
            Montant du don mensuel <span class="minimum">(10€ Min.)</span>
            <div class="amount-options">
              <div class="form-check">
                <input type="radio" name="amount" value="50€" id="amount-50" class="form-check-input"/>
                <label for="amount-50" class="form-check-label">50€</label>
              </div>
              <div class="form-check">
                <input type="radio" name="amount" value="35€" id="amount-35" class="form-check-input"/>
                <label for="amount-35" class="form-check-label">35€</label>
              </div>
              <div class="form-check">
                <input type="radio" name="amount" value="25€" id="amount-25" class="form-check-input"/>
                <label for="amount-25" class="form-check-label">25€</label>
              </div>
              <div class="form-check">
                <input type="radio" name="amount" value="15€" id="amount-15" class="form-check-input"/>
                <label for="amount-15" class="form-check-label">15€</label>
              </div>
            </div>
            <div class="form-group">
              <label for="amount-undefined" class="undefined-amount">
                <input type="number" min="0" step="0.01" name="amount-undefined" placeholder="0.00€" class="form-control"/>
              </label>
            </div>
            <button type="button" class="btn btn-primary">Faites un don</button>
          </div>
          <div class="form-group">
            <p><a href="about_donation.php">Pourquoi faire un don ?</a></p>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>




<?php include('../includes/footer/footerNoConnexion/footerAccueil.php'); ?>



    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>