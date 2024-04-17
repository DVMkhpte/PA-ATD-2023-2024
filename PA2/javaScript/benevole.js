async function affichageBenevole(affichage) {
    const gestionTitre = document.getElementById('titre');
    gestionTitre.innerHTML = "";

    const resTitre = affichage
    gestionTitre.innerHTML = resTitre;
    
    var resetStyle = document.getElementsByClassName("div_img");
    
    for(var i=0; i<resetStyle.length; i++){
        resetStyle[i].style.boxShadow = "none";
        resetStyle[i].style.backgroundColor = "#38A7A6";
    }
    

    var modifElement = document.getElementById(affichage);
    if(modifElement){
        modifElement.style.boxShadow = "inset 0px 4px 4px rgba(0, 0, 0, 0.25)";
        modifElement.style.backgroundColor = "#59CD97";
    }

    const retirerContainer = document.getElementById('container_2');
    retirerContainer.innerHTML = "";

    var strBox = ""
    
    
    switch (affichage){
        case "Formation":
            //var data = await requestApiNoBody("GET", "/formations");
            var data = [
                {
                    id: "1",
                    nom: "si mais",
                    type: "Type 1",
                    adresse: "123 Rue de la Rue",
                    date_debut: "01/04/2024",
                    date_fin: "03/04/2024",
                    description: "Ceci est la description de l'activité 1",
                    nb_place: 20,
                    supervisor: {
                        name: "Superviseur 1"
                    }
                },
                {
                    id: "2",
                    nom: "mais non",
                    type: "Type 2",
                    adresse: "456 Avenue de l'Avenue",
                    date_debut: "05/04/2024",
                    date_fin: "07/04/2024",
                    description: "Ceci est la description de l'activité 2",
                    nb_place: 15,
                    supervisor: {
                        name: null
                    }
                }
            ]
            var strBox = await affichageFormation(data);
            break;

        case "Demande en attente":
            //var data = await requestApiNoBody("GET", "/demande");
            var data = [
                {
                    "id": 1,
                    "type": "aide_administratif",
                    "demande": "Bonjour",
                    "id_user": 3,
                    "updated_at": "2024-02-22T10:08:55.000000Z",
                    "created_at": "2024-02-22T10:08:55.000000Z",
                    "etat" : "valider",
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
                    }
                },
                {
                    "id": 2,
                    "type": "navette",
                    "demande": "Bonjour fff",
                    "id_user": 3,
                    "updated_at": "2024-02-22T10:08:55.000000Z",
                    "created_at": "2024-02-22T10:08:55.000000Z",
                    "etat" : "valider",
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
                    }
                },
                {
                    "id": 2,
                    "type": "demande_benevole",
                    "demande": "Bonjour fff",
                    "id_user": 3,
                    "updated_at": "2024-02-22T10:08:55.000000Z",
                    "created_at": "2024-02-22T10:08:55.000000Z",
                    "etat" : "valider",
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
                    }
                }
            ]
            var strBox = await affichageDemande(data);
            break;

        case "Mes missions":
            //var data = await requestApiNoBody("GET", "/mission");
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
                        "type": "navette",
                        "etat": "fait",
                        "demande": "Bonjour",
                        "id_user": 3,
                        "updated_at": "2024-02-22T10:08:55.000000Z",
                        "created_at": "2024-02-22T10:08:55.000000Z"
                    }
                }
            ]
            var strBox = await affichageMesMission(data)
            break;

        case "Mes Formations":
            //var data = await requestApiNoBody("GET", "/formation");
            var data = ""
            var strBox = await affichageMesFormation(data)
            break;

        case "Evenement":
            //var data = await requestApiNoBody("GET", "/evenements");
            var data = [{
                "id": 1,
                "nom": "Gosse maraude",
                "description": "On attend le plus de monde paussible sur cette maraude a villetech",
                "date_debut": "2024-05-20",
                "date_fin": "2024-05-22",
                "type": "maraude",
                "etat": "ouvert",
                "adresse": "123 rue de l'IA",
                "ville": "VilleTech",
                "nb_participant" : 20
            },{
                "id": 2,
                "nom": "Anniversaire de l'asso",
                "description": "Deaj 1àans de l'association venez feter ca avec nous pour voous remercier de votre travail acharné",
                "date_debut": "2024-05-20",
                "date_fin": "2024-05-22",
                "type": "Anniversaire",
                "etat": "ouvert",
                "adresse": "123 rue de l'IA",
                "ville": "VilleTech",
                "nb_participant" : 30
            }]

            strBox = await affichageEvenement(data);
            break;

        default:
            break;
    }

    const affichageContainer = document.getElementById('container_2');
    affichageContainer.innerHTML = strBox;
    
    
}



async function updateProfil(){
    window.location.href ="../pages/modif_profil.php"
}



function getAllType(data){
    var allTypes = []
    for (i = 0; i < data.length; i++) {
        if(!(allTypes.includes(data[i].type))){
            allTypes.push(data[i].type)
        }
    }
    return allTypes
}