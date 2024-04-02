<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Page administarteur</title>
    <link rel="stylesheet" href="../CSS/back_end.css">

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap"
      rel="stylesheet"
    />

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet"
     integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"
     integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>
    

</head>
<body>
<aside class="sidebar">
      <div class="sidebar-inner">
        <header class="sidebar-header">
          <button
            type="button"
            class="sidebar-burger"
            onclick="toggleSidebar()"
          ></button>
          <img src="../img/logo.png" class="sidebar-logo" />
        </header>
        <nav class="sidebar-nav">
          <button type="button" onclick="affichageBackEnd('Formations')">
            <img src="../img/formation.png" />
            <span>Formations</span>
          </button>
          <button type="button" onclick="affichageBackEnd('Activitées')">
            <img src="../img/activitee.png" />
            <span style="animation-delay: 0.1s">Activitées</span>
          </button>
          <button type="button" onclick="affichageBackEnd('Bénévoles')">
            <img src="../img/benevole.png" />
            <span style="animation-delay: 0.2s">Bénévoles</span>
          </button>
          <button type="button" onclick="affichageBackEnd('Bénéficiaires')">
            <img src="../img/beneficiaire.png" />
            <span style="animation-delay: 0.2s">Bénéficiaires</span>
          </button>
          <button type="button" onclick="affichageBackEnd('Demandes')">
            <img src="../img/demande.png" />
            <span style="animation-delay: 0.2s">Demandes</span>
          </button>
          <button type="button" onclick="affichageBackEnd('Missions')">
            <img src="../img/mission.png" />
            <span style="animation-delay: 0.3s">Missions</span>
          </button>
          <button type="button" onclick="affichageBackEnd('Planning')">
            <img src="../img/planning.png" />
            <span style="animation-delay: 0.3s">Planning</span>
          </button>
          <button type="button" onclick="affichageBackEnd('Stock')">
            <img src="../img/stock.png"/>
          <span style="animation-delay: 0.3s">Stock</span>
        </button>
        </nav>
      </div>
    </aside>


<main>
  <div id="info">
      <h1 id="titre">Formations</h1>
  </div>

  <div id="box">

  </div>
   
</main>      

<?php  //include("../includes/footer.php") ?>
<script type="text/javascript">
    const toggleSidebar = () => document.body.classList.toggle("open");
</script>
<script src="../javaScript/back_end.js"></script>
</body>
</html>