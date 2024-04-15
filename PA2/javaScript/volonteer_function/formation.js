
async function affichageFormation(data){
    const allType = getAllType(data)

    var filtre =
        "<div class=\"filtre\">\n" +
        "   <div class=\"barre_de_recherche\">\n" +
        "       <input type=\"text\" id=\"search-formation-input\" oninput=\"searchFormation()\" placeholder=\"Formations\">\n"+
        "   </div>\n"+
        "   <div class=\"tout_les_filtre\">\n"

    var select =
        "       <select class=\"boutton\" name=\"trie\" id=\"trie\">\n" +
        "           <option selected disabled hidden id=\"choix\">Type</option>\n"

    for(j=0;j<allType.length;j++) {
        select = select.concat(
            "<option value='"+ allType[j] +"' onclick=\"trieF('"+ allType[j] +"')\">"+ allType[j] +"</option>"
        )

    }

    select = select.concat(
        "       </select>\n"
    )

    filtre = filtre.concat(select)

    filtre = filtre.concat(
        "   </div>\n" +
        "   <div class=\"button_filtre\">\n" +
        "       <button class=\"button_new\" onclick=\"add('addFormation.php')\">Nouveau</button>\n" +
        "   </div>\n" +
        "   <div class='div_riset'>" +
        "       <img src='../img/reset.png' onclick='affichageBenevole(\"Formations\")'/>"+
        "   </div>"+
        "</div>"
    )

    var allInfo = "<div class=\"all_info\">\n";
    var info = "";
    for(i=0; i<data.length; i++){
        info =
            "<div class=\"info\">\n" +
            "   <div class=\"description_general\">\n" +
            "       <div class=\"description_1\">\n" +
            "           <div class=\"description_1_1\">\n" +
            "               <div class=\"nom\">"+ data[i].nom +"</div>\n" +
            "               <div class=\"type\">"+ data[i].type +"</div>\n" +
            "           </div>\n" +
            "           <div class=\"description_1_2\">\n" +
            "               <div class=\"adresse\">"+ data[i].adresse +"</div>\n" +
            "           </div>\n" +
            "           <div class=\"description_1_3\">" +
            "                <div class=\"date\">du "+ data[i].date_debut +" a 19h30</div>\n" +
            "               <div class=\"date\">au "+ data[i].date_fin +" a 18h</div>\n" +
            "           </div>"+
            "       </div>\n" +
            "       <div class=\"description_2\">\n" +
            "           <div class=\"desription\">Desription : "+ data[i].description +"</div>\n" +
            "           <div class=\"superviser\">Supervisé par : "+ data[i].supervisor.name +"</div>\n" +
            "       </div>\n" +
            "   </div>\n" +
            "   <div class=\"option\">\n" +
            "       <button onclick=\"joinFormation("+ data[i].id +")\" class=\"inscription\" >Ce positionner</button>\n"

            if(data[i].supervisor.name == null){
                info = info.concat( "<button onclick=\"becomeSupervisorF("+ data[i].id +")\" class=\"inscription\" >Superviser</button>\n")
            }

        info = info.concat( "   </div>\n" +
                            "</div>")
        allInfo = allInfo.concat(info)
    }
    allInfo = allInfo.concat("</div>")

    var affichage = filtre.concat(allInfo);
    return affichage
}


async function joinFormation(idF){
    //const idU = localStorage.getItem("id")
    const idU = 1
    const formData = {
        "id_user": idU,
        "id_formation": idF
    }
    console.log(formData)
    /*
    try {
        const response = await requestApi(formData, "POST", "/participef/add");
        if (response.status === 200) {
            showAlert("Vous avez bien rejoint la formation!");
            affichageBenevole("Mes formations")
        } else {
            showAlert("Erreur : " + response.status);
        }
    } catch (error) {
        showAlert('Erreur lors de la requête à l\'API : ' + error.message);
    }
    */
}

async function becomeSupervisorF(idF){
    //const idU = localStorage.getItem("id")
    const idU = 1

    var newFormData = {
        "supervise_par": idU,
    }

    console.log(newFormData)
    /*
    try {
        const response = await requestApi(newFormData, "Pitch", "/formation/"+idF);
        if (response.status === 200) {
            showAlert("Vous estes le nouveau superviseur");
            affichageBenevole("Mes formations")
        } else {
            showAlert("Erreur : " + response.status);
        }
    } catch (error) {
        showAlert('Erreur lors de la requête à l\'API : ' + error.message);
    }
    */
}


async function affichageMesFormation(data){
    filtre =
        "<div class=\"filtre\">\n" +
        "   <div  class=\"barre_de_recherche\">\n" +
        "       <input type=\"text\" id=\"search-article-input\" placeholder=\"Formation\">\n" +
        "   </div>\n" +
        "   <div  class=\"tout_les_filtre\">\n" +
        "       <select class=\"boutton\" name=\"typeTrie\" id=\"trie\">\n" +
        "           <option selected disabled hidden id=\"choix\">Trier par Type</option>\n" +
        "           <option value=\"type1\" onclick=\"trie('nom', 'type')\">1</option>\n" +
        "           <option value=\"type2\" onclick=\"trie('type', 'type')\">2</option>\n" +
        "           <option value=\"type3\" onclick=\"trie('lieu', 'type')\">3</option>\n" +
        "           <option value=\"type4\" onclick=\"trie('date', 'type')\">4</option>\n" +
        "       </select>\n" +
        "   </div>\n" +
        "</div>" +
        "<div class=\"filtreCheckbox\">" +
        "   <div>"+
        "       <input type=\"checkbox\" id=\"formateur\" value=\"formateur\" onclick=\"trie('nom')\">\n" +
        "       <label for=\"type1\">Formateur</label>" +
        "   </div>"+
        "   <div>"+
        "       <input type=\"checkbox\" id=\"participation\" value=\"participation\" onclick=\"trie('nom')\">\n" +
        "       <label for=\"type1\">Participation</label>" +
        "   </div>" +
        "</div>"

    var affichage = filtre;
    return affichage
}