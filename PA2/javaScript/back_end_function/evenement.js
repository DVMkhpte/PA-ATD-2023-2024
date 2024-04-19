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
        "               </div>\n" +
        "               <div class=\"adresse\"> Au  "+ data.adresse + ", "+ data.ville +"</div>\n" +
        "               <div class=\"date\"> Du  " + data.date_debut + " au " + data.date_fin + "</div>\n" +
        "           </div>\n" +
        "           <div class=\"description2_activitee\">\n" +
    "                   <div class=\"type\">Type : " + data.type + "</div>\n" +
        "               <p>Description: " + data.description + "</p>\n" +
        "               <div class=\"nb_place\">Nombre de participants : " + data.nb_participant + "</div>\n" +
        "               <div class=\"etat\">Etat : " + data.etat + "</div>\n" +
        "           </div>\n" +
        "       </div>\n" +
        "       <div class=\"option\">\n" +
        "           <button class=\"modif\" onclick=\"modifEvenement(" + data.id + ")\">Modifier evenement</button>\n" +
        "           <button class=\"voir\" onclick=\"voirParticipantE(" + data.id + ")\">Voir les participants</button>\n" +
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
    var data = await requestApiNoBody("GET", "/evenements/"+id)

    var allData = await requestApiNoBody("GET", "/evenements")
    const allType = getAllType(allData)

    var addInput = document.getElementById("evenement" +id)

    var input =
        "       <div class=\"description_activitee\">\n" +
        "           <div class=\"description1_activitee\">\n" +
        "               <div class=\"description1_1_activitee\">\n" +
        "                   <div class=\"nom\"> <input class=\"inputModif\" type=\"text\" id=\"nom\" value='" + data.nom + "' placeholder='" + data.nom + "'> </div>\n" +
        "               </div>\n" +
        "               <div class=\"adresse\"> Au <input class=\"inputModif\" type=\"text\" id=\"adresse\" value='" + data.adresse + "' placeholder='" + data.adresse + "'>, <input class=\"inputModif\" type=\"text\" id=\"ville\" value='" + data.ville + "' placeholder='" + data.ville + "'> </div>\n" +
        "               <div class=\"date\"> " +
        "                               Du <input class=\"inputModif\" type=\"date\" id=\"date_debut\" value='" + data.date_debut + "'> " +
        "                               au <input class=\"inputModif\" type=\"date\" id=\"date_fin\" value='" + data.date_fin + "'> " +
        "               </div>\n" +
        "           </div>\n" +
        "           <div class=\"description2_activitee\">\n" +
        "                   <div class=\"type\">Type :"
        var select =
            "       <select class=\"boutton\" name=\"type\" id=\"type\">\n" +
            "           <option selected disabled hidden id=\"choix\" value='"+ data.type +"'>"+ data.type +"</option>\n"
        for (i=0; i<allType.length; i++) {
            select += "<option value='" + allType[i] + "'>" + allType[i] + "</option>";
        }
        select = select.concat(
            "       </select>\n"
        )
        input = input.concat(select)
        input = input.concat(
        "               </div>"+
        "               <div>Description: </div><textarea class=\"inputModif\" type=\"text\" id=\"description\" placeholder='" + data.description + "'>" + data.description + "</textarea> \n" +
        "               <div class=\"type\">"+
        "                   <select class=\"boutton\" name=\"etat\" id=\"etat\">\n" +
        "                       <option selected disabled hidden id=\"choix\" value='"+ data.etat +"'>"+ data.etat +"</option>\n"+
        "                       <option value='ouvert'>Ouvert</option>"+
        "                       <option value='Fermer'>Fermer</option>"+
        "                   </select>\n"+
        "               </div>"+
        "           </div>"+
        "       </div>\n" +
        "       <div class=\"option\">\n" +
        "           <button class=\"modif\" onclick=\"validModifE(" + data.id + ")\">Valider</button>\n" +
        "           <button class=\"modif\" onclick=\"affichageBackEnd('Evenement')\">Annuler</button>\n" +
        "       </div>\n")



    addInput.innerHTML = input;
}

async function validModifE(id){
    var data = await requestApiNoBody("GET", "/evenements/"+id);
    console.log(data)

    const nom = document.getElementById('nom').value;
    const type = document.getElementById('type').value;
    const etat = document.getElementById('etat').value;
    const adresse  = document.getElementById('adresse').value;
    const ville = document.getElementById('ville').value;
    const date_debut = document.getElementById('date_debut').value;
    const date_fin = document.getElementById('date_fin').value;
    const description = document.getElementById('description').value;

    const formData = {
        nom: nom,
        description: description,
        type: type,
        adresse: adresse,
        ville: ville,
        etat: etat,
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
        const response = await requestApi(formData, "PATCH", "/evenements/"+id);
        showAlert("Modification de l'evenement effectué");
    } catch (error) {
        showAlert('Erreur lors de la requête à l\'API : ' + error.message);
    }

    await affichageBackEnd("Evenement")

}


async function voirParticipantE(idA){
    var data = await requestApiNoBody("GET", "/participee/");

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
        "                  <th>Prenom</th>" +
        "                <th>Role</th>" +
        "                 <th>Options</th>" +
        "               </tr>" +
        "         </thead>"
    var allParticipants ="<tbody>"
    var participant =""
    for (i = 0; i <data.length; i++) {
        if(data[i].id_evenement === idA) {
            participant =
                "<tr>" +
                "   <td>"+ data[i].user.name +"</td>" +
                "   <td>Titoaun</td>" +
                "   <td>"+ data[i].user.role +"</td>" +
                "   <td>" +
                "       <button class='suppParticipants' onclick=\"suppParticipantsE(" + data[i].id + ","+ idA +")\">Supp</button>" +
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
async function suppParticipantsE(idP, idE){
    const response = await requestApiNoBody("DELETE", "/participee/"+idP);
    voirParticipantE(idE)
}




async function searchEvenement() {
    var data = await requestApiNoBody("GET", "/evenements");

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
    var data = await requestApiNoBody("GET", "/evenements");
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