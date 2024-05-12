<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Au Temps Donné - Création de Tickets</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/contact.css">
</head>
<body>

<?php include('../includes/header/headerNoConnexion/headerAccueil.php') ?>
<div id="translated-content"></div>
<div class="container mt-5">
    <h2 data-translate ="contact">Création de Tickets</h2>
    <form action="submit_ticket.php" method="post">

    <div class="form-group">
            <label for="name" data-translate ="name">Nom et Prenom :</label>
            <input type="text" class="form-control" id="name" name="name" placeholder="GLPI" required>
        </div>

        <select class="form-select custom-select" aria-label="Default select example" required name="priority">
            <option selected data-translate ="categorie" id="priority">Priorité du ticket</option>
            <option  data-translate ="faible">Faible</option>
            <option data-translate ="normale">Normale</option>
            <option data-translate ="elevee">Elevée</option>
            <option  data-translate ="urgente">Urgente</option>
        </select>

        <div class="form-group">
            <label for="description" data-translate ="demande">Description du probleme (Donnez le plus de details possible)</label>
            <textarea class="form-control" id="description" name="description" rows="10" data-translate ="placeholder" placeholder="Entrez votre message" required></textarea>
        </div>

        <button type="submit" data-translate ="envoyer" class="btn btn-primary">Envoyer</button>
    </form>
</div>

<?php include('../includes/footer/footerNoConnexion/footerAccueil.php'); ?>

<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
<script src="../javaScript/function_api.js"></script>

</body>


</html>

<?php

if(isset($_GET['message'])) {

    $message = $_GET['message'];

    echo '<script>';
    echo 'showAlert("' . $message . '");';
    echo '</script>';
}
?>