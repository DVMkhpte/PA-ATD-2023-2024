async function getInfoMyEvent(data){
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
        "       <button class=\"cancel\" onclick=\"cancelEvent(" + data.id + ")\">Annuler</button>\n" +
        "   </div>\n" +
        "</div>\n"
    return info
}


async function affichageMesEvent(data){
    var idU = localStorage.getItem("id")
    idU = parseInt(idU)

    var link = "/user/"+ idU +"/participationsE"
    var dataParticipation = await requestApiNoBody("GET", link);
    var myEvent = []
    for(i=0; i<dataParticipation.length; i++){
        if(dataParticipation[i].id_user === idU){
            myEvent.push(dataParticipation[i].id_evenement)
        }
    }

    var filtre =
        "<div class=\"filtre\">\n" +
        "   <div class=\"barre_de_recherche\">\n" +
        "       <input type=\"text\" id=\"search-event-input\" oninput=\"searchMyEvenement()\" placeholder=\"Evenements\">\n"+
        "   </div>\n"+
        "   <div class='div_riset'>" +
        "       <img src='../img/reset.png' onclick='affichageBenevole(\"Mes evenement\")'/>"+
        "   </div>"+
        "</div>"
    var allInfo = "<div id=\"all_info\">\n";
    var info = "";
    for(i=0; i<data.length; i++){
        if(myEvent.includes(data[i].id)) {
            info = await getInfoMyEvent(data[i])
            allInfo = allInfo.concat(info)
        }
    }
    allInfo = allInfo.concat("</div>")

    var affichage = filtre.concat(allInfo);
    return  affichage
}


async function searchMyEvenement(){
    var idU = localStorage.getItem("id")
    idU = parseInt(idU)

    var link = "/user/"+ idU +"/participationsE"
    var dataParticipation = await requestApiNoBody("GET", link);
    var myEvent = []
    for(i=0; i<dataParticipation.length; i++){
        if(dataParticipation[i].id_user === idU){
            myEvent.push(dataParticipation[i].id_evenement)
        }
    }


    console.log(myEvent)

    var dataEvent = await requestApiNoBody("GET", "/evenements");

    const input = document.getElementById('search-event-input');
    const search = input.value;

    var allInfo = ""
    const box = document.getElementById('all_info');
    box.innerHTML = "";
    var dataName = ""
    for(i=0; i<dataEvent.length; i++) {
        if(myEvent.includes(dataEvent[i].id)) {
            if (search.length > 0) {
                dataName = dataEvent[i].nom
                if (dataName.includes(search)) {
                    var info = await getInfoMyEvent(dataEvent[i])
                    allInfo = allInfo.concat(info)
                }
            } else {
                var info = await getInfoMyEvent(dataEvent[i])

                allInfo = allInfo.concat(info)
            }
        }
    }
    box.innerHTML = allInfo
}