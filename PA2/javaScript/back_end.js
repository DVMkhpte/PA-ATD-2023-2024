
function affichageBackEnd(affichage) {
    const retirerTitreAdmin = document.getElementById('titre');
    retirerTitreAdmin.innerHTML = "";
    const resTitre = affichage
    const affichageTitreAdmin = document.getElementById('titre');
    affichageTitreAdmin.innerHTML = resTitre;

    const retirerBoxAdmin = document.getElementById('box');
    retirerBoxAdmin.innerHTML = "";

    var strBox = ""

    //requestApi(formData, method, link)
    switch (affichage) {
        case 'Bénévoles':
            var formData = "";
            //var data = requestApi(formData, "GET", "/users/")
            var data = [ {"id":1, "name":"ff", "code_postal":91330, "ville":"yerres", "adresse":"affichage", "num_phone":"1234567891", "email":"test@test.fr", "role": "benevole", "email_verified":"False",},
                                                    {"id":2, "name":"ff", "code_postal":91330, "ville":"yerres", "adresse":"affichage", "num_phone":"1234567891", "email":"test@test.fr", "role": "benevole", "email_verified":"False",}
                                                  ];
            strBox = affichageBenevole(data);

            break;

        case 'Bénéficiaires':
            var formData = "";
            //var data = requestApi(formData, "GET", "/users/");
            var data = [ {"id":1, "name":"ff", "code_postal":91330, "ville":"yerres", "adresse":"affichage", "num_phone":"1234567891", "email":"test@test.fr", "role": "beneficiaire", "email_verified":"False",},
                                                    {"id":2, "name":"ff", "code_postal":91330, "ville":"yerres", "adresse":"affichage", "num_phone":"1234567891", "email":"test@test.fr", "role": "beneficiaire", "email_verified":"False",}
                                                    ];
            strBox = affichageBeneficiaire(data);

            break;

        case 'Activitées':
            var formData = "";
            var data = requestApi(formData, "GET", "/activitees/");
            strBox = affichageActivitee(data);
            break;

        case 'Formations':
            var formData = "";
            var data = requestApi(formData, "GET", "/formations");
            strBox = affichageFormation(data);
            break;

        case 'Demandes':
            var formData = "";
            var data = requestApi(formData, "GET", "/demande");
            strBox = affichageDemande(data);
            break;

        case 'Missions':
            var formData = "";
            //var data = requestApi(formData, "GET", "/missions");
            var data = [
                                                            {
                                                                "id": 1,
                                                                "id_demande": 1,
                                                                "realiser_par": 3,
                                                                "created_at": "2024-02-28T14:51:38.000000Z",
                                                                "updated_at": "2024-02-28T14:51:38.000000Z",
                                                                "user": {
                                                                    "id": 3,
                                                                    "name": "Enzo",
                                                                    "code_postal": 0,
                                                                    "ville": "",
                                                                    "adresse": "",
                                                                    "num_telephone": 0,
                                                                    "email": "cocodoudo@gmail.com",
                                                                    "role": "admin",
                                                                    "email_verified_at": null,
                                                                    "created_at": "2024-02-12T20:45:43.000000Z",
                                                                    "updated_at": "2024-02-12T20:45:43.000000Z"
                                                                },
                                                                "demande": {
                                                                    "id": 1,
                                                                    "type": "typetest",
                                                                    "demande": "Bonjour",
                                                                    "id_user": 3,
                                                                    "updated_at": "2024-02-22T10:08:55.000000Z",
                                                                    "created_at": "2024-02-22T10:08:55.000000Z"
                                                                }
                                                            }
                                                        ]
            strBox = affichageMission(data);
            break;

        default:
            break;
    }

    const affichageBoxAdmin = document.getElementById('box');
    affichageBoxAdmin.innerHTML = strBox;

}



function trie(filtre, affichage) {
    console.log(filtre);
}


