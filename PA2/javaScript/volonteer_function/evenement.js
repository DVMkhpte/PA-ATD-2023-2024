async function getInfoE(data){
    var info =
        "<div class=\"info\">\n" +
        "   <div class=\"description_general\">\n"+
        "       <div class=\"description_1\">\n" +
        "           <div class=\"description1_1\">\n" +
        "               <div class=\"nom\">" + data.nom + "</div>\n" +
        "               <div class=\"adresse\"> Au  "+ data.adresse + ", "+ data.ville +"</div>\n" +
        "               <div class=\"date\"> Du  " + data.date_debut + " au " + data.date_fin + "</div>\n" +
        "           </div>\n" +
        "       </div>\n" +
        "       <div class=\"description_2\">\n" +
        "           <div class=\"type\">Type : " + data.type + "</div>\n" +
        "           <p>Description: " + data.description + "</p>\n" +
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
            "<option value='"+ allType[j] +"' onclick=\"trieTypeE('"+ allType[j] +"')\">"+ allType[j] +"</option>"
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


async function joinEvenement(idE){
    //const idU = localStorage.getItem("id")
    const idU = 1
    const formData = {
        "id_evenement": idE
    }

    try {
        const response = await requestApi(formData, "POST", "/participee/add");
        showAlert("Vous avez bien rejoint l'evenement'!");
        affichageBenevole("Mes evenements")
    } catch (error) {
        showAlert('Erreur lors de la requête à l\'API : ' + error.message);
    }

}



async function trieTypeE(filtre){
    var data = await requestApiNoBody("GET", "/evenements");
    const box = document.getElementById('all_info');
    box.innerHTML = "";

    var allInfo = ""
    for(i=0; i<data.length; i++) {
        if (data[i].type === filtre) {
            var info = await getInfoE(data[i])
            allInfo = allInfo.concat(info)
        }
    }
    box.innerHTML = allInfo
}


async function searchEvenement() {
    var data = await requestApiNoBody("GET", "/evenements");

    const input = document.getElementById('search-event-input');
    const search = input.value;

    var allInfo = ""
    const box = document.getElementById('all_info');
    box.innerHTML = "";
    var dataName = ""
    for(i=0; i<data.length; i++) {
        if(search.length > 0) {
            dataName = data[i].nom
            if (dataName.includes(search)) {
                var info = await getInfoE(data[i])
                allInfo = allInfo.concat(info)
            }
        }else {
            var info = await getInfoE(data[i])
            allInfo = allInfo.concat(info)
        }
    }
    box.innerHTML = allInfo
}