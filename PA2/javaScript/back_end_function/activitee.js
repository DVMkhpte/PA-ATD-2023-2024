async function getInfoA(data){
    var info =
        "<div class=\"contener_1\">\n" +
        "   <div class=\"contener_2\" id=\"activite"+data.id+"\">\n" +
        "       <div class=\"participation\" id=\"participation"+ data.id +"\">" +
        "       </div>" +
        "       <div class=\"description_activitee\">\n" +
        "           <div class=\"description1_activitee\">\n" +
        "               <div class=\"description1_1_activitee\">\n" +
        "                   <div class=\"nom\">" + data.nom + "</div>\n" +
        "               </div>\n" +
        "               <div class=\"adresse\"> Au "  + data.adresse + "</div>\n" +
        "                   <div class=\"date\">Du " + data.date_debut + " au " + data.date_fin + "</div>\n" +
        "               </div>\n" +
        "               <div class=\"description2_activitee\">\n" +
        "                   <p>Description: " + data.description + "</p>\n" +
        "                   <div class=\"superviserPar\">Superviser Par : " + data.superviser_par.name + "</div>\n" +
        "                   <div class=\"nb_plae\">Place restante : " + data.nb_place + "</div>\n" +
        "               </div>\n" +
        "           </div>\n" +
        "           <div class=\"option\">\n" +
        "               <button class=\"modif\" onclick=\"modifActivite(" + data.id + ")\">Modifier l'activité</button>\n" +
        "               <button class=\"voir\" onclick=\"voirParticipantA(" + data.id + ", '/participea/')\">Voir les participants</button>\n" +
        "               <button class=\"supp\" onclick='suppActivity("+ data.id +")'>Supprimer</button>\n" +
        "           </div>\n" +
        "       </div>\n" +
        "   </div>"

    return info
}

async function affichageActivitee(data) {

    var filtre =
        "<div class=\"filtre\">\n" +
        "   <div  class=\"barre_de_recherche\">\n" +
        "       <input type=\"text\" id=\"search-activity-input\" placeholder=\"Activitées\" oninput='searchActivity()'>\n" +
        "   </div>\n" +
        "   <div class=\"button_filtre\">\n" +
        "       <button class=\"button_new\" onclick='add(\"addActivitee.php\")'>Nouveau</button>\n" +
        "   </div>\n" +
        "   <div class='div_riset'>" +
        "       <img src='../img/reset.png' onclick='affichageBackEnd(\"Activitées\")'/>"+
        "   </div>"+
        "</div>"


    var allInfo = "<div id='allInfo'>";
    var info = "";
    for (i = 0; i < data.length; i++) {
        info = await getInfoA(data[i])
        allInfo = allInfo.concat(info)
    }
    allInfo = allInfo.concat("</div>")
    var affichage = filtre.concat(allInfo);
    return affichage
}


async function modifActivite(id){
    var data = await requestApiNoBody("GET", "/activitees/"+id)
    var userNameList = await getAllUserNameByRole("benevole")
    var addInput = document.getElementById("activite" +id)

    var input =
        "       <div class=\"description_activitee\">\n" +
        "           <div class=\"description1_activitee\">\n" +
        "               <div class=\"description1_1_activitee\">\n" +
        "                   <div class=\"nom\"> <input class=\"inputModif\" type=\"text\" id=\"nom\" value='" + data.nom + "' placeholder='" + data.nom + "'> </div>\n" +
        "               </div>\n" +
        "                   <div class=\"adresse\"> Au <input class=\"inputModif\" type=\"text\" id=\"adresse\" value='" + data.adresse + "' placeholder='" + data.adresse + "'> </div>\n" +
        "                   <div class=\"date\"> " +
        "                               Du <input class=\"inputModif\" type=\"datetime-local\" id=\"date_debut\" value='" + data.date_debut + "'> " +
        "                               au <input class=\"inputModif\" type=\"datetime-local\" id=\"date_fin\" value='" + data.date_fin + "'> " +
        "                   </div>\n" +
        "               </div>\n" +
        "               <div class=\"description2_activitee\">\n" +
        "                   <div>Description: </div><textarea class=\"inputModif\" type=\"text\" id=\"description\" placeholder='" + data.description + "'>" + data.description + "</textarea> \n" +
        "                   <div class=\"superviserPar\">Superviser Par : "
    var select =
        "       <select class=\"boutton\" name=\"supervisor\" id=\"supervisorId\">\n" +
        "           <option selected disabled hidden id=\"choix\" value='"+ data.supervisor.id +"' >"+ data.supervisor.name +"</option>\n"
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
        "                   </div>"+
        "                   <div class=\"nb_plae\">Place restante : <input class=\"inputModif\" type=\"number\" id=\"nb_place\" value='" + data.nb_place + "' placeholder='" + data.nom + "'></div>\n" +
        "               </div>\n" +
        "           </div>\n" +
        "           <div class=\"option\">\n" +
        "               <button class=\"modif\" onclick=\"validModif(" + data.id + ")\">Valider</button>\n" +
        "               <button class=\"modif\" onclick=\"affichageBackEnd('Activitées')\">Annuler</button>\n" +
        "           </div>\n"
    )

    addInput.innerHTML = input;
}

async function validModif(id){
    var data = await requestApiNoBody("GET", "/activitees/"+id);

    const nom = document.getElementById('nom').value;
    const date_debut = document.getElementById('date_debut').value;
    const date_fin = document.getElementById('date_fin').value;
    const description = document.getElementById('description').value;
    const nb_place = document.getElementById('nb_place').value
    const supervisorId = document.getElementById('supervisorId').value

    const formData = {
        nom: nom,
        description: description,
        nb_place: nb_place,
        superviser_par: supervisorId,
    };
    if(date_debut === ""){
        formData.date_debut = data.date_debut
    }else{
        formData.date_debut = date_debut
    }
    if(date_fin === ""){
        formData.date_fin = data.date_fin
    }else{
        formData.date_fin = date_fin
    }
    console.log(formData)
    try {
        const response = await requestApi(formData, "PATCH", "/activitees/"+id);
        showAlert("Activité modifier!");
    } catch (error) {
        showAlert('Erreur lors de la requête à l\'API : ' + error.message);
    }
    await affichageBackEnd("Activitées")
}




async function suppActivity(idA){
    var dataParticipation = await requestApiNoBody("GET", "/participea")
    var idP = 0
    for(i=0; i<dataParticipation.length; i++){
        idP = dataParticipation[i].id_activite
        if(idP === idA){
            const responseSuppP = await requestApiNoBody("DELETE", "/participea/"+idP);
        }
    }
    const responseSuppA = await requestApiNoBody("DELETE", "/activitees/"+idA);
    showAlert("Activitée Supprimé!");
    affichageBackEnd("Activitées")
}





async function voirParticipantA(idA){
    var data = await requestApiNoBody("GET", "/participea/");

    let idEvent = "participation"+idA
    const participation = document.getElementById(idEvent)

    var head =
        "<div class=\"all_participants\">" +
        "   <div class=\"title\">"+
        "       <h3>Participants</h3>" +
        "       <button class='hide' onclick='hide(\"participation" +idA +"\")'>Cacher</button>" +
        "   </div>" +
        "   <div class=\"tabParticipants\">" +
        "       <table>" +
        "           <thead>" +
        "               <tr>" +
        "                   <th>Nom</th>" +
        "                <th>Role</th>" +
        "                 <th>Options</th>" +
        "               </tr>" +
        "         </thead>"
    var allParticipants ="<tbody>"
    var participant =""
    for (i = 0; i <data.length; i++) {
        if(data[i].id_activite === idA) {
            participant =
                "<tr>" +
                "   <td>"+ data[i].user.name +"</td>" +
                "   <td>"+ data[i].user.role +"</td>" +
                "   <td>" +
                "       <button class='suppParticipants' onclick=\"suppParticipantsA(" + data[i].id + ","+ idA +")\">Supp</button>" +
                "   </td>" +
                "</tr>"
            allParticipants = allParticipants.concat(participant)
        }
    }
    allParticipants = allParticipants.concat(
        "           </tbody>"+
        "       </table>" +
        "</div>" +
        "</div>")
    var affichage = head.concat(allParticipants)
    participation.innerHTML = affichage
}
async function suppParticipantsA(idP, idA){
    const response = await requestApiNoBody("DELETE", "/participea/"+idP);
    voirParticipantA(idA)
}




async function searchActivity() {
    var data = await requestApiNoBody("GET", "/activitees/");

    const input = document.getElementById('search-activity-input');
    const search = input.value;

    var allInfo = ""
    const box = document.getElementById('allInfo');
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