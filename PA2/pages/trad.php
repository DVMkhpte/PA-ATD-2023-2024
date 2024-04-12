<?php
$translated_content = shell_exec("python ../trad/trad.py");

if (empty($translated_content)) {
    echo "Aucune traduction disponible.";
} else {
    // Ajoutez l'en-tête pour spécifier le type de contenu JSON
    header("Content-Type: application/json; charset=UTF-8");

    // Convertissez la réponse en JSON avant de l'envoyer
    $translations = explode("\n", $translated_content);
    $response = json_encode(array("translations" => $translations));

    // Affichez la réponse JSON
    echo $response;
}
?>