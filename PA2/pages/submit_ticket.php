<?php
// Activer l'affichage des erreurs
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Chemin vers la base de données SQLite
$db_file = '../../ticketing/db/ticketing.db';

// Connexion à la base de données SQLite
$conn = new sqlite3($db_file);

// Vérification de la connexion
if (!$conn) {
    die("Erreur de connexion à la base de données: " . $conn->lastErrorMsg());
}

// Vérifier si le formulaire a été soumis
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupérer les valeurs du formulaire
    $name = $_POST['name'];
    $priority = $_POST['priority'];
    $description = $_POST['description'];

    // Requête SQL d'insertion
    $sql = "INSERT INTO tickets (client, priority, problem, status) VALUES (:client, :priority, :problem, 'A traiter')";

    // Préparer la requête
    $stmt = $conn->prepare($sql);

    // Liaison des paramètres
    $stmt->bindParam(':client', $name);
    $stmt->bindParam(':priority', $priority);
    $stmt->bindParam(':problem', $description);

    // Exécution de la requête
    if ($stmt->execute()) {
        echo "Ticket créé avec succès.";
    } else {
        echo "Erreur lors de la création du ticket: " . $conn->lastErrorMsg();
    }

    // Fermer la déclaration et la connexion
    $stmt->close();
    $conn->close();
}
?>
