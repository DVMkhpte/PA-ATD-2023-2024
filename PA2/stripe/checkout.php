<?php

require __DIR__ . "/vendor/autoload.php";

//$stripe_secret_key = "sk_test_51N8SUKJrkwZGz1TY2MdyFcdP3jzsOIgcDbArd68v24vRKeN93L7yxb1ueY0uRjIHHuf2ELr08DBi9Z7X6XzFeqUO00mpLmqN75";

\Stripe\Stripe::setApiKey($stripe_secret_key);

var_dump($_POST); // Affiche toutes les données envoyées par le formulaire

if(isset($_POST['amount'])) {
  // Récupérer le montant depuis le formulaire
  $amount = $_POST['amount'];
  echo "Le montant est de : " . $amount . " €";
  var_dump($amount);

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

  // Rediriger l'utilisateur vers la page de paiement Stripe
  header('Location: ' . $checkout_session->url);
  exit;
} else {
  // Si le montant n'a pas été spécifié, afficher un message d'erreur
  echo "Le montant n'a pas été spécifié.";
}
?>
