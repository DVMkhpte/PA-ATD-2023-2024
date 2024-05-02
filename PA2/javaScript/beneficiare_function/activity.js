async function getInfoA(data){
    var info =
        "   <div class=\"info\">\n" +
        "       <div class=\"description_general\">\n" +
        "           <div class=\"description_1\">\n" +
        "               <div class=\"description_1_1\">\n" +
        "                   <div class=\"nom\">"+ data.nom +"</div>\n" +
        "               </div>\n" +
        "               <div class=\"description_1_2\">\n" +
        "                   <div class=\"acces\">"+ data.adresse +"</div>\n" +
        "               </div>\n" +
        "           </div>\n" +
        "           <div class=\"description_2\">\n" +
        "               <div class=\"desription\">Desription : "+ data.description +"</div>\n" +
        "               <div class=\"supervisor\">Supervisé par : "+ data.supervisor.nom +"</div>\n" +
        "               <div class=\"statut\">Du "+ data.date_debut +" au "+ data.date_fin +"</div>\n" +
        "           </div>\n" +
        "       </div>\n" +
        "       <div class=\"option\">\n" +
        "           <button onclick=\"joinActivity("+ data.id +",)\" class=\"inscription\">Inscription</button>\n" +
        "       </div>\n" +
        "   </div>\n"

    return info
}

async function affichageActivity(data){
    var filtre =
        "<div class=\"filtre\">\n" +
        "   <div  class=\"barre_de_recherche\">\n" +
        "       <input type=\"text\" id=\"search-activity-input\" oninput='searchActivity()' placeholder=\"Activitées\">\n" +
        "   </div>\n" +
        "   <div class='div_riset'>" +
        "       <img src='../img/reset.png' onclick='affichageBeneficiaire(\"Activitée\")'/>"+
        "   </div>"+
        "</div>"

    var allInfo = "<div id=\"all_info\">\n";
    var info = "";
    for (i = 0; i < data.length; i++) {
        info = await getInfoA(data[i])
        allInfo = allInfo.concat(info)
    }
    allInfo = allInfo.concat("</div>")

    var affichage = filtre.concat(allInfo);
    return affichage
}


async function joinActivity(idA){
    var idU = localStorage.getItem("id")
    idU = parseInt(idU)
    const formData = {
        "id_activite": idA
    }

    var link = "/user/"+ idU +"/participationsA"
    var dataP = await requestApiNoBody("GET", link);
    var participe = false
    for(i=0; i<dataP.length; i++){
        if(dataP[i].id_user === idU && dataP[i].id_activite === idA){
            participe = true
        }
    }
    if (participe === true){
        showAlert("Vous participez deja a cette activitée !");
        affichageBeneficiaire("Activitée")
    }else {
        try {
            const response = await requestApi(formData, "POST", "/participea/add");
            showAlert("Vous avez bien rejoint l'activité'");
        } catch (error) {
            showAlert('Erreur lors de la requête à l\'API : ' + error.message);
        }
    }
}



async function searchActivity() {
    var data = await requestApiNoBody("GET", "/activitees/");

    const input = document.getElementById('search-activity-input');
    const search = input.value;

    var allInfo = ""
    const box = document.getElementById('all_info');
    box.innerHTML = "";
    var dataName = ""
    for(i=0; i<data.length; i++) {
        if(search.length > 0) {
            dataName = data[i].nom
            if (dataName.includes(search)) {
                var info = await getInfoA(data[i])
                allInfo = allInfo.concat(info)
            }
        }else {
            var info = await getInfoA(data[i])
            allInfo = allInfo.concat(info)
        }
    }
    box.innerHTML = allInfo
}



async function infoMyActivity(data){
    var info =
        "   <div class=\"info\">\n" +
        "       <div class=\"description_general\">\n" +
        "           <div class=\"description_1\">\n" +
        "               <div class=\"description_1_1\">\n" +
        "                   <div class=\"nom\">"+ data.nom +"</div>\n" +
        "               </div>\n" +
        "               <div class=\"description_1_2\">\n" +
        "                   <div class=\"acces\">"+ data.adresse +"</div>\n" +
        "               </div>\n" +
        "           </div>\n" +
        "           <div class=\"description_2\">\n" +
        "               <div class=\"desription\">Desription : "+ data.description +"</div>\n" +
        "               <div class=\"supervisor\">Supervisé par : "+ data.supervisor.nom +"</div>\n" +
        "               <div class=\"statut\">Du "+ data.date_debut +" au "+ data.date_fin +"</div>\n" +
        "           </div>\n" +
        "       </div>\n" +
        "       <div class=\"option\">\n" +
        "           <button onclick=\"cancelMyParticipationA("+ data.id +",)\" class=\"inscription\">Annuler ma participation</button>\n" +
        "       </div>\n" +
        "   </div>\n"

    return info
}



async function affichageMesActivitee(dataActivity){
    var idU = localStorage.getItem("id")
    idU = parseInt(idU)

    var link = "/user/"+ idU +"/participationsA"
    var dataParticipation = await requestApiNoBody("GET", link);
    var myActivity = []
    for(i=0; i<dataParticipation.length; i++){
        if(dataParticipation[i].id_user === idU){
            myActivity.push(dataParticipation[i].id_activite)
        }
    }

    var filtre =
        "<div class=\"filtre\">\n" +
        "   <div  class=\"barre_de_recherche\">\n" +
        "       <input type=\"text\" id=\"search-myActivity-input\" placeholder=\"Activitées\">\n" +
        "   </div>\n" +
        "   <div class='div_riset'>" +
        "       <img src='../img/reset.png' onclick='affichageBeneficiaire(\"Mes Activité\")'/>"+
        "   </div>"+
        "</div>"

    var allInfo = "<div id=\"all_info\">\n";
    var info = "";
    for (i = 0; i < dataActivity.length; i++) {
        if(myActivity.includes(dataActivity[i].id)) {
            info = await infoMyActivity(dataActivity[i])
            allInfo = allInfo.concat(info)
        }
    }
    allInfo = allInfo.concat("</div>")

    var affichage = filtre.concat(allInfo);
    return affichage
}


async function cancelMyParticipationA(idA){
    var idU = localStorage.getItem("id")
    idU = parseInt(idU)

    var link = "/user/"+ idU +"/participationsA"
    var dataParticipation = await requestApiNoBody("GET", link);
    var idP = 0
    for(i=0; i<dataParticipation.length; i++){
        if(dataParticipation[i].id_user === idU && dataParticipation[i].id_activite === idA){
            idP = dataParticipation[i].id
        }
    }
    try {
        await requestApiNoBody("DELETE", "/participea/"+idP);
        showAlert("Participation annulé!");
    } catch (error) {
        showAlert('Erreur lors de la requête à l\'API : ' + error.message);
    }
    affichageBeneficiaire("Mes Activité")

}


async function serchMyActivity(){
    const idU = localStorage.getItem("id")

    var dataParticipation = await requestApiNoBody("GET", "/participea");
    var myActivity = []
    for(i=0; i<dataParticipation.length; i++){
        if(dataParticipation[i].id_user === idU){
            myActivity.push(dataParticipation[i].id_activite)
        }
    }

    var dataActivity = await requestApiNoBody("GET", "/activitees/");

    var allInfo = ""
    const box = document.getElementById('all_info');
    box.innerHTML = "";
    var dataName = ""
    for(i=0; i<data.length; i++) {
        if(myFormation.includes(dataActivity[i].id)) {
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