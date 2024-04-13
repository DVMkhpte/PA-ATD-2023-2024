function translatePage(targetLanguage) {
  const sourceElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, label, ul, ol, li, p, a, button, span, select, strong');

  const promises = [];

  sourceElements.forEach(element => {
    promises.push(translateElement(element, targetLanguage));
  });

  Promise.all(promises)
      .then(translations => {
        // Remplace le texte d'origine par le texte traduit pour chaque élément
        sourceElements.forEach((element, index) => {
          element.innerText = translations[index];
        });
      })
      .catch(error => console.error(error));
}

function translateElement(element, targetLanguage) {
  const apiKey = 'f0a8708d6f7441b6bab6ef7ae19e62ec';
  const apiUrl = `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=${targetLanguage}`;

  const data = [{ text: element.innerText }];

  return fetch(apiUrl, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': apiKey,
      'Ocp-Apim-Subscription-Region': 'francecentral'
    }
  })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la traduction: ' + response.status);
        }
        return response.json();
      })
      .then(result => result[0].translations[0].text);
}
