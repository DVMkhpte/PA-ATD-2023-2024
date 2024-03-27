<?php

    if(isset($_GET['affichage'])) {

        $affichage = $_GET['affichage'];

        switch($affichage){

            case "Planning":

                break;



            case "Activitée":

                echo'
                    <div class="filtre">
                
                        <div  class="barre_de_recherche">
                            <input type="text" id="search-article-input" placeholder="Activitées">
                        </div>

                        <div  class="tout_les_filtre">
                            <select class="boutton" name="trie" id="trie">
                                <option selected disabled hidden id="choix">Trier par</option>
                                <option value="nom" onclick="trie("nom")">Nom</option>
                                <option value="prenom" onclick="trie("type")">Type</option>
                                <option value="acces" onclick="trie("lieu")">Lieu</option>
                                <option value="acces" onclick="trie("date")">Date</option>
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
                                <button onclick="formationBenevole()" class="inscription">Inscription</button>
                            </div>
                            
                        </div>


                    </div>
                ';

                break;



            case "Demande":

                break;

            default:
                break;
        }
    }

?>