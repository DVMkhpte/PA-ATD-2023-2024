const translationFiles = {
    'donation.php': '../json/donation.json',
    'about.php': '../json/about.json',
    'about_donation.php': '../json/about_donation.json',
    'contact.php': '../json/contact.json',
    'createAccount.php': '../json/createAccount.json',
    'index.php': '../json/index.json',
    'login.php': '../json/login.json',
    'policy.php': '../json/policy.json',
    'legal_mention.php': '../json/legal_mention.json',
    'beneficiary.php': '../json/beneficiary.json',
    'become_benevole.php': '../json/become_benevole.json',
    '../javaScript/beneficiare_function/ask.js' : '../json/ask_js.json',
    '../includes/header/headerNoConnexion/headerAccueil.php': '../../../json/headerAccueil.json',
    '../includes/footer/footerNoConnexion/footerAccueil.php': '../json/footerAccueil.json'
};

let translations = {};

async function loadTranslations(language) {
    const page = getPageName();
    const translationFile = translationFiles[page];
    if (!translationFile) {
        console.error(`Aucun fichier de traduction n'est défini pour la page ${page}.`);
        return;
    }

    const response = await fetch(translationFile);
    translations = await response.json();
    updateTranslations(language);
}
function updateTranslations(language) {
    const elementsToTranslate = document.querySelectorAll('[data-translate]');
    elementsToTranslate.forEach(element => {
        const key = element.dataset.translate;
        if (translations[language] && translations[language][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                if (element.tagName === 'INPUT') {
                    element.setAttribute('placeholder', translations[language][key]);
                } else {
                    element.placeholder = translations[language][key];
                }
            } else {
                element.innerHTML = translations[language][key];
            }

        }
    });

    localStorage.setItem('language', language);
}




document.addEventListener('DOMContentLoaded', async function() {
    const selectedLanguage = localStorage.getItem('language') || 'fr';
    await loadTranslations(selectedLanguage);
});

function getPageName() {
    const path = window.location.pathname;
    return path.split('/').pop();
}
