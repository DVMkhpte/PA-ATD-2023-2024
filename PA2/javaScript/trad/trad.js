let translations = {};

async function loadTranslations(language) {
    const response = await fetch('../../json/donation.json');
    translations = await response.json();
    updateTranslations(language);
}

function updateTranslations(language) {
    const elementsToTranslate = document.querySelectorAll('[data-translate]');
    elementsToTranslate.forEach(element => {
        const key = element.dataset.translate;
        if (translations[language] && translations[language][key]) {
            element.textContent = translations[language][key];
        }
    });

    localStorage.setItem('language', language);
}

document.addEventListener('DOMContentLoaded', async function() {
    const selectedLanguage = localStorage.getItem('language') || 'fr';
    await loadTranslations(selectedLanguage);
});

function redirectToCheckout() {
    window.location.href = "../../stripe/checkout.php";
}