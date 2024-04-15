
async function affichageFormation(data) {
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
        "       <img src='../img/reset.png' onclick='affichageBackEnd(\"Formations\")'/>"+
        "   </div>"+
        "</div>"
    )




    var allInfo = "<div id='allInfo'>";
    var info = "";
    for (i = 0; i < data.length; i++) {
        info =
            "<div class=\"contener_1\">\n" +
            "   <div class=\"contener_2\"  id=\"formation"+data[i].id+"\">\n" +
            "       <div class=\"participation\" id=\"participation"+ data[i].id +"\">" +
            "       </div>" +
            "       <div class=\"description_activitee\">\n" +
            "           <div class=\"description1_activitee\">\n" +
            "               <div class=\"description1_1_activitee\">\n" +
            "                   <div class=\"nom\">" + data[i].nom + "</div>\n" +
            "                   <div class=\"type\">" + data[i].type + "</div>\n" +
            "               </div>\n" +
            "               <div class=\"adresse\"> Au  "+ data[i].adresse + "</div>\n" +
            "               <div class=\"date\"> Du  " + data[i].date_debut + " au " + data[i].date_fin + "</div>\n" +
            "           </div>\n" +
            "           <div class=\"description2_activitee\">\n" +
            "               <p>Description: " + data[i].description + "</p>\n" +
            "               <div class=\"superviserPar\">Superviser Par : " + data[i].supervisor.name + "</div>\n" +
            "               <div class=\"nb_plae\">Place restante : " + data[i].nb_place + "</div>\n" +
            "           </div>\n" +
            "       </div>\n" +
            "       <div class=\"option\">\n" +
            "           <button class=\"modif\" onclick=\"modifFormation(" + data[i].id + ")\">Modifier la formation</button>\n" +
            "           <button class=\"voir\" onclick=\"voirParticipant(" + data[i].id + ", '/participef/')\">Voir les participants</button>\n" +
            "           <button class=\"supp\">Supprimer</button>\n" +
            "       </div>\n" +
            "   </div>\n" +
            "</div>"

        allInfo = allInfo.concat(info)
    }
    allInfo = allInfo.concat("</div>")

    var affichage = filtre.concat(allInfo);


    return affichage
}


async function modifFormation(id){
    //var data = await requestApiNoBody("GET", "/formations/"+id)
    var data =
        {
            id: "1",
            nom: "si mais",
            type: "Type 1",
            adresse: "123 Rue de la Rue",
            date_debut: "01/04/2024",
            date_fin: "03/04/2024",
            description: "Ceci est la description de l'activité 1",
            nb_place: 20,
            supervisor: {
                name: "Superviseur 1"
            }
        }

    var userNameList = getAllUserNameByRole("benevole")
    var addInput = document.getElementById("formation" +id)

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
    "               <div class=\"superviserPar\">Superviser Par :"

    var select =
        "       <select class=\"boutton\" name=\"supervisor\" id=\"supervisorId\">\n" +
        "           <option selected disabled hidden id=\"choix\">"+ data.supervisor.name +"</option>\n"

    for(var key in userNameList){
        select = select.concat(
            "<option value='"+ key +"' \">"+ userNameList[key] +"</option>"
        )
    }

    select = select.concat(
        "       </select>\n"
    )

    input = input.concat(select)

    input = input.concat(
    "               </div>\n" +
    "               <div class=\"nb_plae\">Place restante : <input class=\"inputModif\" type=\"number\" id=\"nb_place\" value='" + data.nb_place + "' placeholder='" + data.nom + "'></div>\n" +
    "           </div>\n" +
    "       </div>\n" +
    "       <div class=\"option\">\n" +
    "           <button class=\"modif\" onclick=\"validModif(" + data.id + ")\">Valider</button>\n" +
    "           <button class=\"modif\" onclick=\"affichageBackEnd('Formations')\">Annuler</button>\n" +
    "       </div>\n"
    )

    addInput.innerHTML = input;
}

async function validModif(id){
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

async function searchFormation() {
    //var data = await requestApiNoBody("GET", "/formations");
    var data = [
        {
            "id": "1",
            "nom": "si mais",
            "type": "Type 1",
            "adresse": "123 Rue de la Rue",
            "date_debut": "01/04/2024",
            "date_fin": "03/04/2024",
            "description": "Ceci est la description de l'activité 1",
            "nb_place": 20,
            "supervisor": {
                "name": "Superviseur 1"
            }
        },
        {
            "id": "2",
            "nom": "mais non",
            "type": "Type 2",
            "adresse": "456 Avenue de l'Avenue",
            "date_debut": "05/04/2024",
            "date_fin": "07/04/2024",
            "description": "Ceci est la description de l'activité 2",
            "nb_place": 15,
            "supervisor": {
                "name": "Superviseur 2"
            }
        }
    ]

    const input = document.getElementById('search-formation-input');
    const search = input.value;

    var allInfo = ""
    const box = document.getElementById('allInfo');
    box.innerHTML = "";
    var dataName = ""
    for(i=0; i<data.length; i++) {

        if(search.length > 0) {
            dataName = data[i].nom
            if (dataName.includes(search)) {
                info =
                    "<div class=\"contener_1\">\n" +
                    "   <div class=\"contener_2\"  id=\"formation" + data[i].id + "\">\n" +
                    "       <div class=\"participation\" id=\"participation" + data[i].id + "\">" +
                    "       </div>" +
                    "       <div class=\"description_activitee\">\n" +
                    "           <div class=\"description1_activitee\">\n" +
                    "               <div class=\"description1_1_activitee\">\n" +
                    "                   <div class=\"nom\">" + data[i].nom + "</div>\n" +
                    "                   <div class=\"type\">" + data[i].type + "</div>\n" +
                    "               </div>\n" +
                    "               <div class=\"adresse\"> Au  " + data[i].adresse + "</div>\n" +
                    "               <div class=\"date\"> Du  " + data[i].date_debut + " au " + data[i].date_fin + "</div>\n" +
                    "           </div>\n" +
                    "           <div class=\"description2_activitee\">\n" +
                    "               <p>Description: " + data[i].description + "</p>\n" +
                    "               <div class=\"superviserPar\">Superviser Par : " + data[i].supervisor.name + "</div>\n" +
                    "               <div class=\"nb_plae\">Place restante : " + data[i].nb_place + "</div>\n" +
                    "           </div>\n" +
                    "       </div>\n" +
                    "       <div class=\"option\">\n" +
                    "           <button class=\"modif\" onclick=\"modifFormation(" + data[i].id + ")\">Modifier la formation</button>\n" +
                    "           <button class=\"voir\" onclick=\"voirParticipant(" + data[i].id + ", '/participef/')\">Voir les participants</button>\n" +
                    "           <button class=\"supp\">Supprimer</button>\n" +
                    "       </div>\n" +
                    "   </div>\n" +
                    "</div>"

                allInfo = allInfo.concat(info)
            }
        }else {
            info =
                "<div class=\"contener_1\">\n" +
                "   <div class=\"contener_2\"  id=\"formation"+data[i].id+"\">\n" +
                "       <div class=\"participation\" id=\"participation"+ data[i].id +"\">" +
                "       </div>" +
                "       <div class=\"description_activitee\">\n" +
                "           <div class=\"description1_activitee\">\n" +
                "               <div class=\"description1_1_activitee\">\n" +
                "                   <div class=\"nom\">" + data[i].nom + "</div>\n" +
                "                   <div class=\"type\">" + data[i].type + "</div>\n" +
                "               </div>\n" +
                "               <div class=\"adresse\"> Au  "+ data[i].adresse + "</div>\n" +
                "               <div class=\"date\"> Du  " + data[i].date_debut + " au " + data[i].date_fin + "</div>\n" +
                "           </div>\n" +
                "           <div class=\"description2_activitee\">\n" +
                "               <p>Description: " + data[i].description + "</p>\n" +
                "               <div class=\"superviserPar\">Superviser Par : " + data[i].supervisor.name + "</div>\n" +
                "               <div class=\"nb_plae\">Place restante : " + data[i].nb_place + "</div>\n" +
                "           </div>\n" +
                "       </div>\n" +
                "       <div class=\"option\">\n" +
                "           <button class=\"modif\" onclick=\"modifFormation(" + data[i].id + ")\">Modifier la formation</button>\n" +
                "           <button class=\"voir\" onclick=\"voirParticipant(" + data[i].id + ", '/participef/')\">Voir les participants</button>\n" +
                "           <button class=\"supp\">Supprimer</button>\n" +
                "       </div>\n" +
                "   </div>\n" +
                "</div>"

            allInfo = allInfo.concat(info)
        }
    }
    box.innerHTML = allInfo
}

function trieF(filtre) {
    //var data = await requestApiNoBody("GET", "/formations");
    var data = [
        {
            "id": "1",
            "nom": "si mais",
            "type": "Type 1",
            "adresse": "123 Rue de la Rue",
            "date_debut": "01/04/2024",
            "date_fin": "03/04/2024",
            "description": "Ceci est la description de l'activité 1",
            "nb_place": 20,
            "supervisor": {
                "name": "Superviseur 1"
            }
        },
        {
            "id": "2",
            "nom": "mais non",
            "type": "Type 2",
            "adresse": "456 Avenue de l'Avenue",
            "date_debut": "05/04/2024",
            "date_fin": "07/04/2024",
            "description": "Ceci est la description de l'activité 2",
            "nb_place": 15,
            "supervisor": {
                "name": "Superviseur 2"
            }
        }
    ]

    const box = document.getElementById('allInfo');
    box.innerHTML = "";

    var allInfo = ""
    for(i=0; i<data.length; i++) {
        if (data[i].type === filtre) {
            info =
                "<div class=\"contener_1\">\n" +
                "   <div class=\"contener_2\"  id=\"formation" + data[i].id + "\">\n" +
                "       <div class=\"participation\" id=\"participation" + data[i].id + "\">" +
                "       </div>" +
                "       <div class=\"description_activitee\">\n" +
                "           <div class=\"description1_activitee\">\n" +
                "               <div class=\"description1_1_activitee\">\n" +
                "                   <div class=\"nom\">" + data[i].nom + "</div>\n" +
                "                   <div class=\"type\">" + data[i].type + "</div>\n" +
                "               </div>\n" +
                "               <div class=\"adresse\"> Au  " + data[i].adresse + "</div>\n" +
                "               <div class=\"date\"> Du  " + data[i].date_debut + " au " + data[i].date_fin + "</div>\n" +
                "           </div>\n" +
                "           <div class=\"description2_activitee\">\n" +
                "               <p>Description: " + data[i].description + "</p>\n" +
                "               <div class=\"superviserPar\">Superviser Par : " + data[i].supervisor.name + "</div>\n" +
                "               <div class=\"nb_plae\">Place restante : " + data[i].nb_place + "</div>\n" +
                "           </div>\n" +
                "       </div>\n" +
                "       <div class=\"option\">\n" +
                "           <button class=\"modif\" onclick=\"modifFormation(" + data[i].id + ")\">Modifier la formation</button>\n" +
                "           <button class=\"voir\" onclick=\"voirParticipant(" + data[i].id + ", '/participef/')\">Voir les participants</button>\n" +
                "           <button class=\"supp\">Supprimer</button>\n" +
                "       </div>\n" +
                "   </div>\n" +
                "</div>"

            allInfo = allInfo.concat(info)
        }
    }
    box.innerHTML = allInfo
}




