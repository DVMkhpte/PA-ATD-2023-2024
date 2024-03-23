    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
      rel="stylesheet"
    />
    <link href="../includes/header/headerNoConnexion/stylesHeaderAccueil.css" rel="stylesheet" />

  <header>
    <nav class="navbar">
      <button onclick="toggleMenu()" class="burger"></button>
        <button class="button"><a href="index.php">Home</a></button>
      <div class="dropdowns">
        <div class="dropdown">
          <button class="button">
            Compte
            <img src="../includes/header/headerNoConnexion/chevron.svg" />
          </button>
          <div class="dropdown-menu">
            <button><a href="login.php">Se connecter</a></button>
              <button><a href="createAccount.php"> Creer un compte</a></button>
          </div>
        </div>
        <div class="dropdown">
          <button class="button">
            Donation
            <img src="../includes/header/headerNoConnexion/chevron.svg" />
          </button>
          <div class="dropdown-menu">
              <button><a href="donation.php">Faire un don</a></button>
              <button><a href="about_donation.php">Pourquoi nous aider ?</a></button>
              <button><a href="about.php">Qui somme-nous ?</a></button>
          </div>
        </div>
        <div class="dropdown">
          <button class="button">
            Aide
            <img src="../includes/header/headerNoConnexion/chevron.svg" />
          </button>
          <div class="dropdown-menu">
              <button><a href="contact.php">Nous contacter</a></button>
              <button><a href="legal_mention.php">Mention légales</a></button>
              <button><a href="policy.php">Politique de données</a></button>
          </div>
        </div>
      </div>
    </nav>
  </header>


    <script>
      const toggleMenu = () => document.body.classList.toggle("open");
    </script>

