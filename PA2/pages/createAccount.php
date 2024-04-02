<!DOCTYPE html>
<html>

<head>
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
    <form class="formulaire">
    <div class="group-form">
        <input type="text" placeholder="Prenom">
        <input type="text" placeholder="Nom">
    </div>  
    <div class="group-form">
        <input type="text" placeholder="Code Postal">
        <input type="text" placeholder="Ville">
    </div>
    <div class="group-form">
        <input type="text" placeholder="Adresse">
    </div>
    <div class="group-form">
        <input type="text" id="phone" placeholder="Numero de telephone">
    </div>
    <div class="group-form">
        <input type="email" placeholder="Mail">
      </div>
      <div class="group-form"> 
        <input type="password" id="password" placeholder="Mot de passe">
          <p id="password-error-msg" style="color: red; display: none;">Le mot de passe doit avoir au moins 8 caractères et inclure au moins un chiffre</p>
      </div>
      <div class="group-form">
        <input type="submit" class="inscription" value="S'inscrire">
      </div>
    </form>
    <div class="benevole">
    <p class="paragraphe">
      Vous voulez nous aider ? Devenez <strong>bénévole</strong> en <a href="">cliquant ici.</a>
    </p>
  </div>
</div>
</body>


<script>
    document.getElementById("phone").addEventListener("input", function(event) {
        var input = event.target.value;
        console.log(input);
        var sanitizedInput = input.replace(/\D/g, '');
        event.target.value = sanitizedInput;
        if (sanitizedInput.length > 10) {
            event.target.value = sanitizedInput.slice(0, 10);
        }
    });

    document.getElementById("password").addEventListener("input", function(event) {
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
</script>
</html>
