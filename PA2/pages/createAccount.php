<!DOCTYPE html>
<html lang="fr">

<head>
    <title>Creer votre compte</title>
    <meta charset="UTF-8" >
    <meta name="viewport" content="width=device-width, initial-scale=1.0" >
    <link rel="stylesheet" type="text/css" href="../css/createAccount.css">
    <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&display=swap"
            rel="stylesheet"
    />
    <link
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
            rel="stylesheet"
    />
</head>


<body>
<div id="translated-content"></div>
<div class="container">
  <div id="connexion">
    <div class="accueil">
        <img src="../img/maison.png" alt="Image d'accueil">
        <a href="index.php" data-translate="home"><u>Retour à l'accueil</u></a>
    </div>
    <h1 class="title" data-translate="login">Connectez-vous</h1>
    <a href="login.php" class="btn-link connexion" data-translate="sign-in">Se connecter</a>
  </div>
  <div id="inscription">
    <h1 class="title" data-translate="create">Créer un compte</h1>
    <p class="paragraphe" data-translate="field">
      Veuillez remplir tous les champs
    </p>
    <form class="formulaire" id="createForm">
    <div class="group-form">
        <input type="text" data-translate="prenom" id="prenom" placeholder="Prenom" />
        <input type="text" data-translate="nom" id="nom" placeholder="Nom">
    </div>
    <div class="group-form">
        <input type="text" data-translate="zipcode" id="code_postal" placeholder="Code Postal">
        <input type="text" data-translate="city" id="ville" placeholder="Ville">
    </div>
    <div class="group-form">
        <input type="text" data-translate="adress2" id="adresse" placeholder="Adresse">
    </div>
    <div class="group-form">
        <input type="text" data-translate="phone" id="phone" placeholder="Numero de telephone">
    </div>
    <div class="group-form">
        <input type="email" data-translate ="email" id="email" placeholder="Email" />
      </div>
      <div class="group-form">
        <input type="password" data-translate="password" id="password" placeholder="Mot de passe">
          <p id="password-error-msg" data-translate="error" style="color: red; display: none;">Le mot de passe doit avoir au moins 8 caractères et inclure au moins un chiffre</p>
      </div>
      <div class="group-form">
        <input type="submit"  id="submitButton"  class="inscription"  value="S'inscrire" data-translate="inscription">
      </div>
    </form>
    <div class="benevole">
        <p class="paragraphe">
            <span data-translate="text-part1">Vous voulez nous aider ? Devenez </span>
            <strong data-translate="strong-text">bénévole</strong>
            <span class="become-benevole" data-translate="text-part2"> en cliquant ici.</span>
        </p>


    </div>
</div>
</body>

<script src="../javaScript/function_api.js"></script>
<script>
    document.getElementById("phone").addEventListener("input", function(event) {
        var input = event.target.value;
        var sanitizedInput = input.replace(/\D/g, '');
        event.target.value = sanitizedInput;
        if (sanitizedInput.length > 10) {
            event.target.value = sanitizedInput.slice(0, 10);
        }
    });

    document.getElementById("password").addEventListener("input", function(event) {
        var submitButton = document.getElementById('submitButton');
        var password = event.target.value;
        var minLength = 8;
        var hasNumber = /\d/.test(password);

        if (password.length < minLength || !hasNumber) {
            document.getElementById("password-error-msg").style.display = "block";
            submitButton.disabled = true;
        } else {
            document.getElementById("password-error-msg").style.display = "none";
            submitButton.disabled = false;
        }
    });

    document.getElementById('createForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        const prenom = document.getElementById('prenom').value;
        const nom = document.getElementById('nom').value;
        const code_postal = document.getElementById('code_postal').value;
        const ville = document.getElementById('ville').value;
        const adresse = document.getElementById('adresse').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const name = prenom + ' ' + nom;
        const role = 'beneficiaire';

        const formData = {
            name: name,
            email: email,
            code_postal: code_postal,
            ville: ville,
            adresse: adresse,
            num_telephone: phone,
            password: password,
            role: role
        };

        try {
            const data = await requestApi(formData, "POST", "/user/create");
            if (data) {
                showAlert("Création de l'utilisateur réussie !");
            } /*else {
                showAlert("Erreur lors de la création de l'utilisateur : " + (data ? data.status : 'Response is undefined'));
            }*/
        } catch (error) {
            showAlert('Erreur lors de la requête à l\'API : ' + error.message);
        }
    });

    function become_benevole(){
        localStorage.setItem('become_benevole', "True");

    }

</script>
<script>
    document.addEventListener('DOMContentLoaded', async function() {
        const selectedLanguage = localStorage.getItem('language') || 'fr';
        await loadTranslations(selectedLanguage);
    });
    document.addEventListener('DOMContentLoaded', function() {
        const becomeBenevoleElement = document.querySelector('.become-benevole');
        becomeBenevoleElement.addEventListener('click', function() {
            window.location.href = 'login.php';
        });
    });



    async function loadTranslations(language) {
        const translationFile = '../json/createAccount.json';
        const response = await fetch(translationFile);
        const translations = await response.json();
        updateTranslations(language, translations);
    }

    function updateTranslations(language, translations) {
        const elementsToTranslate = document.querySelectorAll('[data-translate]');
        elementsToTranslate.forEach(element => {
            const key = element.dataset.translate;
            if (translations[language] && translations[language][key]) {
                element.textContent = translations[language][key];
            }
        });
    }
</script>

</html>
