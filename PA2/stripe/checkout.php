

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Votre titre de page</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
</head>
<body>
<?php include('../includes/header/headerNoConnexion/headerAccueil.php') ?>

<?php

require __DIR__ . "/vendor/autoload.php";

$stripe_secret_key = "sk_test_51N8SUKJrkwZGz1TY2MdyFcdP3jzsOIgcDbArd68v24vRKeN93L7yxb1ueY0uRjIHHuf2ELr08DBi9Z7X6XzFeqUO00mpLmqN75";

\Stripe\Stripe::setApiKey($stripe_secret_key);


if(isset($_POST['amount'])) {

    $amount = $_POST['amount'];

    if ($amount <= 0) {
        echo '<div class="alert alert-danger" role="alert">';
        echo "Le montant du don ne peut pas être nul.";
        echo '</div>';
        echo '<a href="../pages/donation.php" class="btn btn-primary">Retour à la page de don</a>';
        exit;
    }

    if(strlen($amount) >= 7){
        echo '<div class="alert alert-danger" role="alert">';
        echo "Le montant du don est trop élevé ! Faites plusieurs dons moins élevés pour notre association :).";
        echo '</div>';
        echo '<a href="../pages/donation.php" class="btn btn-primary">Retour à la page de don</a>';
        exit;
    }



    $amountInCents = $amount * 100;

    $checkout_session = \Stripe\Checkout\Session::create([
        "mode" => "payment",
        "success_url" => "http://localhost/PA2/stripe/success.php",
        "cancel_url" => "http://localhost/PA2/pages/donation.php",
        "line_items" => [
            [
                "quantity" => 1,
                "price_data" => [
                    "currency" => "eur",
                    "unit_amount" => $amountInCents,
                    "product_data" => [
                        "name" => "Don - Au Temps Donné"
                    ]
                ]
            ]
        ]
    ]);


    header('Location: ' . $checkout_session->url);
    exit;
} else {

    echo "Le montant n'a pas été spécifié.";
}
?>

<footer>
<?php include('../includes/footer/footerNoConnexion/footerAccueil.php'); ?>
</footer>
</body>
</html>
