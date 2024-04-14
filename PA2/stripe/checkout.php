<?php

require __DIR__ . "/vendor/autoload.php";

$stripe_secret_key = "sk_test_51N8SUKJrkwZGz1TYXa2sKVWWJcVI3wEj2eLaFLfNOnBgpG7yZfcGhYN6RwJG0dpm3pq0ioAuyGBvkHKfwi0Hrg4s00waC0dOjO";

\Stripe\Stripe::setApiKey($stripe_secret_key);

if(isset($_POST['amount'])) {

    $amount = $_POST['amount'];

    if ($amount <= 0) {
        echo '<strong><div class="alert alert-danger" role="alert"></strong>';
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
        "success_url" => "http://localhost:63342/PA-ATD-2023-2024/PA2/stripe/success.php",
        "cancel_url" => "http://localhost:63342/PA-ATD-2023-2024/PA2/pages/donation.php",
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

    // Rediriger l'utilisateur vers la page de paiement Stripe
    header('Location: ' . $checkout_session->url);
    exit;
} else {
    // Si le montant n'a pas été spécifié, afficher un message d'erreur
    echo "Le montant n'a pas été spécifié.";
}
?>
