
async function affichageMission(data) {
    var filtre =
        "<div class=\"filtre\">\n" +
        "   <div  class=\"barre_de_recherche\">\n" +
        "       <input type=\"text\" id=\"search-article-input\" placeholder=\"Missions\">\n" +
        "   </div>\n" +
        "   <div  class=\"tout_les_filtre\">\n" +
        "       <select class=\"boutton\" name=\"trie\" id=\"trie\">\n" +
        "           <option selected disabled hidden id=\"choix\">Trier type</option>\n" +
        "           <option value=\"nom\" onclick=\"trie(\"nom\")\">Nom</option>\n" +
        "           <option value=\"prenom\" onclick=\"trie(\"type\")\">Type</option>\n" +
        "           <option value=\"acces\" onclick=\"trie(\"lieu\")\">Lieu</option>\n" +
        "           <option value=\"acces\" onclick=\"trie(\"date\")\">Date</option>\n" +
        "       </select>\n" +
        "   </div>\n" +
        "</div>"

    var allInfo = "<div class=\"all_info\">\n";
    var info = "";
    for(i=0; i<data.length; i++) {
        if(data[i].type !== "demande-benevole" && data[i].etat === "En attente") {
            info =
                "<div class=\"info\">\n" +
                "   <div class=\"description_general\">\n" +
                "       <div class=\"description_1\">\n" +
                "           <div class=\"description_1_1\">\n" +
                "               <div class=\"type\">" + data[i].type + "</div>\n" +
                "           </div>\n" +
                "           <div class=\"description_1_3\">" +
                "                <div class=\"date\">Fait le :" + data[i].created_at + "</div>\n" +
                "           </div>" +
                "       </div>\n" +
                "       <div class=\"description_2\">\n" +
                "           <div class=\"desription\">Desription : " + data[i].demande + "</div>\n" +
                "           <div class=\"desription\">Fait par : " + data[i].user.name + "</div>\n" +
                "       </div>\n" +
                "   </div>\n" +
                "   <div class=\"option\">\n" +
                "       <button onclick=\"acceptMission("+ data[i].id +")\" class=\"inscription\" >Je m'en charge</button>\n" +
                "   </div>\n" +
                "</div>"
            allInfo = allInfo.concat(info)
        }
    }
    allInfo = allInfo.concat("</div>")

    var affichage = filtre.concat(allInfo);
    return affichage
}


async function acceptMission(idD){
    var formDataMission = {
        "id_demande": idD
    }

    var formDataDemande
    /*
    try {
        const response = await requestApi(newFormData, "POST", "/missions/add");
        if (response.status === 200) {
            showAlert("Vous avez accepté cette mission avec succé!");
            affichageBenevole("Mes formations")
        } else {
            showAlert("Erreur : " + response.status);
        }
    } catch (error) {
        showAlert('Erreur lors de la requête à l\'API : ' + error.message);
    }
    */
}
