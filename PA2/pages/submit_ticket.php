<?php
// Vérifie si le formulaire a été soumis
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupérer les données du formulaire
    $client = $_POST['name'];
    $priority = $_POST['priority'];
    $problem= $_POST['description'];

    // Connexion à la base de données SQLite3
    $db = new SQLite3('ticketing.db');

    // Vérifier la connexion
    if (!$db) {
        die("Erreur de connexion à la base de données.");
    }

    // Préparer la requête SQL pour insérer le ticket
    $stmt = $db->prepare("INSERT INTO tickets (client, problem, priority, status) VALUES (?, ?, ?, ?)");
    $stmt->bindValue(1, $client, SQLITE3_TEXT);
    $stmt->bindValue(2, $problem, SQLITE3_TEXT);
    $stmt->bindValue(3, $priority, SQLITE3_TEXT);
    $stmt->bindValue(4, "Non défini", SQLITE3_TEXT);

    // Exécuter la requête
    $result = $stmt->execute();

    if ($result) {
        echo "Ticket soumis avec succès !";
    } else {
        echo "Erreur lors de la soumission du ticket.";
    }

    // Fermer la connexion à la base de données
    $db->close();
}
?>
