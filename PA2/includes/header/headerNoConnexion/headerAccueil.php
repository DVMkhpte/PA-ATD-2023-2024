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
        <script src="../javaScript/trad.js"></script>
        <nav class="navbar">
            <button onclick="toggleMenu()" class="burger"></button>
            <button class="button"><a href="index.php" data-translate="home2">Accueil</a></button>
            <div class="dropdowns">
                <div class="dropdown">
                    <button class="button" data-translate="account2">
                        Compte
                        <img src="../includes/header/headerNoConnexion/chevron.svg" />
                    </button>
                    <div class="dropdown-menu">
                        <button><a href="login.php" data-translate="login2">Se connecter</a></button>
                        <button><a href="createAccount.php" data-translate="create_account2">Creer un compte</a></button>
                    </div>
                </div>
                <div class="dropdown">
                    <button class="button" data-translate="donation2">
                        Donation
                        <img src="../includes/header/headerNoConnexion/chevron.svg" />
                    </button>
                    <div class="dropdown-menu">
                        <button><a href="donation.php" data-translate="make_donation2">Faire un don</a></button>
                        <button><a href="about_donation.php" data-translate="why_help2">Pourquoi nous aider ?</a></button>
                        <button><a href="about.php" data-translate="who_we_are2">Qui sommes-nous ?</a></button>
                    </div>
                </div>
                <div class="dropdown">
                    <button class="button" data-translate="help2">
                        Aide
                        <img src="../includes/header/headerNoConnexion/chevron.svg" />
                    </button>
                    <div class="dropdown-menu">
                        <button><a href="contact.php" data-translate="contact_us2">Nous contacter</a></button>
                        <button><a href="legal_mention.php" data-translate="legal_mentions2">Mention légales</a></button>
                        <button><a href="policy.php" data-translate="data_policy2">Politique de données</a></button>
                    </div>
                </div>

                <div class="dropdown">
                    <button type="button" id="languageDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-translate="translate2">
                        Traduire
                        <img src="../includes/header/headerNoConnexion/chevron.svg" />
                    </button>

                    <div class="dropdown-menu" aria-labelledby="languageDropdown">

                        <!-- English -->
                        <a id="english" class="dropdown-item" href="#" onclick="updateTranslations('en')" style="color: white; background-color: transparent;">
                            <img src="../img/flags/us.png" alt="English Flag" class="img-fluid" style="width: 20px;"> English
                        </a>

                        <!-- Spanish -->
                        <a class="dropdown-item" href="#" onclick="updateTranslations('es')" style="color: white; background-color: transparent;">
                            <img src="../img/flags/sp.png" alt="Spanish Flag" class="img-fluid" style="width: 20px;"> Español
                        </a>

                        <!-- Italian -->
                        <a class="dropdown-item" href="#" onclick="updateTranslations('it')" style="color: white; background-color: transparent;">
                            <img src="../img/flags/it.png" alt="Italian Flag" class="img-fluid" style="width: 20px;"> Italiano
                        </a>

                        <!-- German -->
                        <a class="dropdown-item" href="#" onclick="updateTranslations('de')" style="color: white; background-color: transparent;">
                            <img src="../img/flags/de.png" alt="German Flag" class="img-fluid" style="width: 20px;"> Deutsch
                        </a>

                        <!-- Portuguese -->
                        <a class="dropdown-item" href="#" onclick="updateTranslations('pt')" style="color: white; background-color: transparent;">
                            <img src="../img/flags/pt.png" alt="Portuguese Flag" class="img-fluid" style="width: 20px;"> Português
                        </a>

                        <!-- Russian -->
                        <a class="dropdown-item" href="#" onclick="updateTranslations('ru')" style="color: white; background-color: transparent;">
                            <img src="../img/flags/ru.png" alt="Russian Flag" class="img-fluid" style="width: 20px;"> русский
                        </a>

                        <!-- Greek -->
                        <a class="dropdown-item" href="#" onclick="updateTranslations('el')" style="color: white; background-color: transparent;">
                            <img src="../img/flags/el.png" alt="Greek Flag" class="img-fluid" style="width: 20px;"> ελληνικά
                        </a>

                        <!-- Arabic -->
                        <a class="dropdown-item" href="#" onclick="updateTranslations('ar')" style="color: white; background-color: transparent;">
                            <img src="../img/flags/dz.png" alt="Arabic Flag" class="img-fluid" style="width: 20px;"> العَرَبِيَّة
                        </a>

                        <!-- Chinese -->
                        <a class="dropdown-item" href="#" onclick="updateTranslations('zh')" style="color: white; background-color: transparent;">
                            <img src="../img/flags/zh.png" alt="Chinese Flag" class="img-fluid" style="width: 20px;"> 中文
                        </a>

                        <!-- Hindi -->
                        <a class="dropdown-item" href="#" onclick="updateTranslations('hi')" style="color: white; background-color: transparent;">
                            <img src="../img/flags/hi.png" alt="Hindi Flag" class="img-fluid" style="width: 20px;"> हिन्दी
                        </a>

                        <!-- Japanese -->
                        <a class="dropdown-item" href="#" onclick="updateTranslations('ja')" style="color: white; background-color: transparent;">
                            <img src="../img/flags/ja.png" alt="Japanese Flag" class="img-fluid" style="width: 20px;"> 日本語
                        </a>

                        <!-- Korean -->
                        <a class="dropdown-item" href="#" onclick="updateTranslations('ko')" style="color: white; background-color: transparent;">
                            <img src="../img/flags/ko.png" alt="Korean Flag" class="img-fluid" style="width: 20px;"> 한국어
                        </a>

                        <!-- Bengali -->
                        <a class="dropdown-item" href="#" onclick="updateTranslations('bn')" style="color: white; background-color: transparent;">
                            <img src="../img/flags/bn.png" alt="Bengali Flag" class="img-fluid" style="width: 20px;"> বাংলা
                        </a>

                        <!-- Punjabi -->
                        <a class="dropdown-item" href="#" onclick="updateTranslations('pa')" style="color: white; background-color: transparent;">
                            <img src="../img/flags/pa.png" alt="Punjabi Flag" class="img-fluid" style="width: 20px;"> ਪੰਜਾਬੀ
                        </a>

                        <!-- French -->
                        <a class="dropdown-item" href="#" onclick="updateTranslations('fr')" style="color: white; background-color: transparent;">
                            <img src="../img/flags/fr.png" alt="French Flag" class="img-fluid" style="width: 20px;"> Français
                        </a>

                        <!-- Lingala -->
                        <a class="dropdown-item" href="#" onclick="updateTranslations('ln')" style="color: white; background-color: transparent;">
                            <img src="../img/flags/ln.png" alt="Lingala Flag" class="img-fluid" style="width: 20px;"> Lingala
                        </a>

                        <!-- Serbian -->
                        <a class="dropdown-item" href="#" onclick="updateTranslations('sr')" style="color: white; background-color: transparent;">
                            <img src="../img/flags/sr.png" alt="Serbian Flag" class="img-fluid" style="width: 20px;"> Serbe
                        </a>

                        <!-- Catalan -->
                        <a class="dropdown-item" href="#" onclick="updateTranslations('ca')" style="color: white; background-color: transparent;">
                            <img src="../img/flags/ca.png" alt="Catalan Flag" class="img-fluid" style="width: 20px;"> Català
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

      fetch('../json/headerAccueil.json')
          .then(response => response.json())
          .then(data => {
              // Utilisez les données JSON ici
              console.log(data);
          })
          .catch(error => {
              console.error('Erreur lors du chargement du fichier JSON :', error);
          });

    </script>

