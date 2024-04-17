async function getInfoE(data){
    var info =
        "<div class=\"info\">\n" +
        "   <div class=\"description_general\">\n"+
        "       <div class=\"description_1\">\n" +
        "           <div class=\"description1_1\">\n" +
        "               <div class=\"nom\">" + data.nom + "</div>\n" +
        "               <div class=\"type\">" + data.type + "</div>\n" +
        "           </div>\n" +
        "           <div class=\"adresse\"> Au  "+ data.adresse + "</div>\n" +
        "       </div>\n" +
        "       <div class=\"description_2\">\n" +
        "           <p>Description: " + data.description + "</p>\n" +
        "           <div class=\"date\"> Du  " + data.date_debut + " au " + data.date_fin + "</div>\n" +
        "       </div>\n" +
        "   </div>"+
        "   <div class=\"option\">\n" +
        "       <button class=\"modif\" onclick=\"joinEvenement(" + data.id + ")\">j'en suis</button>\n" +
        "   </div>\n" +
        "</div>\n"


    return info
}

async function affichageEvenement(data){
    const allType = getAllType(data)

    var filtre =
        "<div class=\"filtre\">\n" +
        "   <div class=\"barre_de_recherche\">\n" +
        "       <input type=\"text\" id=\"search-event-input\" oninput=\"searchEvenement()\" placeholder=\"Evenement\">\n"+
        "   </div>\n"+
        "   <div class=\"tout_les_filtre\">\n"
    var select =
        "       <select class=\"boutton\" name=\"trie\" id=\"trie\">\n" +
        "           <option selected disabled hidden id=\"choix\">Type</option>\n"
    for(j=0;j<allType.length;j++) {
        select = select.concat(
            "<option value='"+ allType[j] +"' onclick=\"trieE('"+ allType[j] +"')\">"+ allType[j] +"</option>"
        )
    }
    select = select.concat(
        "       </select>\n"
    )
    filtre = filtre.concat(select)
    filtre = filtre.concat(
        "   </div>\n" +
        "   <div class='div_riset'>" +
        "       <img src='../img/reset.png' onclick='affichageBenevole(\"Evenement\")'/>"+
        "   </div>"+
        "</div>"
    )

    var allInfo = "<div id='all_info'>";
    var info = "";
    for (i = 0; i < data.length; i++) {
        var info = await getInfoE(data[i])

        allInfo = allInfo.concat(info)
    }
    allInfo = allInfo.concat("</div>")

    var affichage = filtre.concat(allInfo);


    return affichage
}


async function joinEvenement(idF){
    //const idU = localStorage.getItem("id")
    const idU = 1
    const formData = {
        "id_evenement": idF
    }
    /*
    try {
        const response = await requestApi(formData, "POST", "/participee/add");
        if (response.status === 200) {
            showAlert("Vous avez bien rejoint l'evenement'!");
            affichageBenevole("Mes evenements")
        } else {
            showAlert("Erreur : " + response.status);
        }
    } catch (error) {
        showAlert('Erreur lors de la requête à l\'API : ' + error.message);
    }
    */
}