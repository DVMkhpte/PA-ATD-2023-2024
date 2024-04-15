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
        <div class="dropdown" id="trad">
          <button class="button">
            Compte
            <img src="../includes/header/headerNoConnexion/chevron.svg" />
          </button>
          <div class="dropdown-menu">
            <button><a href="login.php">Se connecter</a></button>
              <button><a href="createAccount.php"> Creer un compte</a></button>
          </div>
        </div>
        <div class="dropdown" id="trad">
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
        <div class="dropdown" id="trad">
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



          <div class="dropdown" id="trad">
              <script src="../javaScript/trad.js"></script>
              <button type="button" id="languageDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"">
                  Traduire
                  <img src="../includes/header/headerNoConnexion/chevron.svg" />
              </button>

              <div class="dropdown-menu" id="flags" aria-labelledby="languageDropdown">

                  <a class="dropdown-item" href="#" onclick="translatePage('en')" style="color: white; background-color: transparent;">
                      <img src="../img/flags/us.png" alt="English Flag" class="img-fluid" style="width: 20px;"> English
                  </a>

                  <a class="dropdown-item" href="#" onclick="translatePage('es')" style="color: white; background-color: transparent;">
                      <img src="../img/flags/sp.png" alt="Spanish Flag" class="img-fluid" style="width: 20px;"> Español
                  </a>
                  <a class="dropdown-item" href="#" onclick="translatePage('it')" style="color: white; background-color: transparent;">
                      <img src="../img/flags/it.png" alt="Italian Flag" class="img-fluid" style="width: 20px;"> Italiano
                  </a>
                  <a class="dropdown-item" href="#" onclick="translatePage('de')" style="color: white; background-color: transparent;">
                      <img src="../img/flags/de.png" alt="German Flag" class="img-fluid" style="width: 20px;"> Deutsch
                  </a>
                  <a class="dropdown-item" href="#" onclick="translatePage('pt')" style="color: white; background-color: transparent;">
                      <img src="../img/flags/pt.png" alt="Portuguese Flag" class="img-fluid" style="width: 20px;"> Português
                  </a>
                  <a class="dropdown-item" href="#" onclick="translatePage('ru')" style="color: white; background-color: transparent;">
                      <img src="../img/flags/ru.png" alt="Russian Flag" class="img-fluid" style="width: 20px;"> русский
                  </a>
                  <a class="dropdown-item" href="#" onclick="translatePage('el')" style="color: white; background-color: transparent;">
                      <img src="../img/flags/el.png" alt="Greek Flag" class="img-fluid" style="width: 20px;"> ελληνικά
                  </a>
                  <a class="dropdown-item" href="#" onclick="translatePage('ar')" style="color: white; background-color: transparent;">
                      <img src="../img/flags/dz.png" alt="Arabic Flag" class="img-fluid" style="width: 20px;"> العَرَبِيَّة
                  </a>
                  <a class="dropdown-item" href="#" onclick="translatePage('zh')" style="color: white; background-color: transparent;">
                      <img src="../img/flags/zh.png" alt="Chinese Flag" class="img-fluid" style="width: 20px;"> 中文
                  </a>
                  <a class="dropdown-item" href="#" onclick="translatePage('hi')" style="color: white; background-color: transparent;">
                      <img src="../img/flags/hi.png" alt="Hindi Flag" class="img-fluid" style="width: 20px;"> हिन्दी
                  </a>
                  <a class="dropdown-item" href="#" onclick="translatePage('ja')" style="color: white; background-color: transparent;">
                      <img src="../img/flags/ja.png" alt="Japanese Flag" class="img-fluid" style="width: 20px;"> 日本語
                  </a>
                  <a class="dropdown-item" href="#" onclick="translatePage('ko')" style="color: white; background-color: transparent;">
                      <img src="../img/flags/ko.png" alt="Korean Flag" class="img-fluid" style="width: 20px;"> 한국어
                  </a>
                  <a class="dropdown-item" href="#" onclick="translatePage('bn')" style="color: white; background-color: transparent;">
                      <img src="../img/flags/bn.png" alt="Bengali Flag" class="img-fluid" style="width: 20px;"> বাংলা
                  </a>
                  <a class="dropdown-item" href="#" onclick="translatePage('pa')" style="color: white; background-color: transparent;">
                      <img src="../img/flags/pa.png" alt="Punjabi Flag" class="img-fluid" style="width: 20px;">ਪੰਜਾਬੀ
                  </a>

                  <a class="dropdown-item" href="#" onclick="translatePage('fr')" style="color: white; background-color: transparent;">
                      <img src="../img/flags/fr.png" alt="Punjabi Flag" class="img-fluid" style="width: 20px;">Français
                  </a>
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

