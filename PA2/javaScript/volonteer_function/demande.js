async function getInfoD(data) {
    var info =
        "<div class=\"info\">\n" +
        "   <div class=\"description_general\">\n" +
        "       <div class=\"description_1\">\n" +
        "           <div class=\"description_1_1\">\n" +
        "               <div class=\"type\">Type : " + data.type + "</div>\n" +
        "           </div>\n" +
        "           <div class=\"description_1_3\">" +
        "                <div class=\"date\">Pour le : " + data.date + "</div>\n" +
        "           </div>" +
        "       </div>\n" +
        "       <div class=\"description_2\">\n" +
        "           <div class=\"desription\">Desription : " + data.demande + "</div>\n" +
        "           <div class=\"desription\">Fait par : " + data.user.name + "</div>\n" +
        "       </div>\n" +
        "   </div>\n" +
        "   <div class=\"option\">\n" +
        "       <button onclick=\"acceptMissionB(" + data.id + ")\" class=\"inscription\" >Je m'en charge</button>\n" +
        "   </div>\n" +
        "</div>"

    return info
}

async function affichageDemande(data) {
    var filtre =
        "<div class=\"filtre\">\n" +
        "   <div  class=\"tout_les_filtre\">\n"+
        "       <select class=\"boutton\" name=\"trie\" id=\"trie\">\n" +
        "           <option selected disabled hidden id=\"choix\">Type</option>\n"+
        "           <option value='en_cour' onclick='trieTypeD(\"aide_administratif\")'>Aide service administratif</option>" +
        "           <option value='valider' onclick='trieTypeD(\"navette\")'>Navette</option>" +
        "           <option value='en_attente_validation' onclick='trieTypeD(\"visite\")'>Visite</option>" +
        "           <option value='annule' onclick='trieTypeD(\"autre\")'>Autre</option>" +
        "       </select>\n"+
        "   </div>\n" +
        "   <div class='div_riset'>" +
        "       <img src='../img/reset.png' onclick='affichageBenevole(\"Demande en attente\")'/>"+
        "   </div>"+
        "</div>"

    var allInfo = "<div id=\"all_info\">\n";
    var info = "";
    for(i=0; i<data.length; i++) {
        if(data[i].type !== "demande_benevole" && data[i].etat === "valide") {
            info = await getInfoD(data[i])
            allInfo = allInfo.concat(info)
        }
    }
    allInfo = allInfo.concat("</div>")

    var affichage = filtre.concat(allInfo);
    return affichage
}




async function acceptMissionB(idD){

    var formDataMission= {
        "id_demande": idD
    }

    try {
        const responseM = await requestApi(formDataMission, "POST", "/missions/add");
        showAlert("Vous avez accepté cette demande avec succé!");
        affichageBenevole("Mes missions")
    } catch (error) {
        showAlert('Erreur lors de la requête à l\'API : ' + error.message);
    }
}


async function trieTypeD(filtre){
    var data = await requestApiNoBody("GET", "/demande");
    const box = document.getElementById('all_info');
    box.innerHTML = "";

    var allInfo = ""
    for(i=0; i<data.length; i++) {
        if(data[i].type !== "demande_benevole" && data[i].etat === "valide") {
            if (data[i].type === filtre) {
                var info = await getInfoD(data[i])
                allInfo = allInfo.concat(info)
            }
        }
    }
    box.innerHTML = allInfo
}
