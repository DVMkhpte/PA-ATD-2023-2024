<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Au Temps Donne - Accueil</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">

    <style>
        section {
            font-family: "Euclid Circular A", "Poppins";
        }
    </style>
</head>
<body>

<?php include('../includes/header/headerNoConnexion/headerAccueil.php') ?>

<section>

    <div id="translated-content"></div>

    <div class="container" id="donation">
        <div class="card">
            <div class="card-header">
                <h1 data-translate="faites-un-don" class="card-title translate">Faites un don.</h1>
            </div>
            <div class="card-body">
                <form action="../stripe/checkout.php" method="post" onsubmit="redirectToCheckout()">
                    <p data-translate="texte-don" class="card-text translate">Aidez Au Temps Donne a se développer pour venir en aide aux autres.</p>
                    <img src="../img/cash.png" alt="halouf" class="logo" width="200" height="200">

                    <div class="form-group">
                        <a href="login.php" class="btn btn-link translate">
                            <span data-translate="login">Connectez-vous</span>
                        </a>
                        <span data-translate="or"> ou </span>
                        <a href="createAccount.php" class="btn btn-link translate">
                            <span data-translate="sign-up">Inscrivez-vous</span>
                        </a>
                        <span data-translate="volunteer"> en tant que bénévole.</span>
                    </div>

                    <div class="form-group">
                        <label for="amount">
                            <input type="number" min="0" step="0.01" name="amount" placeholder="0.00€" class="form-control"/>
                        </label>
                    </div>
                    <button data-translate="faites-un-don" type="submit" class="btn btn-primary translate" style="background-color:#38A6A7">Faites un don</button>
                </form>
            </div>

            <div class="form-group">
                <a href="about_donation.php" class="translate">
                    <span data-translate="why">Pourquoi faire un don ?</span>
                </a>
            </div>
        </div>
    </div>

</section>

<?php include('../includes/footer/footerNoConnexion/footerAccueil.php'); ?>

<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

</body>
</html>
