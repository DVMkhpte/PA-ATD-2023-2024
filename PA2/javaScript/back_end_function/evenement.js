async function getInfoE(data){
    var info =
        "<div class=\"contener_1\">\n" +
        "   <div class=\"contener_2\"  id=\"evenement"+data.id+"\">\n" +
        "       <div class=\"participation\" id=\"participation"+ data.id +"\">" +
        "       </div>" +
        "       <div class=\"description_activitee\">\n" +
        "           <div class=\"description1_activitee\">\n" +
        "               <div class=\"description1_1_activitee\">\n" +
        "                   <div class=\"nom\">" + data.nom + "</div>\n" +
        "                   <div class=\"type\">" + data.type + "</div>\n" +
        "               </div>\n" +
        "               <div class=\"adresse\"> Au  "+ data.adresse + "</div>\n" +
        "               <div class=\"date\"> Du  " + data.date_debut + " au " + data.date_fin + "</div>\n" +
        "           </div>\n" +
        "           <div class=\"description2_activitee\">\n" +
        "               <p>Description: " + data.description + "</p>\n" +

        "               <div class=\"nb_plae\">Nombre de participants : " + data.nb_participant + "</div>\n" +
        "           </div>\n" +
        "       </div>\n" +
        "       <div class=\"option\">\n" +
        "           <button class=\"modif\" onclick=\"modifEvenement(" + data.id + ")\">Modifier evenement</button>\n" +
        "           <button class=\"voir\" onclick=\"voirParticipant(" + data.id + ", '/participeE/')\">Voir les participants</button>\n" +
        "           <button class=\"supp\">Supprimer</button>\n" +
        "       </div>\n" +
        "   </div>\n" +
        "</div>"

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
        "   <div class=\"button_filtre\">\n" +
        "       <button class=\"button_new\" onclick=\"add('addEvenement.php')\">Nouveau</button>\n" +
        "   </div>\n" +
        "   <div class='div_riset'>" +
        "       <img src='../img/reset.png' onclick='affichageBackEnd(\"Evenement\")'/>"+
        "   </div>"+
        "</div>"
    )

    var allInfo = "<div id='allInfo'>";
    var info = "";
    for (i = 0; i < data.length; i++) {
        var info = await getInfoE(data[i])

        allInfo = allInfo.concat(info)
    }
    allInfo = allInfo.concat("</div>")

    var affichage = filtre.concat(allInfo);


    return affichage
}



async function modifEvenement(id){
    //var data = await requestApiNoBody("GET", "/evenements/"+id)
    var data =
        {
            "id": 1,
            "nom": "Gosse maraude",
            "description": "On attend le plus de monde paussible sur cette maraude a villetech",
            "date_debut": "2024-05-20",
            "date_fin": "2024-05-22",
            "type": "maraude",
            "etat": "ouvert",
            "adresse": "123 rue de l'IA",
            "ville": "VilleTech",
            "nb_participant" : 20
        }

    var userNameList = getAllUserNameByRole("benevole")
    var addInput = document.getElementById("evenement" +id)

    var input =
        "       <div class=\"description_activitee\">\n" +
        "           <div class=\"description1_activitee\">\n" +
        "               <div class=\"description1_1_activitee\">\n" +
        "                   <div class=\"nom\"> <input class=\"inputModif\" type=\"text\" id=\"nom\" value='" + data.nom + "' placeholder='" + data.nom + "'> </div>\n" +
        "                   <div class=\"type\"> <input class=\"inputModif\" type=\"text\" id=\"type\" value='" + data.type + "' placeholder='" + data.type + "'> </div>\n" +
        "               </div>\n" +
        "               <div class=\"adresse\"> Au <input class=\"inputModif\" type=\"text\" id=\"adresse\" value='" + data.adresse + "' placeholder='" + data.adresse + "'> </div>\n" +
        "               <div class=\"date\"> " +
        "                               Du <input class=\"inputModif\" type=\"date\" id=\"date_debut\" value='" + data.date_debut + "'> " +
        "                               au <input class=\"inputModif\" type=\"date\" id=\"date_fin\" value='" + data.date_fin + "'> " +
        "               </div>\n" +
        "           </div>\n" +
        "           <div class=\"description2_activitee\">\n" +
        "               <div>Description: </div><textarea class=\"inputModif\" type=\"text\" id=\"description\" placeholder='" + data.description + "'>" + data.description + "</textarea> \n" +
        "           </div>"+
        "       </div>\n" +
        "       <div class=\"option\">\n" +
        "           <button class=\"modif\" onclick=\"validModifE(" + data.id + ")\">Valider</button>\n" +
        "           <button class=\"modif\" onclick=\"affichageBackEnd('Evenement')\">Annuler</button>\n" +
        "       </div>\n"


    addInput.innerHTML = input;
}

async function validModifE(id){
    const nom = document.getElementById('nom').value;
    const type = document.getElementById('type').value;
    const adresse  = document.getElementById('adresse').value;
    const date_debut = document.getElementById('date_debut').value;
    const date_fin = document.getElementById('date_fin').value;
    const description = document.getElementById('description').value;
    const nb_place = document.getElementById('nb_place').value
    const supervisorId = document.getElementById('supervisorId').value

    const formData = {
        nom: nom,
        type: type,
        adresse: adresse,
        date_debut: date_debut,
        date_fin: date_fin,
        description: description,
        nb_place: nb_place,
        supervise_par: supervisorId,

    };

    console.log(formData)

    /*
    try {
        const response = await requestApi(formData, "POST", "/formations/"+id);
        if (response.status === 200) {
            showAlert("Création de l'utilisateur réussie !");
        } else {
            showAlert("Erreur lors de la création de la demande : " + response.status);
        }
    } catch (error) {
        showAlert('Erreur lors de la requête à l\'API : ' + error.message);
    }
    */

    await affichageBackEnd("Formations")

}




async function searchEvenement() {
    //var data = await requestApiNoBody("GET", "/demande");
    var data = [{
        "nom": "Gosse maraude",
        "description": "On attend le plus de monde paussible sur cette maraude a villetech",
        "date_debut": "2024-05-20",
        "date_fin": "2024-05-22",
        "type": "maraude",
        "etat": "ouvert",
        "adresse": "123 rue de l'IA",
        "ville": "VilleTech",
        "nb_participant" : 20
    },{
        "nom": "Anniversaire de l'asso",
        "description": "Deaj 1àans de l'association venez feter ca avec nous pour voous remercier de votre travail acharné",
        "date_debut": "2024-05-20",
        "date_fin": "2024-05-22",
        "type": "Anniversaire",
        "etat": "ouvert",
        "adresse": "123 rue de l'IA",
        "ville": "VilleTech",
        "nb_participant" : 30
    }]

    const input = document.getElementById('search-event-input');
    const search = input.value;

    var allInfo = ""
    const box = document.getElementById('allInfo');
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



async function trieE(filtre) {
    //var data = await requestApiNoBody("GET", "/demande");
    var data = [{
        "nom": "Gosse maraude",
        "description": "On attend le plus de monde paussible sur cette maraude a villetech",
        "date_debut": "2024-05-20",
        "date_fin": "2024-05-22",
        "type": "maraude",
        "etat": "ouvert",
        "adresse": "123 rue de l'IA",
        "ville": "VilleTech",
        "nb_participant" : 20
    },{
        "nom": "Anniversaire de l'asso",
        "description": "Deaj 1àans de l'association venez feter ca avec nous pour voous remercier de votre travail acharné",
        "date_debut": "2024-05-20",
        "date_fin": "2024-05-22",
        "type": "Anniversaire",
        "etat": "ouvert",
        "adresse": "123 rue de l'IA",
        "ville": "VilleTech",
        "nb_participant" : 30
    }]

    const box = document.getElementById('allInfo');
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