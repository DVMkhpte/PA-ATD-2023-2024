function traduirePage() {
  console.log('Fonction traduirePage() appelée avec succès!');

  const $ = jQuery; // Assurez-vous que jQuery est bien chargé
  const ajax = $.ajax;

  ajax({
    dataType: 'json', // Indiquez que vous attendez une réponse JSON
    error: function (xhr, status, error) {
      console.error('Erreur lors de la traduction:', error);
    },
    success: function (response) {
      console.log('Texte traduit:', response.translations);

      // Insérez les traductions individuelles dans les bons éléments HTML
      $('[data-translate]').each(function (index) {
        const originalText = $(this).text();
        const translatedText = response.translations[index];
        $(this).html(translatedText);
      });
    },
    url: 'trad.php',
    type: 'GET'
  });
}