<?php
$translated_content = shell_exec("python ../trad/trad.py");

if (empty($translated_content)) {
    $response = array("error" => "Aucune traduction disponible.");
    echo json_encode($response);
} else {
    echo $translated_content;
}

