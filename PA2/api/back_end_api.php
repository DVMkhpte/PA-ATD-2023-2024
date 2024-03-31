<?php

    if(isset($_GET['affichage'])) {
        $affichage = $_GET['affichage'];

        switch($affichage){
            case 'Formations':
                
                echo'
                    <div class="filtre">
            
                        <div  class="barre_de_recherche">
                            <input type="text" id="search-article-input" placeholder="Formation">
                        </div>
                
                        <div  class="tout_les_filtre">
                            <select class="boutton" name="trie" id="trie">
                                <option selected disabled hidden id="choix">Trier par</option>
                                <option value="nom" onclick="trie("nom")">Nom</option>
                                <option value="prenom" onclick="trie("prenom")">Prénom</option>
                                <option value="acces" onclick="trie("acces")">Accés</option>
                                <option value="acces" onclick="trie("statut")">Statut</option>
                            </select>
                        </div>
                
                        <div class="button_filtre">
                            <button class="button_new">Nouveau</button>
                        </div>
                    
                    </div>
            
                    <div class="contener_1">
                        <div class="contener_2">
                            <div class="description">
                                <div class="nom">Nom</div>
                                <div class="prenom">Prénom</div>
                                <div class="acces">Accés</div>
                                <div class="statut">Statut</div>
                            </div>
                            <div class="option">
                                <button class="modif_acces">Modifier accé</button>
                                <button class="passer_admin">Passer admin</button>
                                <button class="bannir">Bannir</button>
                                <button class="supp">Supprimer</button>
                            </div>
                        </div>
                    </div>
                ';

                break;
            
            case 'Activitées':

                break;

            default:
                break;
        }



        
    }
?>