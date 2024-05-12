<?php
$pdo = new PDO('sqlite:ticketing.db');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$sqlCreateTable = "
    CREATE TABLE IF NOT EXISTS tickets (
        id INTEGER PRIMARY KEY,
        client TEXT NOT NULL,
        problem TEXT NOT NULL,
        priority TEXT NOT NULL,
        status TEXT NOT NULL
    )
";
$pdo->exec($sqlCreateTable);
?>
