async function getInfoMyM(data){
    var info =
        "<div class=\"contener_1\">\n" +
        "   <div class=\"contener_2\">\n" +
        "       <div class=\"description_demande\">\n" +
        "           <div class=\"description1_demande\">\n" +
        "               <div class=\"type\">Type : " + data.demande.type + "</div>\n" +
        "               <div class=\"fait_par\">De : " + data.realiser_par + "</div>\n" +
        "               <div class=\"pour\">Pour : " + data.user.name + "</div>\n" +
        "               <div class=\"date\">Pour le : " + data.demande.date +"</div>\n" +
        "           </div>\n" +
        "           <div class=\"description2_demande\">\n" +
        "               <p>" + data.demande.demande + "</p>\n" +
        "               <div>Statut : "+ data.demande.etat +"</div>"+
        "           </div>\n" +
        "       </div>\n" +
        "       <div class=\"option\">\n" +
        "           <button class=\"annuler\" onclick='cancelMyMission("+ data.id +", "+ data.demande.id +")'>Annuler</button>\n" +
        "   </div>\n" +
        "</div>"

    return info
}



async function affichageMesMission(data) {
    var idU = localStorage.getItem("id")
    idU = parseInt(idU)

    var filtre =
        "<div class=\"filtre\">\n" +
        "   <div  class=\"tout_les_filtre\">\n"+
        "       <select class=\"boutton\" name=\"trie\" id=\"trie\">\n" +
        "           <option selected disabled hidden id=\"choix\">Type</option>\n"+
        "           <option value='en_cour' onclick='trieTypeM(\"aide_administratif\")'>Aide service administratif</option>" +
        "           <option value='valider' onclick='trieTypeM(\"navette\")'>Navette</option>" +
        "           <option value='en_attente_validation' onclick='trieTypeM(\"visite\")'>Visite</option>" +
        "           <option value='annule' onclick='trieTypeM(\"autre\")'>Autre</option>" +
        "       </select>\n"+
        "   </div>\n" +
        "   <div class='div_riset'>" +
        "       <img src='../img/reset.png' onclick='affichageBenevole(\"Mes missions\")'/>"+
        "   </div>"+
        "</div>"


    var allInfo = "<div id='allInfo'>";
    var info = "";
    for (i = 0; i < data.length; i++) {
        if(data[i].realiser_par === idU) {
            info = await getInfoMyM(data[i])
            allInfo = allInfo.concat(info)
        }
    }
    allInfo = allInfo.concat("</div>")

    var affichage = filtre.concat(allInfo);
    return affichage
}

async function cancelMyMission(idM, idD){
    var formDataDemande = {
        "etat": "valide"
    }

    try {
        const response = await requestApi(formDataDemande, "DELETE", "/missions/"+idM);
        if (response.status === 200) {
            showAlert("Mission annulé");
            affichageBenevole("Mes missions")
        } else {
            showAlert("Erreur : " + response.status);
        }
    } catch (error) {
        showAlert('Erreur lors de la requête à l\'API : ' + error.message);
    }

}

async function trieTypeM(filtre){
    var idU = localStorage.getItem("id")
    idU = parseInt(idU)

    var data = await requestApiNoBody("GET", "/missions");

    const box = document.getElementById('allInfo');
    box.innerHTML = "";

    console.log(filtre)

    var allInfo = ""
    for(i=0; i<data.length; i++) {
        console.log(data[i].demande.type)
        if (data[i].demande.type === filtre) {
            if(data[i].realiser_par === idUser) {
                var info = await getInfoMyM(data[i])
                allInfo = allInfo.concat(info)
            }
        }
    }
    box.innerHTML = allInfo

}