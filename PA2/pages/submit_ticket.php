<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

$host = '54.36.209.115';
$port = '3306';
$dbname = 'tickets';
$username = 'root';
$password = 'exemplepwd';

try {
    $conn = new PDO("mysql:host=$host;port=$port;dbname=$dbname", $username, $password);

    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER["REQUEST_METHOD"] == "POST") {

        $name = $_POST['name'];
        $priority = $_POST['priority'];
        $description = $_POST['description'];

        $sql = "INSERT INTO tickets (client, priority, problem, status) VALUES (:client, :priority, :problem, 'A traiter')";

        $stmt = $conn->prepare($sql);

        $stmt->bindParam(':client', $name);
        $stmt->bindParam(':priority', $priority);
        $stmt->bindParam(':problem', $description);

        if ($stmt->execute()) {
            header("Location: ticketForm.php?message=Ticket cree avec succes.");
            exit;
        } else {
            header("Location: ticketForm.php?message=Erreur lors de la creation du ticket.");
            exit;
        }
        $conn = null;
    }
} catch(PDOException $e) {
    header("Location: ticketForm.php?message=Erreur de connexion a la base de donnees: " . $e->getMessage());
    exit;
}

?>
