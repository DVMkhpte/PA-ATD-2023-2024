#!/bin/bash

# Test de la connexion à la base de données
test_connection() {
    php artisan migrate:status >/dev/null 2>&1
}

# Boucle pour tester la connexion
while ! test_connection; do
    echo "La connexion à la base de données a échoué. Réessai dans 4 secondes..."
    sleep 4
done

# Génération de la clé de l'application Laravel
php artisan key:generate

# Démarrage du serveur Laravel
php artisan serve --host=0.0.0.0 --port=8000
