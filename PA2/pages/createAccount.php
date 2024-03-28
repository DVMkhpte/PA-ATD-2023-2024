<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" >
    <meta name="viewport" content="width=device-width, initial-scale=1.0" >
    <link rel="stylesheet" type="text/css" href="../css/createAccount.css">
    
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
        <input type="text" placeholder="Numero de telephone">
    </div>
    <div class="group-form">
        <input type="email" placeholder="Mail">
      </div>
      <div class="group-form"> 
        <input type="password" placeholder="Mot de passe">
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


<script src="../javaScriptphone.js">
</html>
