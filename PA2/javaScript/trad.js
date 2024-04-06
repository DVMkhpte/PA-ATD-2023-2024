const apiKey = "f1a9fd87-1d87-4b0a-a917-7f0f4e6fb920:fx";
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

    mode: 'no-cors',
  })
    .then((response) => response.json())
    .then((data) => {


      data.translations = undefined;
      document.getElementById("donation").textContent = data.translations[0].text;
    })
    .catch((error) => {
      console.error("Erreur de traduction:", error);
    });
}

document.addEventListener("DOMContentLoaded", function() {
  translateText(document.getElementById("donation").textContent, "fr", "en");
});
