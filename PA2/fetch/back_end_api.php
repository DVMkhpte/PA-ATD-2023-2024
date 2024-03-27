<?php

    if(isset($_GET['affichage'])) {
        $affichage = $_GET['affichage'];

        switch($affichage){
            case 'Bénévoles':
                
                echo'
                    <div class="filtre">
            
                        <div  class="barre_de_recherche">
                            <input type="text" id="search-article-input" placeholder="Bénévoles">
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
                ';


                $json = '[{"id":"1", "nom":"John1", "prenom":"Titoaun", "code_postal":"91330", "ville":"New York", "adresse" : "5 rue jules ferry", "email":"test@test.gmail", "role": "bénéficiaire", "email_verified_at": false},
                           {"id":"2", "nom":"John2", "prenom":"Titoaun", "code_postal":"91330", "ville":"New York", "adresse" : "5 rue jules ferry", "email":"test@test.gmail", "role": "bénévole", "email_verified_at": true},
                           {"id":"1", "nom":"John3", "prenom":"Titoaun", "code_postal":"91330", "ville":"New York", "adresse" : "5 rue jules ferry", "email":"test@test.gmail", "role": "bénéficiaire", "email_verified_at": false}
                        ]';

                // Conversion en données PHP
                $data = json_decode($json, true);

                // Affichage des données PHP

                foreach($data as $row) {
                    if($row["role"]=="bénévole") {
                        echo '
                            <div class="contener_1">
                                <div class="contener_2">
                                    <div class="descriptions_users">
                                        <div class="description1_users">
                                            <div class="nom">Nom : ' . $row["nom"] . '</div>
                                            <div class="prenom">Prénom : ' . $row["prenom"] . '</div>
                                            <div class="statut">Statut : </div>
                                        </div>
                                        <div class="description2_users">
                                            <div class="role">Role : ' . $row["role"] . '</div>
                                            <div class="email">Email : ' . $row["email"] . '</div>
                                            <div class="verified_email">Email verifié : ' . $row["email_verified_at"] . '</div>
                                        </div>
                                        <div class="description3_users">
                                            <div class="adresse">Adresse : ' . $row["code_postal"] . ', ' . $row["ville"] . ', ' . $row["adresse"] . '</div>
                                        </div>
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
                    }
                }

                break;


            case 'Bénéficiaires':

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
                ';


                $json = '[{"id":"1", "nom":"John1", "prenom":"Titoaun", "code_postal":"91330", "ville":"New York", "adresse" : "5 rue jules ferry", "email":"test@test.gmail", "role": "bénéficiaire", "email_verified_at": false},
                           {"id":"2", "nom":"John2", "prenom":"Titoaun", "code_postal":"91330", "ville":"New York", "adresse" : "5 rue jules ferry", "email":"test@test.gmail", "role": "bénéficiaire", "email_verified_at": true},
                           {"id":"1", "nom":"John3", "prenom":"Titoaun", "code_postal":"91330", "ville":"New York", "adresse" : "5 rue jules ferry", "email":"test@test.gmail", "role": "bénéficiaire", "email_verified_at": false}
                        ]';

                // Conversion en données PHP
                $data = json_decode($json, true);

                // Affichage des données PHP

                foreach($data as $row) {
                    if($row["role"]=="bénéficiaire") {
                        echo '
                            <div class="contener_1">
                                <div class="contener_2">
                                    <div class="descriptions_users">
                                        <div class="description1_users">
                                            <div class="nom">Nom : ' . $row["nom"] . '</div>
                                            <div class="prenom">Prénom : ' . $row["prenom"] . '</div>
                                            <div class="statut">Statut : </div>
                                        </div>
                                        <div class="description2_users">
                                            <div class="role">Role : ' . $row["role"] . '</div>
                                            <div class="email">Email : ' . $row["email"] . '</div>
                                            <div class="verified_email">Email verifié : ' . $row["email_verified_at"] . '</div>
                                        </div>
                                        <div class="description3_users">
                                            <div class="adresse">Adresse : ' . $row["code_postal"] . ', ' . $row["ville"] . ', ' . $row["adresse"] . '</div>
                                        </div>
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
                    }
                }

                break;

            
            case 'Activitées':

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
                              <div class="description_activitee">
                                <div class="description1_activitee">
                                    <div class="description1_1_activitee">
                                        <div class="nom">Nom</div>
                                        <div class="type">Type</div>
                                    </div>
                                    <div class="adresse">Adresse : </div>
                                    <div class="superviserPar">Superviser Par</div>
                                    <div class="date">Du date1 au date2</div>
                                </div>
                                <div class="description2_activitee">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi explicabo impedit minima esse, accusantium iste modi quisquam asperiores iure vero soluta odit quas veniam mollitia reprehenderit laudantium necessitatibus sapiente qui.</p>
                                </div>
                                
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


            case "Formation":
                break;

            case "Demandes":
                break;

            case "Planning":
                break;

            case "Missions":
                break;

            default:
                break;
        }



        
    }
?>