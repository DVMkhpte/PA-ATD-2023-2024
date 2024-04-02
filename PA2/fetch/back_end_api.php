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
                                <input type="text" id="search-article-input" placeholder="Activitées">
                            </div>
                    
                            <div  class="tout_les_filtre">
                                <select class="boutton" name="trie" id="trie">
                                    <option selected disabled hidden id="choix">Trier par</option>
                                    <option value="nom" onclick="trie("nom")">Nom</option>
                                    <option value="date" onclick="trie("date")">Date debut</option>
                                    <option value="type" onclick="trie("type")">type</option>
                                </select>
                            </div>
                    
                            <div class="button_filtre">
                                <button class="button_new">Nouveau</button>
                            </div>
                        
                        </div>
                    ';

                 $json = '[{"id":"1", "nom":"Activitée 1","description":"Ceci est l\'activitée numéro 1","date_debut": "2024-02-15T10:00:00","date_fin": "2024-02-15T18:00:00","nb_place": "10","superviser_par":"4"},
                           {"id":"2", "nom":"Activité 2", "description":"Ceci est l\'activitée numéro 1","date_debut": "2024-02-15T10:00:00","date_fin": "2024-02-15T18:00:00","nb_place": "10","superviser_par":"4"},
                           {"id":"3", "nom":"Activité 2", "description":"Ceci est l\'activitée numéro 1","date_debut": "2024-02-15T10:00:00","date_fin": "2024-02-15T18:00:00","nb_place": "10","superviser_par":"4"}]';

                // Conversion en données PHP
                $data = json_decode($json, true);

                // Affichage des données PHP
                foreach($data as $row) {
                    echo '
                        <div class="contener_1">
                            <div class="contener_2">
                              <div class="description_activitee">
                                <div class="description1_activitee">
                                    <div class="description1_1_activitee">
                                        <div class="nom">'.$row["nom"].'</div>
                                    </div>
                                    <div class="adresse"> Au .$row["adresse"].</div>
                                    <div class="date">Du '.$row["date_debut"].' au '.$row["date_fin"].'</div>
                                </div>
                                <div class="description2_activitee">
                                    <p>'.$row["description"].'</p>
                                    <div class="superviserPar">Superviser Par : '.$row["superviser_par"].'</div>
                                    <div class="nb_plae">Place restante : '.$row["nb_place"].'</div>
                                </div>
                                
                              </div>
                              <div class="option">
                                  <button class="modif">Modifier l\'activité</button>
                                  <button class="voir">Voir les participants</button>
                                  <button class="supp">Supprimer</button>
                              </div>
                            </div>
                        </div>
                    ';
                }
                break;


            case "Formations":

                echo'
                        <div class="filtre">
        
                            <div  class="barre_de_recherche">
                                <input type="text" id="search-article-input" placeholder="Formations">
                            </div>
                    
                            <div  class="tout_les_filtre">
                                <select class="boutton" name="trie" id="trie">
                                    <option selected disabled hidden id="choix">Trier par</option>
                                    <option value="nom" onclick="trie("nom")">Nom</option>
                                    <option value="date" onclick="trie("date")">Date debut</option>
                                    <option value="type" onclick="trie("type")">type</option>
                                </select>
                            </div>
                    
                            <div class="button_filtre">
                                <button class="button_new">Nouveau</button>
                            </div>
                        
                        </div>
                    ';

                $json = '[{"id":"1", "nom":"Formation 3","description":"Ceci est la formation numéro 3","date_debut": "2024-02-15T10:00:00","date_fin": "2024-02-15T18:00:00","nb_place": "10","supervise_par":"1"},
                        {"id":"2", "nom":"Formation 3","description":"Ceci est la formation numéro 3","date_debut": "2024-02-15T10:00:00","date_fin": "2024-02-15T18:00:00","nb_place": "10","supervise_par":"1"},
                        {"id":"2", "nom":"Formation 3","description":"Ceci est la formation numéro 3","date_debut": "2024-02-15T10:00:00","date_fin": "2024-02-15T18:00:00","nb_place": "10","supervise_par":"1"}
                ]';

                // Conversion en données PHP
                $data = json_decode($json, true);

                // Affichage des données PHP
                foreach($data as $row) {
                    echo '
                        <div class="contener_1">
                            <div class="contener_2">
                              <div class="description_activitee">
                                <div class="description1_activitee">
                                    <div class="description1_1_activitee">
                                        <div class="nom">'.$row["nom"].'</div>
                                        <div class="type"> type </div>
                                    </div>
                                    <div class="adresse"> Au .$row["adresse"].</div>
                                    <div class="date">Du '.$row["date_debut"].' au '.$row["date_fin"].'</div>
                                </div>
                                <div class="description2_activitee">
                                    <p>'.$row["description"].'</p>
                                    <div class="superviserPar">Superviser Par : '.$row["supervise_par"].'</div>
                                    <div class="nb_plae">Place restante : '.$row["nb_place"].'</div>
                                </div>
                                
                              </div>
                              <div class="option">
                                  <button class="modif">Lodifier l\'activité</button>
                                  <button class="voir">Voir les participants</button>
                                  <button class="supp">Supprimer</button>
                              </div>
                            </div>
                        </div>
                    ';
                }
                break;

            case "Demandes":

                echo'
                    <div class="filtre">
            
                        <div  class="barre_de_recherche">
                            <input type="text" id="search-article-input" placeholder="Demandes">
                        </div>
                
                        <div  class="tout_les_filtre">
                            <select class="boutton" name="trie" id="trie">
                                <option selected disabled hidden id="choix">Trier par</option>
                                <option value="type" onclick="trie("type")">Type</option>
                                <option value="date" onclick="trie("date")">Date</option>
                            </select>
                        </div>
                
                        <div class="button_filtre">
                            <button class="button_new">Nouveau</button>
                        </div>
                    
                    </div>
                ';

                $json = '[{"id":"1", "type": "typetest", "created_at":"2024" ,"demande": "Bonjour"},
                        {"id":"2", "type": "typetest", "created_at":"2024", "demande": "Bonjour"},
                        {"id":"3", "type": "typetest", "created_at":"2024", "demande": "Bonjour"}
                ]';

                // Conversion en données PHP
                $data = json_decode($json, true);

                // Affichage des données PHP
                foreach($data as $row) {

                    echo '
                        <div class="contener_1">
                            <div class="contener_2">
                              <div class="description_demande">
                                <div class="description1_demande">
                                    <div class="type">Type : ' . $row["type"] . '</div>
                                    <div class="fait_par">De : .$row["type"].</div>
                                    <div class="date">Fait le : ' . $row["type"] . '</div>
                                </div>
                                <div class="description2_demande">
                                    <p>' . $row["demande"] . '</p>
                                </div>
                                
                              </div>
                              <div class="option">
                                  <button class="accepter">Accepter</button>
                                  <button class="supp">Supprimer</button>
                              </div>
                            </div>
                        </div>
                    ';
                }
                break;

            case "Missions":
                echo'
                    <div class="filtre">
            
                        <div  class="barre_de_recherche">
                            <input type="text" id="search-article-input" placeholder="Demandes">
                        </div>
                
                        <div  class="tout_les_filtre">
                            <select class="boutton" name="trie" id="trie">
                                <option selected disabled hidden id="choix">Trier par</option>
                                <option value="type" onclick="trie("type")">Type</option>
                                <option value="date" onclick="trie("date")">Date</option>
                            </select>
                        </div>
                
                        <div class="button_filtre">
                            <button class="button_new">Nouveau</button>
                        </div>
                    
                    </div>
                ';

                $json = '[{"id":"1", "id_demande":"1", "id_benevole":1, "date":2025},
                        {"id":"2", "id_demande":"1", "id_benevole":1, "date":2025},
                        {"id":"3", "id_demande":"1", "id_benevole":1, "date":2025}
                ]';

                // Conversion en données PHP
                $data = json_decode($json, true);

                // Affichage des données PHP
                foreach($data as $row) {
                    $json_demande = '{"id":"1", "type": "typetest", "created_at":"2024" ,"demande": "Bonjour"}';
                    $data_demande = json_decode($json_demande, true);

                    $json_benevole = '{"id":"1", "nom":"John1", "prenom":"Titoaun"}';
                    $data_benevole = json_decode($json_benevole, true);

                    echo '
                            <div class="contener_1">
                                <div class="contener_2">
                                  <div class="description_demande">
                                    <div class="description1_demande">
                                        <div class="type">Type : '. $data_demande["type"] .'</div>
                                        <div class="fait_par">De : .$row["fait_par"].</div>
                                        <div class="date">Pour le : '. $row["date"] .'</div>
                                        
                                    </div>
                                    <div class="description2_demande">
                                        <p>' . $data_demande["demande"] . '</p>
                                    </div>
                                    
                                  </div>
                                  <div class="option">
                                      <button class="accepter">Accepter</button>
                                      <button class="supp">Supprimer</button>
                                  </div>
                                </div>
                            </div>
                        ';

                }
                break;

            default:
                break;
        }



        
    }
?>