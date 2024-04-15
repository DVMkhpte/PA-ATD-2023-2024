
async function affichageBackEnd(affichage) {
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
            //var data = await requestApiNoBody("GET", "/users/")
            var data = [{
                "id": 1,
                "name": "ff",
                "code_postal": 91330,
                "ville": "yerres",
                "adresse": "affichage",
                "num_phone": "1234567891",
                "email": "test@test.fr",
                "role": "benevole",
                "email_verified": "False",
            },
                {
                    "id": 2,
                    "name": "ff",
                    "code_postal": 91330,
                    "ville": "yerres",
                    "adresse": "affichage",
                    "num_phone": "1234567891",
                    "email": "test@test.fr",
                    "role": "benevole",
                    "email_verified": "False",
                }
            ];
            strBox = await affichageUser(data, "benevole");

            break;

        case 'Bénéficiaires':
            //var data = await requestApiNoBody(, "GET", "/users/");
            var data = [{
                "id": 1,
                "name": "ff",
                "code_postal": 91330,
                "ville": "yerres",
                "adresse": "affichage",
                "num_phone": "1234567891",
                "email": "test@test.fr",
                "role": "beneficiaire",
                "email_verified": "False",
            },
                {
                    "id": 2,
                    "name": "ff",
                    "code_postal": 91330,
                    "ville": "yerres",
                    "adresse": "affichage",
                    "num_phone": "1234567891",
                    "email": "test@test.fr",
                    "role": "beneficiaire",
                    "email_verified": "False",
                }
            ];
            strBox = await affichageUser(data, "beneficiaire");

            break;

        case 'Activitées':
            //var data = await requestApiNoBody("GET", "/activitees/");
            var data = [
                {
                    id: 1,
                    nom: "Activité 1",
                    adresse: "123 Rue de la Rue",
                    date_debut: "01/04/2024",
                    date_fin: "03/04/2024",
                    description: "Ceci est la description de l'activité 1",
                    nb_place: 20,
                    superviser_par: { name: "Superviseur 1" }
                },
                {
                    id: 2,
                    nom: "Activité 2",
                    adresse: "456 Avenue de l'Avenue",
                    date_debut: "05/04/2024",
                    date_fin: "07/04/2024",
                    description: "Ceci est la description de l'activité 2",
                    nb_place: 15,
                    superviser_par: { name: "Superviseur 2" }
                },
                {
                    id: 3,
                    nom: "Activité 3",
                    adresse: "789 Boulevard du Boulevard",
                    date_debut: "10/04/2024",
                    date_fin: "12/04/2024",
                    description: "Ceci est la description de l'activité 3",
                    nb_place: 25,
                    superviser_par: { name: "Superviseur 3" }
                }
            ];
            strBox = await affichageActivitee(data);
            break;

        case 'Formations':
            //var data = await requestApiNoBody("GET", "/formations");
            var data = [
                {
                    "id": "1",
                    "nom": "si mais",
                    "type": "Type 1",
                    "adresse": "123 Rue de la Rue",
                    "date_debut": "01/04/2024",
                    "date_fin": "03/04/2024",
                    "description": "Ceci est la description de l'activité 1",
                    "nb_place": 20,
                    "supervisor": {
                        "name": "Superviseur 1"
                    }
                },
                {
                    "id": "2",
                    "nom": "mais non",
                    "type": "Type 2",
                    "adresse": "456 Avenue de l'Avenue",
                    "date_debut": "05/04/2024",
                    "date_fin": "07/04/2024",
                    "description": "Ceci est la description de l'activité 2",
                    "nb_place": 15,
                    "supervisor": {
                        "name": "Superviseur 2"
                    }
                }
            ]
            var strBox = await affichageFormation(data);
            break;

        case 'Demandes':
            //var data = await requestApiNoBody("GET", "/demande");
            var data = [
                {
                    "id": 1,
                    "type": "aide_administratif",
                    "demande": "Bonjour",
                    "id_user": 3,
                    "updated_at": "2024-02-22T10:08:55.000000Z",
                    "created_at": "2024-02-22T10:08:55.000000Z",
                    "etat" : "fait",
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
                    "etat" : "en cour",
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
                    "etat" : "en attente",
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
            strBox = await affichageDemande(data);
            break;

        case 'Missions':
            //var data = await requestApiNoBody("GET", "/missions");
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
            strBox = await affichageMission(data);
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

    const affichageBoxAdmin = document.getElementById('box');
    affichageBoxAdmin.innerHTML = strBox;

}


async function voirParticipant(id, link){
    var fetchLink = link + id
    //var data = await requestApiNoBody("GET", fetchLink);

    let idEvent = "participation"+id
    const participation = document.getElementById(idEvent)
    participation.innerHTML = ""

    var head =
        "<div class=\"all_participants\">" +
        "   <div class=\"title\">"+
        "       <h3>Participants</h3>" +
        "       <button class='hide' onclick='hide(\"participation" +id +"\")'>Cacher</button>" +
        "   </div>" +
        "   <div class=\"tabParticipants\">" +
        "       <table>" +
        "           <thead>" +
        "               <tr>" +
        "                   <th>Nom</th>" +
        "                  <th>Prenom</th>" +
        "                <th>Role</th>" +
        "                 <th>Options</th>" +
        "               </tr>" +
        "         </thead>"

    var allParticipants ="<tbody>"
    var participant =""
    for (i = 0; i < 10; i++) {

        participant =
            "<tr>" +
            "   <td>Chauche</td>" +
            "   <td>Titoaun</td>" +
            "   <td>Admin</td>" +
            "   <td>" +
            "       <button class='suppParticipants' onclick=\"suppParticipants(" + id + ", " + link + ")\">Supp</button>" +
            "   </td>" +
            "</tr>"

        allParticipants = allParticipants.concat(participant)
    }
    allParticipants = allParticipants.concat(
        "           </tbody>"+
        "       </table>" +
        "</div>" +
        "</div>")

    var affichage = head.concat(allParticipants)
    participation.innerHTML = affichage
}


async function updateRoleUser(id, role){
    var fomrData =
    {
        "role": role
    }

    /*
    try {
        const response = await requestApi(formData, "PITCH", "/users/"+id);
        if (response.status === 200) {
            showAlert("Changement de role effectué");
        } else {
            showAlert("Erreur lors du changement de role: " + response.status);
        }
    } catch (error) {
        showAlert('Erreur lors de la requête à l\'API : ' + error.message);
    }
    */

}


async function suppParticipants(id, link){
    var fetchlink = link + id
    //var data = await requestApiNoBody("DEL", fetchLink);
}

function add(link){
    window.location.href ="../pages/newPage/" + link
}

function hide(id){
    const hideDive = document.getElementById(id)
    hideDive.innerHTML = ""
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

function  getAllUserNameByRole(role){
    //var data = await requestApiNoBody("GET", "/users/")
    var data = [{
        "id": 1,
        "name": "Titouan",
        "code_postal": 91330,
        "ville": "yerres",
        "adresse": "affichage",
        "num_phone": "1234567891",
        "email": "test@test.fr",
        "role": "benevole",
        "email_verified": "False",
    },
        {
            "id": 2,
            "name": "Chauché",
            "code_postal": 91330,
            "ville": "yerres",
            "adresse": "affichage",
            "num_phone": "1234567891",
            "email": "test@test.fr",
            "role": "beneficiaire",
            "email_verified": "False",
        },
        {
            "id": 3,
            "name": "Broooooooooooooooo",
            "code_postal": 91330,
            "ville": "yerres",
            "adresse": "affichage",
            "num_phone": "1234567891",
            "email": "test@test.fr",
            "role": "benevole",
            "email_verified": "False",
        }
    ];

    var userNameList = {}
    for(i=0;i<data.length;i++) {
        if (data[i].role === role){
           userNameList[data[i].id] = data[i].name
        }
    }
    console.log(userNameList)
    return userNameList
}

