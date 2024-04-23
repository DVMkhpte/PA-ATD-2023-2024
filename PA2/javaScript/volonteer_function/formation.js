async function getInfoForm(data){
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
    if(data.supervise_par !== 0){
        info = info.concat(
            "<div class=\"superviser\">Supervisé par : "+ data.supervisor.nom +"</div>\n"
        )
    }
    info = info.concat(
        "       </div>\n" +
        "       <div class=\"description_2\">\n" +
        "           <div class=\"desription\">Desription : "+ data.description +"</div>\n"+
        "           <div class=\"description_1_3\">" +
        "                <div class=\"date\">du "+ data.date_debut +" a 19h30</div>\n" +
        "               <div class=\"date\">au "+ data.date_fin +" a 18h</div>\n" +
        "           </div>"+
        "       </div>\n" +
        "   </div>\n" +
        "   <div class=\"option\">\n" +
        "       <button onclick=\"joinFormation("+ data.id +")\" class=\"inscription\" >Ce positionner</button>\n"
    )
    if(data.supervise_par === 0) {
        info = info.concat(
            "<button onclick=\"becomeSupervisorF(" + data.id + ")\" class=\"inscription\" >Superviser</button>\n"
        )
    }
    info = info.concat( "   </div>\n" +
        "</div>")
    return info
}


async function affichageFormation(data){
    var filtre =
        "<div class=\"filtre\">\n" +
        "   <div class=\"barre_de_recherche\">\n" +
        "       <input type=\"text\" id=\"search-formation-input\" oninput=\"searchFormation()\" placeholder=\"Formations\">\n"+
        "   </div>\n"+
        "   <div class='div_riset'>" +
        "       <img src='../img/reset.png' onclick='affichageBenevole(\"Formation\")'/>"+
        "   </div>"+
        "</div>"
    var allInfo = "<div id=\"all_info\">\n";
    var info = "";
    for(i=0; i<data.length; i++){
        info = await getInfoForm(data[i])
        allInfo = allInfo.concat(info)
    }
    allInfo = allInfo.concat("</div>")

    var affichage = filtre.concat(allInfo);
    return affichage
}


async function joinFormation(idF){
    var idU = localStorage.getItem("id")
    idU = parseInt(idU)

    const formData = {
        "id_formation": idF
    }

    var link = "/user/"+ idU +"/participationsF"
    var dataP = await requestApiNoBody("GET", link);
    var participe = false
    for(i=0; i<dataP.length; i++){
        if(dataP[i].id_user === idU && dataP[i].id_formation === idF){ participe = true }
    }

    if (participe === true){
        showAlert("Vous participez deja a la formation !");
        await affichageBenevole("Formation")
    }else {
        try {
            const response = await requestApi(formData, "POST", "/participef/add");
                showAlert("Vous avez bien rejoint la formation!");
        } catch (error) {
            showAlert('Erreur lors de la requête à l\'API : ' + error.message);
        }
    }
}


async function becomeSupervisorF(idF){
    var idU = localStorage.getItem("id")
    idU = parseInt(idU)

    console.log(idF)
    var data = await requestApiNoBody("GET", "/formations/"+idF);
    const newFormData = {
        nom: data.nom,
        adresse: data.adresse,
        description: data.description,
        nb_place: data.nb_place,
        supervise_par: idU,
        date_debut: data.date_debut,
        date_fin: data.date_fin
    };

    try {
        const response = await requestApi(newFormData, "PATCH", "/formations/"+idF);
            showAlert("Vous estes le nouveau superviseur");
    } catch (error) {
        showAlert('Erreur lors de la requête à l\'API : ' + error.message);
    }
    affichageBenevole("Mes formations")
}



async function searchFormation() {
    var data = await requestApiNoBody("GET", "/formations");

    const input = document.getElementById('search-formation-input');
    const search = input.value;

    var allInfo = ""
    const box = document.getElementById('all_info');
    box.innerHTML = "";
    var dataName = ""
    for(i=0; i<data.length; i++) {

        if(search.length > 0) {
            dataName = data[i].nom
            if (dataName.includes(search)) {
                var info = await getInfoF(data[i])

                allInfo = allInfo.concat(info)
            }
        }else {
            var info = await getInfoF(data[i])

            allInfo = allInfo.concat(info)
        }
    }
    box.innerHTML = allInfo
}
