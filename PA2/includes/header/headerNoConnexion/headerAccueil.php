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

          <div class="dropdown">
              <script src="../javaScript/trad.js"></script>
              <button class="button">
                  Traduire la page
                  <img src="../includes/header/headerNoConnexion/chevron.svg" />
              </button>

              <div class="dropdown-menu">
                  <select id="languageDropdown" onchange="translatePage(this.value)">
                      <option value="en">English</option>
                      <option value="es">Español</option>
                      <option value="it">Italiano</option>
                      <option value="de">Deutsch</option>
                      <option value="pt">Português</option>
                      <option value="ru">русский</option>
                      <option value="el">ελληνικά</option>
                      <option value="ar">العَرَبِيَّة</option>
                      <option value="zh">中文</option>
                      <option value="hi">हिन्दी</option>
                      <option value="ja">日本語</option>
                      <option value="ko">한국어</option>
                      <option value="bn">বাংলা</option>
                      <option value="pa">ਪੰਜਾਬੀ</option>


                  </select>
              </div>
          </div>





      </div>
        <div class="img-logo">
            <img src="../img/logo.png">
        </div>
    </nav>
  </header>


    <script>
      const toggleMenu = () => document.body.classList.toggle("open");
    </script>

