async function affichageDemande(){
    var form =
        "<div class=\"form_demande\">\n" +
        "   <form id=\"createForm\">\n" +
        "       <select class=\"input_form\" name=\"trie\" class=\"select_type\">\n" +
        "           <option selected disabled hidden id=\"type\" class=\"select_type\">Type de demande</option>\n" +
        "           <option value=\"type1\">Type 1</option>\n" +
        "           <option value=\"type2\">Type 2</option>\n" +
        "           <option value=\"type3\">Type 3</option>\n" +
        "           <option value=\"type4\">Type 4</option>\n" +
        "       </select>\n" +
        "       <textarea  class=\"input_form\" id=\"description\" type=\"text\" name=\"description\" placeholder=\"Description\" autocomplete=\"off\"></textarea>\n" +
        "       <button class=\"input_form\" id=\"valid\" onclick=\"newAsk("+ 1 +")\">Valider</button>\n" +
        "   </form>\n" +
        "</div>"

    return form
}

async function newAsk(){

    const type = document.getElementById('type').value;
    const description = document.getElementById('description').value;

    const formData = {
        type: type,
        description: description
    };

    console.log(formData)

    /*
    try {
        const response = await requestApi(formData, "POST", "/demande/add");
        if (response.status === 200) {
            showAlert("Création de l'utilisateur réussie !");
        } else {
            showAlert("Erreur lors de la création de la demande : " + response.status);
        }
    } catch (error) {
        showAlert('Erreur lors de la requête à l\'API : ' + error.message);
    }
    */

    await affichageBeneficiaire("Mes demande")

}


async function affichageMesDemande(data){
    var filtre =
        "<div class=\"filtre\">\n" +
        "   <div  class=\"barre_de_recherche\">\n" +
        "       <input type=\"text\" id=\"search-article-input\" placeholder=\"Demandes\">\n" +
        "   </div>\n" +
        "   <div  class=\"tout_les_filtre\">\n" +
        "       <select class=\"boutton\" name=\"trie\" id=\"trie\">\n" +
        "           <option selected disabled hidden id=\"choix\">Trier par</option>\n" +
        "           <option value=\"type\" onclick=\"trie(\"type\")\">Type</option>\n" +
        "           <option value=\"date\" onclick=\"trie(\"date\")\">Date</option>\n" +
        "       </select>\n" +
        "   </div>\n" +
        "</div>"

    var allInfo = "<div class=\"all_info\">\n";
    var info = "";
    for (i = 0; i < data.length; i++) {
        info =
            "   <div class=\"info\">\n" +
            "       <div class=\"description_general\">\n" +
            "           <div class=\"description_1\">\n" +
            "               <div class=\"type\">Type : " + data[i].type + "</div>\n" +
            "               <div class=\"date\">Fait le :"  + data[i].date +" </div>\n" +
            "           </div>\n" +
            "           <div class=\"description_2\">\n" +
            "               <p>" + data[i].demande + "</p>\n" +
            "           </div>\n" +
            "       </div>\n" +
            "       <div class=\"option\">\n" +
            "           <button class=\"supp\">Supprimer</button>\n" +
            "       </div>\n" +
            "    </div>\n"

        allInfo = allInfo.concat(info)
    }
    allInfo = allInfo.concat("</div>")

    var affichage = filtre.concat(allInfo);
    return affichage
}

