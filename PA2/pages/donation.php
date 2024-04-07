<!DOCTYPE html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Au Temps Donne - Accueil</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">

    <style>
        section{
            font-family: "Euclid Circular A", "Poppins";
        }

        .container{
            padding-top:20px ;
        }
    </style>

</head>
<body>


<?php include('../includes/header/headerNoConnexion/headerAccueil.php') ?>

<script>
    function traduirePage() {
        console.log("Fonction traduirePage() appelée avec succès!");
        $.ajax({
            url: 'trad.php',
            type: 'GET',
            dataType: 'json',
            success: function(response) {
                console.log('Texte à traduire:', response);
                $('#contenu-traduit').html(response.translated_content);
            },
            error: function(xhr, status, error) {
                console.error('Erreur lors de la traduction:', error);
            }
        });
    }

</script>

<button onclick="traduirePage()" class="btn btn-primary">Traduire la page</button>

<section>
    <div id="contenu-traduit"></div>
    <div class="container" id="donation">
        <div class="card">
            <div class="card-header">
                <h1 class="card-title">Faites un don.</h1>
            </div>
            <div class="card-body">
                <form action="../stripe/checkout.php" method="POST">
                    <p class="card-text">Aidez Au Temps Donne a se developper pour venir en aide aux autres.</p>
                    <img src="../img/cash.png" alt="halouf" class="logo" width="200" height="200">
                    <form>
                        <div class="form-group">
                            <a href="login.php" class="btn btn-link">Connectez-vous</a> ou <a href="createAccount.php" class="btn btn-link">Inscrivez-vous</a> en tant que benevole.
                        </div>
            </div>

            <form action="../stripe/checkout.php" method="post" onsubmit="redirectToCheckout()">
                <div class="form-group">
                    <label for="amount">
                        <input type="number" min="0" step="0.01" name="amount" placeholder="0.00€" class="form-control"/>
                    </label>
                </div>
                <button type="submit" class="btn btn-primary" style="background-color:#38A6A7">Faites un don</button>
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



    const validateForm = () => {
        const errorMessageElement = document.querySelector('.error-message');
        errorMessageElement.textContent = ""; // Réinitialiser le message d'erreur

        const amountInput = document.querySelector('input[name="amount"]');



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
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>