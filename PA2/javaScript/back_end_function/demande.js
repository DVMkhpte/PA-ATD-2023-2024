
function affichageDemande(data) {
    var filtre =
        "<div class=\"filtre\">\n" +
        "   <div  class=\"tout_les_filtre\">\n"+
        "       <select class=\"boutton\" name=\"trie\" id=\"trie\">\n" +
        "           <option selected disabled hidden id=\"choix\">Type</option>\n"+
        "           <option value='fait' onclick='trieTypeD(\"demande_benevole\")'>Demande bénévole</option>" +
        "           <option value='en_cour' onclick='trieTypeD(\"aide_administratif\")'>Aide service administratif</option>" +
        "           <option value='valider' onclick='trieTypeD(\"navette\")'>Navette</option>" +
        "           <option value='en_attente_validation' onclick='trieTypeD(\"visite\")'>Visite</option>" +
        "           <option value='annule' onclick='trieTypeD(\"autre\")'>Autre</option>" +
        "       </select>\n"+
        "   </div>\n" +
        "   <div class=\"tout_les_filtre\">" +
        "       <select class=\"boutton\" name=\"trie\" id=\"trie\">\n" +
        "           <option selected disabled hidden id=\"choix\">Statut</option>\n"+
        "           <option value='fait' onclick='trieStateD(\"fait\")'>Fait</option>" +
        "           <option value='en_cour' onclick='trieStateD(\"en cour\")'>En cour</option>" +
        "           <option value='valider' onclick='trieStateD(\"valider\")'>Valider</option>" +
        "           <option value='en_attente_validation' onclick='trieStateD(\"en attente\")'>En attente</option>" +
        "           <option value='annule' onclick='trieStateD(\"annule\")'>Annulé</option>" +
        "       </select>\n"+
        "   </div>" +
        "   <div class='div_riset'>" +
        "       <img src='../img/reset.png' onclick='affichageBackEnd(\"Demandes\")'/>"+
        "   </div>"+
        "</div>"


    var allInfo = "<div id='allInfo'>";
    var info = "";
    for (i = 0; i < data.length; i++) {
        info =
            "<div class=\"contener_1\">\n" +
            "   <div class=\"contener_2\">\n" +
            "       <div class=\"description_demande\">\n" +
            "           <div class=\"description1_demande\">\n" +
            "               <div class=\"type\">Type : " + data[i].type + "</div>\n" +
            "               <div class=\"fait_par\">De : " + data[i].user.name + "</div>\n" +
            "               <div class=\"date\">Fait le : " + data[i].created_at + "</div>\n" +
            "           </div>\n" +
            "           <div class=\"description2_demande\">\n" +
            "               <div>" + data[i].demande + "</div>\n" +
            "               <div>Statut : "+ data[i].etat +"</div>"+
            "           </div>\n" +
            "       </div>\n"

        var button =
        "       <div class=\"option\">\n"
        if(data[i].etat === "en attente"){
            button = button.concat(
                "           <button class=\"accepter\" onclick='validAsk("+ data[i].id +")'>Valider</button>\n" +
                "           <button class=\"annuler\" onclick='cancelAsk("+ data[i].id +")'>Annuler</button>\n" +
                "           <button class=\"supp\">Supprimer</button>\n" +
                "       </div>\n" +
                "    </div>\n" +
                "</div>"
            )
        }else if(data[i].etat === "en cour" || data[i].etat === "valider"){
            button = button.concat(
                "           <button class=\"annuler\" onclick='cancelAsk("+ data[i].id +")'>Annuler</button>\n" +
                "           <button class=\"supp\">Supprimer</button>\n" +
                "       </div>\n" +
                "    </div>\n" +
                "</div>"
            )
        }else{
            button = button.concat(
                "           <button class=\"supp\">Supprimer</button>\n" +
                "       </div>\n" +
                "    </div>\n" +
                "</div>"
            )
        }
        info = info.concat(button)
        allInfo = allInfo.concat(info)
    }
    allInfo = allInfo.concat("</div>")

    var affichage = filtre.concat(allInfo);
    return affichage
}



async function validAsk(id){
    //var data = await requestApiNoBody("GET", "/demande/"+ id);
    var data = { "id": 1, "type": "typetest", "demande": "Bonjour", "id_user": 3, "updated_at": "2024-02-22T10:08:55.000000Z","created_at": "2024-02-22T10:08:55.000000Z", "etat" : "fait","user": {"id": 3, "name": "Enzo","code_postal": 0,"ville": "","adresse": "", "num_telephone": 0,"email": "cocodoudo@gmail.com", "role": "admin","email_verified_at": null,"created_at": "2024-02-12T20:45:43.000000Z","updated_at": "2024-02-12T20:45:43.000000Z"}}

    var updateAsk = {
        "etat": "valider"
    }
    var newMission = {
        "id_demande": id
    }

    /*
    try {
        const response = await requestApi(updateAsk, "PITCH", "/demande/"+id);
        if (response.status === 200) {
            showAlert("Demande validé, maintenan visible pour les benenvoles");
        } else {
            showAlert("Erreur lors du changement de status: " + response.status);
        }
    } catch (error) {
        showAlert('Erreur lors de la requête à l\'API : ' + error.message);
    }
    */
}


async function cancelAsk(id){
    //var data = await requestApiNoBody("GET", "/demande/"+ id);
    var data = { "id": 1, "type": "typetest", "demande": "Bonjour", "id_user": 3, "updated_at": "2024-02-22T10:08:55.000000Z","created_at": "2024-02-22T10:08:55.000000Z", "etat" : "fait","user": {"id": 3, "name": "Enzo","code_postal": 0,"ville": "","adresse": "", "num_telephone": 0,"email": "cocodoudo@gmail.com", "role": "admin","email_verified_at": null,"created_at": "2024-02-12T20:45:43.000000Z","updated_at": "2024-02-12T20:45:43.000000Z"}}

    var formData = {
        "staut": "annuler"
    }

    /*
    try {
        const response = await requestApi(formData, "PITCH", "/demande/"+id);
        if (response.status === 200) {
            showAlert("Annulation de la demande!");
        } else {
            showAlert("Erreur lors du changement de status: " + response.status);
        }
    } catch (error) {
        showAlert('Erreur lors de la requête à l\'API : ' + error.message);
    }
    */

}


async function trieTypeD(filtre){
    //var data = await requestApiNoBody("GET", "/demande");
    var data = [
        {
            "id": 1,
            "type": "aide_administratif",
            "demande": "Bonjour",
            "id_user": 3,
            "updated_at": "2024-02-22T10:08:55.000000Z",
            "created_at": "2024-02-22T10:08:55.000000Z",
            "etat" : "fait",
            "user": {
                "id": 3,
                "name": "Enzo",
                "code_postal": 0,
                "ville": "",
                "adresse": "",
                "num_telephone": 0,
                "email": "cocodoudo@gmail.com",
                "role": "admin",
                "email_verified_at": null,
                "created_at": "2024-02-12T20:45:43.000000Z",
                "updated_at": "2024-02-12T20:45:43.000000Z"
            }
        },
        {
            "id": 2,
            "type": "navette",
            "demande": "Bonjour fff",
            "id_user": 3,
            "updated_at": "2024-02-22T10:08:55.000000Z",
            "created_at": "2024-02-22T10:08:55.000000Z",
            "etat" : "en cour",
            "user": {
                "id": 3,
                "name": "Enzo",
                "code_postal": 0,
                "ville": "",
                "adresse": "",
                "num_telephone": 0,
                "email": "cocodoudo@gmail.com",
                "role": "admin",
                "email_verified_at": null,
                "created_at": "2024-02-12T20:45:43.000000Z",
                "updated_at": "2024-02-12T20:45:43.000000Z"
            }
        },
        {
            "id": 2,
            "type": "demande_benevole",
            "demande": "Bonjour fff",
            "id_user": 3,
            "updated_at": "2024-02-22T10:08:55.000000Z",
            "created_at": "2024-02-22T10:08:55.000000Z",
            "etat" : "en attente",
            "user": {
                "id": 3,
                "name": "Enzo",
                "code_postal": 0,
                "ville": "",
                "adresse": "",
                "num_telephone": 0,
                "email": "cocodoudo@gmail.com",
                "role": "admin",
                "email_verified_at": null,
                "created_at": "2024-02-12T20:45:43.000000Z",
                "updated_at": "2024-02-12T20:45:43.000000Z"
            }
        }
    ]

    const box = document.getElementById('allInfo');
    box.innerHTML = "";

    var allInfo = ""
    for(i=0; i<data.length; i++) {
        console.log(data[i].type)
        if (data[i].type === filtre) {
            var info =
                "<div class=\"contener_1\">\n" +
                "   <div class=\"contener_2\">\n" +
                "       <div class=\"description_demande\">\n" +
                "           <div class=\"description1_demande\">\n" +
                "               <div class=\"type\">Type : " + data[i].type + "</div>\n" +
                "               <div class=\"fait_par\">De : " + data[i].user.name + "</div>\n" +
                "               <div class=\"date\">Fait le : " + data[i].created_at + "</div>\n" +
                "           </div>\n" +
                "           <div class=\"description2_demande\">\n" +
                "               <div>" + data[i].demande + "</div>\n" +
                "               <div>Statut : " + data[i].etat + "</div>" +
                "           </div>\n" +
                "       </div>\n"

            var button =
                "       <div class=\"option\">\n"
            if (data[i].etat === "en attente") {
                button = button.concat(
                    "           <button class=\"accepter\" onclick='acceptAsk(" + data[i].id + ")'>Accepter</button>\n" +
                    "           <button class=\"annuler\" onclick='cancelAsk(" + data[i].id + ")'>Annuler</button>\n" +
                    "           <button class=\"supp\">Supprimer</button>\n" +
                    "       </div>\n" +
                    "    </div>\n" +
                    "</div>"
                )
            } else if (data[i].etat === "en cour") {
                button = button.concat(
                    "           <button class=\"annuler\" onclick='cancelMission(" + data[i].id + ")'>Annuler</button>\n" +
                    "           <button class=\"supp\">Supprimer</button>\n" +
                    "       </div>\n" +
                    "    </div>\n" +
                    "</div>"
                )
            } else {
                button = button.concat(
                    "           <button class=\"supp\">Supprimer</button>\n" +
                    "       </div>\n" +
                    "    </div>\n" +
                    "</div>"
                )
            }
            info = info.concat(button)
            allInfo = allInfo.concat(info)
        }
    }
    box.innerHTML = allInfo

}


async function trieStateD(filtreEtat){

    //var data = await requestApiNoBody("GET", "/demande");
    var data = [{"id": 1,"type": "typetest","demande": "Bonjour", "id_user": 3,"updated_at": "2024-02-22T10:08:55.000000Z","created_at": "2024-02-22T10:08:55.000000Z", "etat" : "fait", "user": {"id": 3,"name": "Enzo","code_postal": 0,"ville": "","adresse": "","num_telephone": 0,"email": "cocodoudo@gmail.com", "role": "admin","email_verified_at": null,"created_at": "2024-02-12T20:45:43.000000Z","updated_at": "2024-02-12T20:45:43.000000Z" }}, { "id": 2,"type": "typetest2", "demande": "Bonjour fff","id_user": 3, "updated_at": "2024-02-22T10:08:55.000000Z","created_at": "2024-02-22T10:08:55.000000Z","etat" : "en cour","user": {"id": 3,"name": "Enzo","code_postal": 0,"ville": "","adresse": "","num_telephone": 0,"email": "cocodoudo@gmail.com","role": "admin","email_verified_at": null,"created_at": "2024-02-12T20:45:43.000000Z","updated_at": "2024-02-12T20:45:43.000000Z"}}, {"id": 2, "type": "typetest2","demande": "Bonjour fff", "id_user": 3,"updated_at": "2024-02-22T10:08:55.000000Z", "created_at": "2024-02-22T10:08:55.000000Z","etat" : "en attente","user": {"id": 3,"name": "Enzo","code_postal": 0,"ville": "","adresse": "","num_telephone": 0,"email": "cocodoudo@gmail.com","role": "admin","email_verified_at": null,"created_at": "2024-02-12T20:45:43.000000Z","updated_at": "2024-02-12T20:45:43.000000Z" } } ]

    const box = document.getElementById('allInfo');
    box.innerHTML = "";

    var allInfo = ""
    for(i=0; i<data.length; i++) {
        if (data[i].etat === filtreEtat) {
            var info =
                "<div class=\"contener_1\">\n" +
                "   <div class=\"contener_2\">\n" +
                "       <div class=\"description_demande\">\n" +
                "           <div class=\"description1_demande\">\n" +
                "               <div class=\"type\">Type : " + data[i].type + "</div>\n" +
                "               <div class=\"fait_par\">De : " + data[i].user.name + "</div>\n" +
                "               <div class=\"date\">Fait le : " + data[i].created_at + "</div>\n" +
                "           </div>\n" +
                "           <div class=\"description2_demande\">\n" +
                "               <div>" + data[i].demande + "</div>\n" +
                "               <div>Statut : " + data[i].etat + "</div>" +
                "           </div>\n" +
                "       </div>\n"

            var button =
                "       <div class=\"option\">\n"
            if (data[i].etat === "en attente") {
                button = button.concat(
                    "           <button class=\"accepter\" onclick='acceptAsk(" + data[i].id + ")'>Accepter</button>\n" +
                    "           <button class=\"annuler\" onclick='cancelAsk(" + data[i].id + ")'>Annuler</button>\n" +
                    "           <button class=\"supp\">Supprimer</button>\n" +
                    "       </div>\n" +
                    "    </div>\n" +
                    "</div>"
                );
            } else if (data[i].etat === "en cour") {
                button = button.concat(
                    "           <button class=\"annuler\" onclick='cancelMission(" + data[i].id + ")'>Annuler</button>\n" +
                    "           <button class=\"supp\">Supprimer</button>\n" +
                    "       </div>\n" +
                    "    </div>\n" +
                    "</div>"
                );
            } else {
                button = button.concat(
                    "           <button class=\"supp\">Supprimer</button>\n" +
                    "       </div>\n" +
                    "    </div>\n" +
                    "</div>"
                );
            }
            info = info.concat(button)
            allInfo = allInfo.concat(info)
        }
    }
    box.innerHTML = allInfo
}

