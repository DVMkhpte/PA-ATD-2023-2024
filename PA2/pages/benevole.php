<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Bénévole</title>
    <link rel="stylesheet" href="../CSS/benevole.css">
</head>
<body>
<?php  include("../includes/header.php") ?>

<main>
    
    <div class="container_1">
        <div class="menu">
            <div class="nav_menu">
                <div class="div_img" id="Planning" onclick="affichageBenevole('Planning')" ><img class="img_menu" src="../img/planning.png"></div>
                <div class="div_img" id="Formation" onclick="affichageBenevole('Formation')"><img class="img_menu" src="../img/formation.png"></div>
                <div class="div_img" id="Mission" onclick="affichageBenevole('Mission')"><img class="img_menu" src="../img/mission.png"></div>
            </div>

            <div class="titre">
                <h1 id="titre">Formation :</h1>
            </div>
        </div>


        <div id="container_2">
            <div class="filtre">
                
                <div  class="barre_de_recherche">
                    <input type="text" id="search-article-input" placeholder="Formation">
                </div>

                <div  class="tout_les_filtre">
                    <select class="boutton" name="trie" id="trie">
                        <option selected disabled hidden id="choix">Trier par</option>
                        <option value="nom" onclick="trie('nom')">Nom</option>
                        <option value="prenom" onclick="trie('type')">Type</option>
                        <option value="acces" onclick="trie('lieu')">Lieu</option>
                        <option value="acces" onclick="trie('date')">Date</option>
                    </select>
                </div>
            
            </div>

            <div class="all_info">

                <div class="info">

                    <div class="description_general">
                        <div class="description_1">
                            <div class="description_1_1">
                                <div class="nom">Nom</div>
                                <div class="prenom">Type</div>
                            </div>
                            <div class="description_1_2">
                                <div class="acces">lieu</div>
                                <div class="statut">Date</div>
                            </div>
                        </div>
                        <div class="description_2">
                            <div class="desription">Desription : Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque, id. Facilis, accusamus qui. Itaque laudantium laboriosam totam dignissimos voluptates debitis explicabo, in hic officiis error obcaecati, quis minus ipsam similique.</div>
                        </div>
                        
                    </div>
                    <div class="option">
                        <button onclick="formationBenevole()" class="inscription" >Ce positionner</button>
                    </div>
                    
                </div>

                <div class="info">

                    <div class="description_general">
                        <div class="description_1">
                            <div class="description_1_1">
                                <div class="nom">Nom</div>
                                <div class="prenom">Type</div>
                            </div>
                            <div class="description_1_2">
                                <div class="acces">lieu</div>
                                <div class="statut">Date</div>
                            </div>
                        </div>
                        <div class="description_2">
                            <div class="desription">Desription : Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque, id. Facilis, accusamus qui. Itaque laudantium laboriosam totam dignissimos voluptates debitis explicabo, in hic officiis error obcaecati, quis minus ipsam similique.</div>
                        </div>
                        
                    </div>
                    <div class="option">
                        <button onclick="formationBenevole()" class="inscription" >Ce positionner</button>
                    </div>
                    
                </div>

                <div class="info">

                    <div class="description_general">
                        <div class="description_1">
                            <div class="description_1_1">
                                <div class="nom">Nom</div>
                                <div class="prenom">Type</div>
                            </div>
                            <div class="description_1_2">
                                <div class="acces">lieu</div>
                                <div class="statut">Date</div>
                            </div>
                        </div>
                        <div class="description_2">
                            <div class="desription">Desription : Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque, id. Facilis, accusamus qui. Itaque laudantium laboriosam totam dignissimos voluptates debitis explicabo, in hic officiis error obcaecati, quis minus ipsam similique.</div>
                        </div>
                        
                    </div>
                    <div class="option">
                        <button onclick="formationBenevole()" class="inscription" >Ce positionner</button>
                    </div>
                    
                </div>

                <div class="info">

                    <div class="description_general">
                        <div class="description_1">
                            <div class="description_1_1">
                                <div class="nom">Nom</div>
                                <div class="prenom">Type</div>
                            </div>
                            <div class="description_1_2">
                                <div class="acces">lieu</div>
                                <div class="statut">Date</div>
                            </div>
                        </div>
                        <div class="description_2">
                            <div class="desription">Desription : Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque, id. Facilis, accusamus qui. Itaque laudantium laboriosam totam dignissimos voluptates debitis explicabo, in hic officiis error obcaecati, quis minus ipsam similique.</div>
                        </div>
                        
                    </div>
                    <div class="option">
                        <button onclick="formationBenevole()" class="inscription" >Ce positionner</button>
                    </div>
                    
                </div>


            </div>

        </div>
    </div>

    <div class="profil_part">
        <div class="info_profil_general">
            <h1>Profil :</h1>
            <div class="info_profil_1">
                <div id="nom_profil" class="info_profil">Nom</div>
                <div id="prenom_profil" class="info_profil">Prenom</div>
            </div>
            <div class="info_profil_2">
                <div id="email_profil" class="info_profil">Email</div>
                <div id="mdp_profil" class="info_profil">Mot de passe</div>
            </div>
            <div class="info_profil_3">
                <div id="ville_profil" class="info_profil">Ville</div>
                <div id="adresse_profil" class="info_profil">adresse</div>
            </div>

        </div>

        <div class="nav_profil">
            <button class="modif">Modifier</button>
            <button class="voir" onclick="affichageBenevole('Mes missions')">Mes missions</button>
            <button class="voir" onclick="affichageBenevole('Mes Formations')">Mes Formations</button>
        </div>

        
    </div>

</main>

<?php // include("../includes/footer.php") ?>

<script src="../javaScript/benevole.js"></script>
</body>
</html>