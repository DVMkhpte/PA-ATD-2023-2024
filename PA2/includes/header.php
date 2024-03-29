<style>
body {
    background: #f8f9fb;
    font-family: "Euclid Circular A", "Poppins";
  }
  
  * {
    box-sizing: border-box;
  }

body, html {
    margin: 0;
    padding: 0;
    height: 100%;

    background-color: white;

    font-family: "Arial", sans-serif;
}

header {
    position: fixed;
    top: 0;
    left: 0;

    padding-top: 0;
    margin-top: 0;

    display: flex;
    justify-content: space-between;
    align-items: center;

    background: linear-gradient(90deg, #38A7A6, #59CD97);
    height: 20%; 
    width: 100%
}

.left_partH,
.right_partH {
    display: flex;
    align-items: center;
}


.left_partH {
    padding-left: 1%;
    display: flex;
    justify-content: flex-start;
}

.right_partH {
    display: flex;
    justify-content: flex-end;
}


.img_header {
    width: 15%;
    background-color: white; 
    border-radius: 50%;
}


.nav_link_acceuil {
    font-size: 200%;
    text-decoration: none;
    color: white;
    padding: 15px 20px; 
    font-size: 18px; 

    display: flex;
    align-items: center;

    border-radius: 5px;
    margin: 1%;
}

.nav_link_acceuil:hover {
    background-color: rgba(255, 255, 255, 0.3);
    cursor: pointer; 
}

</style>

<header >
  <?php session_start() ?>
    <div class="left_partH">
        <img class="img_header" src="../img/logo.png">
        
        <a class="nav_link_acceuil" href="index.php">&lt;&lt;Accueil</a>
        
    </div>
    
</header>
