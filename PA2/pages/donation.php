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
      <form action="../stripe/checkout.php" method="POST">
        <p class="card-text">Aidez Au Temps Donné à se développer pour venir en aide aux autres.</p>
        <img src="../img/cash.png" alt="halouf" class="logo" width="200" height="200">
        <form>
          <div class="form-group">
            <a href="login.php" class="btn btn-link">Connectez-vous</a> ou <a href="createAccount.php" class="btn btn-link">Inscrivez-vous</a> en tant que bénévole.
          </div>


          <div class="form-group">
            <strong>Information</strong><br/>
            Type de don :

            <div class="form-check custom-checkbox">
              <input type="checkbox" value="one-time" id="one-time" class="form-check-input"/>
              <label for="one-time" class="form-check-label">En une fois</label>
            </div>

            <div class="form-check custom-checkbox">
              <input type="checkbox" value="weekly" id="weekly" class="form-check-input"/>
              <label for="weekly" class="form-check-label">Hebdomadaire</label>
            </div>


            <div class="form-check custom-checkbox">
              <input type="checkbox" value="monthly" id="monthly" class="form-check-input"/>
              <label for="monthly" class="form-check-label">Mensuel</label>
            </div>
            

            <div class="form-check custom-checkbox">
              <input type="checkbox" value="yearly" id="yearly" class="form-check-input"/>
              <label for="yearly" class="form-check-label">Annuel</label>
            </div>
            <script>
const checkboxElements = document.querySelectorAll('.custom-checkbox input[type="checkbox"]');

checkboxElements.forEach(checkbox => {
  checkbox.addEventListener('change', function() {
    const clickedCheckbox = this;
    checkboxElements.forEach(otherCheckbox => {
      if (clickedCheckbox !== otherCheckbox && clickedCheckbox.checked) {
        otherCheckbox.disabled = true;
        otherCheckbox.classList.add('disabled'); // Add class for styling (optional)
      } else {
        otherCheckbox.disabled = false;
        otherCheckbox.classList.remove('disabled'); // Remove class for styling (optional)
      }
    });
  });
});
</script>

          </div>

            <form action="../stripe/checkout.php" method="post" onsubmit="redirectToCheckout()">
              <div class="form-group">
                <label for="amount">
                  <input type="number" min="0" step="0.01" name="amount" placeholder="0.00€" class="form-control"/>
                </label>
              </div>
              <button type="submit" class="btn btn-primary">Faites un don</button>
            </form>

            <script>
            function redirectToCheckout() {
              window.location.href = "../stripe/checkout.php";
            }
            </script>


          
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

<script>
  

  // Fonction pour la validation du formulaire
  const validateForm = () => {
    const errorMessageElement = document.querySelector('.error-message');
    errorMessageElement.textContent = ""; // Réinitialiser le message d'erreur

    const amountInput = document.querySelector('input[name="amount"]');
    const isCheckboxChecked = document.querySelector('input[name="gift-type"]:checked');

    if (!isCheckboxChecked) {
      errorMessageElement.textContent = "Veuillez choisir une option de don.";
      errorMessageElement.style.display = "block";
      return false;
    }

    if (!amountInput.value || isNaN(amountInput.value) || amountInput.value <= 0) {
      errorMessageElement.textContent = "Veuillez entrer un montant de don valide.";
      errorMessageElement.style.display = "block";
      return false;
    }

    return true;
  };


  const redirectToCheckout = () => {
    const selectedAmount = document.querySelector('input[name="amount"]').value;
    const checkoutLink = document.querySelector('a[href="#"]');
    checkoutLink.href = `../stripe/checkout.php?amount=${selectedAmount}`;
  };


  document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    redirectToCheckout();
    
  });

  handleCheckboxChange();
  </script>



    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>