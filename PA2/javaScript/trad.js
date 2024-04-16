let originalDropdownContent = null;

async function translatePage(targetLanguage) {
    try {
        const sourceElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, a[href], ul, ol, li, p, input, [placeholder], textarea, textarea[placeholder], button, button.button, span, option[value], option[selected], strong, label[for="name"], label[for="email"], label[for="demande"]');

        const promises = [];

        sourceElements.forEach(element => {
            promises.push(translateElement(element, targetLanguage));
        });

        // Sauvegarde le contenu original du dropdown uniquement s'il existe
        const dropdown = document.getElementById('flags');
        if (dropdown && originalDropdownContent === null) {
            originalDropdownContent = dropdown.innerHTML;
        }

        // Attend la traduction de tous les éléments
        const translations = await Promise.all(promises);

        // Remplace le texte d'origine par le texte traduit pour chaque élément
        sourceElements.forEach((element, index) => {
            element.innerText = translations[index];
        });

        // Enregistre la langue sélectionnée dans un cookie
        document.cookie = `targetLanguage=${targetLanguage}; path=/`;
    } catch (error) {
        console.error('Erreur lors de la traduction de la page :', error);
    }
}

// Vérifie si un cookie de langue existe au chargement de la page
window.addEventListener('DOMContentLoaded', () => {
    const targetLanguage = getCookie('targetLanguage');
    if (targetLanguage) {
        translatePage(targetLanguage);
    }

    // Restaure le contenu original du dropdown après la traduction
    if (originalDropdownContent !== null) {
        const dropdown = document.getElementById('flags');
        if (dropdown) {
            dropdown.innerHTML = originalDropdownContent;
        }
    }
});

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

function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName.trim() === name) {
            return cookieValue;
        }
    }
    return null;
}
