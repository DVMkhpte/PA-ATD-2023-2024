async function getInfoF(data, action){
    var info =
        "<div class=\"info\">\n" +
        "   <div class=\"description_general\">\n" +
        "       <div class=\"description_1\">\n" +
        "           <div class=\"description_1_1\">\n" +
        "               <div class=\"nom\">"+ data.nom +"</div>\n" +
        "           </div>\n" +
        "           <div class=\"description_1_2\">\n" +
        "               <div class=\"adresse\">"+ data.adresse +"</div>\n" +
        "           </div>\n"
    if(data.supervise_par !== null) {
        info += "<div class=\"superviser\">Supervisé par : " + data.supervisor.name + "</div>\n"
    }
    info+=
        "       </div>\n" +
        "       <div class=\"description_2\">\n" +
        "           <div class=\"desription\">Desription : "+ data.description +"</div>\n"+
        "           <div class=\"description_1_3\">" +
        "                <div class=\"date\">du "+ data.date_debut +" a 19h30</div>\n" +
        "               <div class=\"date\">au "+ data.date_fin +" a 18h</div>\n" +
        "           </div>"+
        "       </div>\n" +
        "   </div>\n" +
        "   <div class=\"option\">\n"
    if(action === "p") {
        info = info.concat(
            "       <button onclick=\"cancelMyParticipation(" + data.id + ")\" class=\"inscription\" >Annuler</button>\n")
    }
    info = info.concat(
        "   </div>\n" +
        "</div>")
    return info
}



async function affichageMesFormation(data){
    var affichage =
        "<div  class=\"filtre_formation\">\n" +
        "   <div class='tout_les_filtre'>"+
        "       <select class=\"boutton\" name=\"roleF\" id=\"roleF\">\n" +
        "           <option selected disabled hidden id=\"choix\">Mon role</option>\n" +
        "           <option value=\"type1\" onclick=\"formateur()\">Formateur</option>\n" +
        "           <option value=\"type2\" onclick=\"participantion()\">Participant</option>\n" +
        "       </select>\n" +
        "   </div>\n" +
        "</div>"+
        "<div id=\"all_info_formateur\">\n"+
        "</div>"

    return affichage
}

async function participantion(){
    var idU = localStorage.getItem("id")
    idU = parseInt(idU)

    var link = "/user/"+ idU +"/participationsF"
    var dataParticipation = await requestApiNoBody("GET", link);
    var myFormation = []
    for(i=0; i<dataParticipation.length; i++){
        if(dataParticipation[i].id_user === idU){
            myFormation.push(dataParticipation[i].id_formation)
        }
    }

    var dataFormation = await requestApiNoBody("GET", "/formations");
    const affichageInfo = document.getElementById('all_info_formateur');
    var filtre =
        "<div class=\"filtre\">\n" +
        "   <div class=\"barre_de_recherche\">\n" +
        "       <input type=\"text\" id=\"search-formation-input\" oninput=\"searchFormationParticipant()\" placeholder=\"Formations\">\n"+
        "   </div>\n"+
        "   <div class='div_riset'>" +
        "       <img src='../img/reset.png' onclick='formateur()'/>"+
        "   </div>"+
        "</div>"
    var allInfo = "<div id=\"all_info\">\n";
    var info = "";
    for(i=0; i<dataFormation.length; i++){
        if(myFormation.includes(dataFormation[i].id)) {
            info = await getInfoF(dataFormation[i], "p")
            allInfo = allInfo.concat(info)
        }
    }
    allInfo = allInfo.concat("</div>")

    var affichage = filtre.concat(allInfo);
    affichageInfo.innerHTML = affichage
}


async function cancelMyParticipation(idF){
    var idU = localStorage.getItem("id")
    idU = parseInt(idU)

    var link = "/user/"+ idU +"/participationsF"
    var dataParticipation = await requestApiNoBody("GET", link);
    var idP = 0
    for(i=0; i<dataParticipation.length; i++){
        if(dataParticipation[i].id_user === idU && dataParticipation[i].id_formation === idF){
            idP = dataParticipation[i].id
        }
    }
    console.log(idP)
    await requestApiNoBody("DELETE", "/participef/"+idP);
    participantion()

}

async function searchFormationParticipant(){
    var idU = localStorage.getItem("id")
    idU = parseInt(idU)

    var link = "/user/"+ idU +"/participationsF"
    var dataParticipation = await requestApiNoBody("GET", link);
    var myFormation = []
    for(i=0; i<dataParticipation.length; i++){
        console.log(dataParticipation[i].id_user)
        if(dataParticipation[i].id_user === idU){
            myFormation.push(dataParticipation[i].id_formation)
        }
    }

    var dataFormation = await requestApiNoBody("GET", "/formations");

    const input = document.getElementById('search-formation-input');
    const search = input.value;

    var allInfo = ""
    const box = document.getElementById('all_info');
    box.innerHTML = "";
    var dataName = ""
    for(i=0; i<data.length; i++) {
        if(myFormation.includes(dataFormation[i].id)) {
            if (search.length > 0) {
                dataName = dataFormation[i].nom
                if (dataName.includes(search)) {
                    var info = await getInfoF(dataFormation[i], "p")

                    allInfo = allInfo.concat(info)
                }
            } else {
                var info = await getInfoF(dataFormation[i], "p")

                allInfo = allInfo.concat(info)
            }
        }
    }
    box.innerHTML = allInfo
}








async function formateur(){
    var idU = localStorage.getItem("id")
    idU = parseInt(idU)

    const affichageInfo = document.getElementById('all_info_formateur');
    var data = await requestApiNoBody("GET", "/formations");

    var filtre =
        "<div class=\"filtre\">\n" +
        "   <div class=\"barre_de_recherche\">\n" +
        "       <input type=\"text\" id=\"search-formation-input\" oninput=\"searchFormationFormateur()\" placeholder=\"Formations\">\n"+
        "   </div>\n"+
        "   <div class='div_riset'>" +
        "       <img src='../img/reset.png' onclick='formateur()'/>"+
        "   </div>"+
        "</div>"
    var allInfo = "<div id=\"all_info\">\n";
    var info = "";
    for(i=0; i<data.length; i++){
        if(data[i].supervise_par === idU) {
            info = await getInfoF(data[i], "f")
            allInfo = allInfo.concat(info)
        }
    }
    allInfo = allInfo.concat("</div>")

    var affichage = filtre.concat(allInfo);
    affichageInfo.innerHTML = affichage

}


async function searchFormationFormateur(){
    var idU = localStorage.getItem("id")
    idU = parseInt(idU)

    var data = await requestApiNoBody("GET", "/formations");

    const input = document.getElementById('search-formation-input');
    const search = input.value;

    var allInfo = ""
    const box = document.getElementById('all_info');
    box.innerHTML = "";
    var dataName = ""
    for(i=0; i<data.length; i++) {
        if(data[i].supervise_par === idU) {
            if (search.length > 0) {
                dataName = data[i].nom
                if (dataName.includes(search)) {
                    var info = await getInfoF(data[i], "f")

                    allInfo = allInfo.concat(info)
                }
            } else {
                var info = await getInfoF(data[i], "f")

                allInfo = allInfo.concat(info)
            }
        }
    }
    box.innerHTML = allInfo
}