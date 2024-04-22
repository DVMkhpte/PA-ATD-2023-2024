async function affichageDemande(){
    var form =
        "<div class=\"form_demande\">\n" +
        "   <form id=\"createForm\">\n" +
        "       <select class=\"input_form\" name=\"trie\" class=\"select_type\">\n" +
        "           <option selected disabled hidden id=\"type\" class=\"select_type\">Type de demande</option>\n" +
        "           <option value=\"benevole\">Devenire bénévole</option>\n" +
        "           <option value=\"aide_administratif\">Aide service administratif</option>\n" +
        "           <option value=\"navette\">Navette</option>\n" +
        "           <option value=\"visite\">Visite</option>\n" +
        "           <option value=\"autre\">autre</option>\n" +
        "       </select>\n" +
        "       <textarea  class=\"input_form\" id=\"description\" type=\"text\" name=\"description\" placeholder=\"Description\" autocomplete=\"off\"></textarea>\n" +
        "       <button class=\"input_form\" id=\"valid\" onclick=\"newAsk("+ 1 +")\">Valider</button>\n" +
        "   </form>\n" +
        "</div>"

    return form
}

async function newAsk(){
    //const idU = localStorage.getItem("id")
    var idU = 2

    const type = document.getElementById('type').value;
    const description = document.getElementById('description').value;

    const formData = {
        type: type,
        description: description
    };

    console.log(formData)

    try {
        const response = await requestApi(formData, "POST", "/demande/add");
            showAlert("Création de la demande !");

    } catch (error) {
        showAlert('Erreur lors de la requête à l\'API : ' + error.message);
    }
    await affichageBeneficiaire("Mes demande")
}





async function infoMyD(data){
    var info =
        "   <div class=\"info\">\n" +
        "       <div class=\"description_general\">\n" +
        "           <div class=\"description_1\">\n" +
        "               <div class=\"type\">Type : " + data.type + "</div>\n" +
        "               <div class=\"type\">Etat : " + data.etat + "</div>\n" +
        "           </div>\n" +
        "           <div class=\"description_2\">\n" +
        "               <p>" + data.demande + "</p>\n" +
        "               <div class=\"date\">Fait le :"  + data.created_at +" </div>\n" +
        "           </div>\n" +
        "       </div>\n" +
        "       <div class=\"option\">\n" +
        "           <button class=\"supp\" onclick='suppMyAsk("+ data.id +")'>Supprimer</button>\n" +
        "       </div>\n" +
        "    </div>\n"
    console.log(info)

    return info
}


async function affichageMesDemande(){
    var data = await requestApiNoBody("GET", "/demande");
    //const idU = localStorage.getItem("id")
    var idU = 3

    var filtre =
        "<div class=\"filtre\">\n" +
        "   <div  class=\"tout_les_filtre\">\n" +
        "       <select class=\"boutton\" name=\"trie\" id=\"trie\">\n" +
        "           <option selected disabled hidden id=\"choix\">Type</option>\n"+
        "           <option value='fait' onclick='trieTypeMyD(\"demande_benevole\")'>Demande bénévole</option>" +
        "           <option value='en_cour' onclick='trieTypeMyD(\"aide_administratif\")'>Aide service administratif</option>" +
        "           <option value='valider' onclick='trieTypeMyD(\"navette\")'>Navette</option>" +
        "           <option value='en_attente_validation' onclick='trieTypeMyD(\"visite\")'>Visite</option>" +
        "           <option value='annule' onclick='trieTypeMyD(\"autre\")'>Autre</option>" +
        "       </select>\n"+
        "   </div>\n" +
        "   <div class='div_riset'>" +
        "       <img src='../img/reset.png' onclick='affichageBeneficiaire(\"Mes demande\")'/>"+
        "   </div>"+
        "</div>"

    var allInfo = "<div id=\"all_info\">\n";
    var info = "";
    for (i = 0; i < data.length; i++) {
        if(data[i].id_user === idU) {
            info = await infoMyD(data[i])
            allInfo = allInfo.concat(info)
        }
    }
    allInfo = allInfo.concat("</div>")

    var affichage = filtre.concat(allInfo);
    return affichage
}



async function suppMyAsk(id){
    try {
        const response = await requestApiNoBody("DELETE", "/demande/"+id);
        showAlert("Demande supprimé !");

    } catch (error) {
        showAlert('Erreur lors de la requête à l\'API : ' + error.message);
    }
    await affichageBeneficiaire("Mes demande")

}



async function trieTypeMyD(type){
    var data = await requestApiNoBody("GET", "/demande");
    //const idU = localStorage.getItem("id")
    var idU = 3

    const box = document.getElementById('all_info');
    box.innerHTML = "";

    var allInfo = ""
    for(i=0; i<data.length; i++) {
        if(data[i].id_user === idU) {
            if (data[i].type === type) {
                var info = await infoMyD(data[i])
                allInfo = allInfo.concat(info)
            }
        }
    }
    box.innerHTML = allInfo

}




