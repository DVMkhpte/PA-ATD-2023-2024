CREATE TABLE IF NOT EXISTS tickets (
    id INTEGER PRIMARY KEY,
    client TEXT NOT NULL,
    problem TEXT NOT NULL,
    priority TEXT NOT NULL,
    status TEXT NOT NULL
);

INSERT INTO tickets (client, problem, priority, status) VALUES
    (1, 'Client A', 'Problème de connexion', 'Normal', 'A Traiter'),
    (2, 'Client B', 'Problème de paiement', 'Élevée', 'En Cours'),
    (3, 'Client C', 'Problème technique', 'Urgente', 'Terminé');
