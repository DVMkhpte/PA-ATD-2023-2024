// Votre clé API DeepL
const apiKey = "42aec677-88c5-4a7d-a216-5daee86586cd:fx";

// Fonction pour traduire un texte
function translateText(text, sourceLang, targetLang) {
  fetch("https://api.deepl.com/v2/translate", {
    method: "POST",
    headers: {
      "Authorization": `DeepL-Auth-Key ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: text,
      source_lang: sourceLang,
      target_lang: targetLang,
    }),
    // Ajout de l'option `mode: 'no-cors'`
    mode: 'no-cors',
  })
    .then((response) => response.json())
    .then((data) => {
      // Utilisez la traduction reçue pour mettre à jour le contenu de la page
      // Par exemple:
      document.getElementById("faire-un-don").textContent = data.translations[0].text;
    })
    .catch((error) => {
      console.error("Erreur de traduction:", error);
    });
}

// Identifier les éléments à traduire
// ... (vous identifierez les éléments plus tard)

// Appeler la fonction de traduction pour les éléments identifiés
translateText(document.getElementById("faire-un-don").textContent, "fr", "en");
// ... (ajoutez d'autres appels pour traduire d'autres éléments)
