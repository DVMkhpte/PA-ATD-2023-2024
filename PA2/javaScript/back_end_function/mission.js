async function getInfoM(data){
    var info =
        "<div class=\"contener_1\">\n" +
        "   <div class=\"contener_2\">\n" +
        "       <div class=\"description_demande\">\n" +
        "           <div class=\"description1_demande\">\n" +
        "               <div class=\"type\">Type : " + data.demande.type + "</div>\n" +
        "               <div class=\"fait_par\">De : " + data.realiser_par + "</div>\n" +
        "               <div class=\"pour\">Pour : " + data.user.name + "</div>\n" +
        "               <div class=\"date\">Pour le :  + data[i].date + </div>\n" +
        "           </div>\n" +
        "           <div class=\"description2_demande\">\n" +
        "               <p>" + data.demande.demande + "</p>\n" +
        "               <div>Statut : "+ data.demande.etat +"</div>"+
        "           </div>\n" +
        "       </div>\n" +
        "       <div class=\"option\">\n" +
        "           <button class=\"annuler\" onclick='cancelMission("+ data.id +", "+ data.demande.id +")'>Annuler</button>\n" +
        "       </div>\n" +
        "   </div>\n" +
        "</div>"

    return info
}

async function affichageMission(data) {
    var filtre =
        "<div class=\"filtre\">\n" +
        "   <div  class=\"tout_les_filtre\">\n"+
        "       <select class=\"boutton\" name=\"trie\" id=\"trie\">\n" +
        "           <option selected disabled hidden id=\"choix\">Type</option>\n"+
        "           <option value='fait' onclick='trieTypeM(\"demande_benevole\")'>Demande bénévole</option>" +
        "           <option value='en_cour' onclick='trieTypeM(\"aide_administratif\")'>Aide service administratif</option>" +
        "           <option value='valider' onclick='trieTypeM(\"navette\")'>Navette</option>" +
        "           <option value='en_attente_validation' onclick='trieTypeM(\"visite\")'>Visite</option>" +
        "           <option value='annule' onclick='trieTypeM(\"autre\")'>Autre</option>" +
        "       </select>\n"+
        "   </div>\n" +
        "   <div class=\"tout_les_filtre\">" +
        "       <select class=\"boutton\" name=\"trie\" id=\"trie\">\n" +
        "           <option selected disabled hidden id=\"choix\">Statut</option>\n"+
        "           <option value='fait' onclick='trieStateM(\"fait\")'>Fait</option>" +
        "           <option value='en_cour' onclick='trieStateM(\"en cour\")'>En cour</option>" +
        "       </select>\n"+
        "   </div>" +
        "   <div class='div_riset'>" +
        "       <img src='../img/reset.png' onclick='affichageBackEnd(\"Missions\")'/>"+
        "   </div>"+
        "</div>"


    var allInfo = "<div id='allInfo'>";
    var info = "";
    for (i = 0; i < data.length; i++) {
        var info = await getInfoM(data[i])

        allInfo = allInfo.concat(info)
    }
    allInfo = allInfo.concat("</div>")

    var affichage = filtre.concat(allInfo);
    return affichage
}



async function cancelMission(idM, idD){
    var formDataDemande = {
        "etat": "valider"
    }

    /*
    try {
        const response = await requestApi(formDataDemande, "DELETE", "/missions/"+idM);
        if (response.status === 200) {
            try {
                const response = await requestApi(formDataDemande, "PITCH", "/demande"+idD);
                if (response.status === 200) {
                    showAlert("Mission annulé");
                    affichageBenevole("Mes missions")
                } else {
                    showAlert("Erreur : " + response.status);
                }
            } catch (error) {
                showAlert('Erreur lors de la requête à l\'API : ' + error.message);
            }
        } else {
            showAlert("Erreur : " + response.status);
        }
    } catch (error) {
        showAlert('Erreur lors de la requête à l\'API : ' + error.message);
    }
    */
}





async function trieTypeM(filtre){

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
    const box = document.getElementById('allInfo');
    box.innerHTML = "";

    console.log(filtre)

    var allInfo = ""
    for(i=0; i<data.length; i++) {
        console.log(data[i].demande.type)
        if (data[i].demande.type === filtre) {
            var info = await getInfoM(data[i])

            allInfo = allInfo.concat(info)
        }
    }
    box.innerHTML = allInfo

}

async function trieStateM(filtreEtat){
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

    const box = document.getElementById('allInfo');
    box.innerHTML = "";

    var allInfo = ""
    for(i=0; i<data.length; i++) {
        if (data[i].demande.etat === filtreEtat) {
            var info = await getInfoM(data[i])

            allInfo = allInfo.concat(info)
        }
    }
    box.innerHTML = allInfo
}