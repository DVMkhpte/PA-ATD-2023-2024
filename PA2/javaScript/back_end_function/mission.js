async function getInfoM(data){
    var idBeneficiaire = data.demande.id
    console.log(idBeneficiaire)
    var dataBeneficiaire = await requestApiNoBody("GET", "/users/"+idBeneficiaire);
    var info =
        "<div class=\"contener_1\">\n" +
        "   <div class=\"contener_2\">\n" +
        "       <div class=\"description_demande\">\n" +
        "           <div class=\"description1_demande\">\n" +
        "               <div class=\"type\">Type : " + data.demande.type + "</div>\n" +
        "               <div class=\"fait_par\">De : " + dataBeneficiaire.name + "</div>\n" +
        "               <div class=\"pour\">Pour : " + data.user.name + "</div>\n" +
        "               <div class=\"date\">Pour le : " + data.demande.date + "</div>\n" +
        "           </div>\n" +
        "           <div class=\"description2_demande\">\n" +
        "               <p>" + data.demande.demande + "</p>\n" +
        "               <div class=\"date\">Au : " + data.demande.adresse + "</div>\n" +
        "               <div>Statut : "+ data.demande.etat +"</div>"+
        "           </div>\n" +
        "       </div>\n" +
        "       <div class=\"option\">\n"
    if(data.demande.etat=== "a valider"){
        info +=  "<button class=\"accepter\" onclick='valideMission("+ data.demande.id +")'>Valider mission</button>\n"
    }
    info +=
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
        "           <option value='en_cour' onclick='trieTypeM(\"aide_service_administratif\")'>Aide service administratif</option>" +
        "           <option value='valider' onclick='trieTypeM(\"demande_navette\")'>Navette</option>" +
        "           <option value='en_attente_validation' onclick='trieTypeM(\"demande_visite\")'>Visite</option>" +
        "           <option value='annule' onclick='trieTypeM(\"autre\")'>Autre</option>" +
        "       </select>\n"+
        "   </div>\n" +
        "   <div class=\"tout_les_filtre\">" +
        "       <select class=\"boutton\" name=\"trie\" id=\"trie\">\n" +
        "           <option selected disabled hidden id=\"choix\">Statut</option>\n"+
        "           <option value='en_cour' onclick='trieStateD(\"a valider\")'>A valider</option>" +
        "           <option value='en_cour' onclick='trieStateM(\"en cours\")'>En cours</option>" +
        "           <option value='fait' onclick='trieStateM(\"fait\")'>Fait</option>" +
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




async function valideMission(idD){
    var data = await requestApiNoBody("GET", "/demande/"+ idD);

    var formData = {
        "type": data.type,
        "demande": data.demande,
        "permis": data.permis,
        "etat": "en cours",
        "date": data.date
    }

    try {
        const response = await requestApi(formData, "PATCH", "/demande/"+idD);
        showAlert("Demande valide, maintenan visible pour les benenvoles");
        affichageBackEnd("Missions")

    } catch (error) {
        showAlert('Erreur lors de la requête à l\'API : ' + error.message);
    }
}



async function cancelMission(idM, idD){
    var data = await requestApiNoBody("GET", "/demande/"+ idD);
    var formDataDemande = {
        "type": data.type,
        "demande": data.demande,
        "permis": data.permis,
        "etat": "valide",
        "date": data.date
    }
        const response = await requestApiNoBody("DELETE", "/missions/"+idM);
        try {
            const response = await requestApi(formDataDemande, "PATCH", "/demande/"+idD);
                showAlert("Mission annulé" + response.status);
                showAlert("Erreur dans le changement d'etat: " + response.status);
        } catch (error) {
            showAlert('Erreur lors de la requête à l\'API : ' + error.message);
        }
        affichageBackEnd("Missions")


}

async function trieTypeM(filtre){
    var data = await requestApiNoBody("GET", "/missions");
    const box = document.getElementById('allInfo');
    box.innerHTML = "";

    var allInfo = ""
    for(i=0; i<data.length; i++) {
        if (data[i].demande.type === filtre) {
            var info = await getInfoM(data[i])
            allInfo = allInfo.concat(info)
        }
    }
    box.innerHTML = allInfo
}

async function trieStateM(filtreEtat){
    var data = await requestApiNoBody("GET", "/missions");
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