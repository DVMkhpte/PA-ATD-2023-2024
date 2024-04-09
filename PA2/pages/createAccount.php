<!DOCTYPE html>
<html>

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
<div class="container">
  <div id="connexion">
    <div class="accueil">
        <img src="../img/maison.png" alt="Image d'accueil">
        <a href="index.php"><u>Retour à l'accueil</u></a>
    </div>
    <h1 class="title">Connectez-vous</h1>
    <a href="login.php" class="btn-link connexion">Se connecter</a>
  </div>
  <div id="inscription">
    <h1 class="title">Créer un compte</h1>
    <p class="paragraphe">
      Veuillez remplir tous les champs
    </p>
    <form class="formulaire" id="createForm">
    <div class="group-form">
        <input type="text" id="prenom" placeholder="Prenom">
        <input type="text" id="nom" placeholder="Nom">
    </div>  
    <div class="group-form">
        <input type="text" id="code_postal" placeholder="Code Postal">
        <input type="text" id="ville" placeholder="Ville">
    </div>
    <div class="group-form">
        <input type="text" id="adresse" placeholder="Adresse">
    </div>
    <div class="group-form">
        <input type="text" id="phone" placeholder="Numero de telephone">
    </div>
    <div class="group-form">
        <input type="email" id="email" placeholder="Mail">
      </div>
      <div class="group-form"> 
        <input type="password" id="password" placeholder="Mot de passe">
          <p id="password-error-msg" style="color: red; display: none;">Le mot de passe doit avoir au moins 8 caractères et inclure au moins un chiffre</p>
      </div>
      <div class="group-form">
        <input type="submit" id="submitButton" class="inscription" value="S'inscrire">
      </div>
    </form>
    <div class="benevole">
    <p class="paragraphe">
      Vous voulez nous aider ? Devenez <strong>bénévole</strong> en <a href="login.php" onclick="become_benevole()">cliquant ici.</a>
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
            if (data && data.status === 200) {
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
</html>
