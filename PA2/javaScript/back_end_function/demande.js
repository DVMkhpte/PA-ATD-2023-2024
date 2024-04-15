
function affichageDemande(data) {
    const allType = getAllType(data)
    var filtre =
        "<div class=\"filtre\">\n" +
        "   <div  class=\"tout_les_filtre\">\n"

    var select =
        "       <select class=\"boutton\" name=\"trie\" id=\"trie\">\n" +
        "           <option selected disabled hidden id=\"choix\">Type</option>\n"

    for(j=0;j<allType.length;j++) {
        select = select.concat(
            "<option value='"+ allType[j] +"' onclick=\"trieD('"+ allType[j] +"')\">"+ allType[j] +"</option>"
        )
    }
    select = select.concat(
        "       </select>\n"
    )

    filtre = filtre.concat(select)

    filtre = filtre.concat(
        "   </div>\n" +
        "   <div class=\"tout_les_filtre\">" +
        "       <select class=\"boutton\" name=\"trie\" id=\"trie\">\n" +
        "           <option selected disabled hidden id=\"choix\">Statut</option>\n"+
        "           <option value='fait' onclick=''>Fait</option>" +
        "           <option value='en_cour' onclick=''>En cour</option>" +
        "           <option value='en_attente' onclick=''>En attente</option>" +
        "           <option value='annule' onclick=''>Annulé</option>" +
        "       </select>\n"+
        "   </div>" +
        "   <div class=\"button_filtre\">\n" +
        "       <button class=\"button_new\">Nouveau</button>\n" +
        "   </div>\n" +
        "   <div class='div_riset'>" +
        "       <img src='../img/reset.png' onclick='affichageBackEnd(\"Demandes\")'/>"+
        "   </div>"+
        "</div>"
    )


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
            "               <div>Statut : "+ data[i].statut +"</div>"+
            "           </div>\n" +
            "       </div>\n"

        var button =
        "       <div class=\"option\">\n"
        if(data[i].statut === "en attente"){
            button = button.concat(
                "           <button class=\"accepter\" onclick='acceptAsk("+ data[i].id +")'>Accepter</button>\n" +
                "           <button class=\"annuler\" onclick='cancelAsk("+ data[i].id +")'>Annuler</button>\n" +
                "           <button class=\"supp\">Supprimer</button>\n" +
                "       </div>\n" +
                "    </div>\n" +
                "</div>"
            )
        }else if(data[i].statut === "en cour"){
            button = button.concat(
                "           <button class=\"annuler\" onclick='cancelMission("+ data[i].id +")'>Annuler</button>\n" +
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



async function acceptAsk(id){
    //var data = await requestApiNoBody("GET", "/demande/"+ id);
    var data = { "id": 1, "type": "typetest", "demande": "Bonjour", "id_user": 3, "updated_at": "2024-02-22T10:08:55.000000Z","created_at": "2024-02-22T10:08:55.000000Z", "statut" : "fait","user": {"id": 3, "name": "Enzo","code_postal": 0,"ville": "","adresse": "", "num_telephone": 0,"email": "cocodoudo@gmail.com", "role": "admin","email_verified_at": null,"created_at": "2024-02-12T20:45:43.000000Z","updated_at": "2024-02-12T20:45:43.000000Z"}}

    var updateAsk = {
        "staut": "en cour"
    }
    var newMission = {
        "id_demande": id
    }

    /*
    try {
        const response = await requestApi(updateAsk, "PITCH", "/demande/"+id);
        if (response.status === 200) {
            try {
                const response = await requestApi(newMission, "POST", "/missions/add");
                if (response.status === 200) {
                    showAlert("Création de la mission!");
                } else {
                    showAlert("Erreur lors de la création de la mission : " + response.status);
                }
            } catch (error) {
                showAlert('Erreur lors de la requête à l\'API : ' + error.message);
            }
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
    var data = { "id": 1, "type": "typetest", "demande": "Bonjour", "id_user": 3, "updated_at": "2024-02-22T10:08:55.000000Z","created_at": "2024-02-22T10:08:55.000000Z", "statut" : "fait","user": {"id": 3, "name": "Enzo","code_postal": 0,"ville": "","adresse": "", "num_telephone": 0,"email": "cocodoudo@gmail.com", "role": "admin","email_verified_at": null,"created_at": "2024-02-12T20:45:43.000000Z","updated_at": "2024-02-12T20:45:43.000000Z"}}

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


async function trieD(filtre){
    //var data = await requestApiNoBody("GET", "/demande");
    var data = [{"id": 1,"type": "typetest","demande": "Bonjour", "id_user": 3,"updated_at": "2024-02-22T10:08:55.000000Z","created_at": "2024-02-22T10:08:55.000000Z", "statut" : "fait", "user": {"id": 3,"name": "Enzo","code_postal": 0,"ville": "","adresse": "","num_telephone": 0,"email": "cocodoudo@gmail.com", "role": "admin","email_verified_at": null,"created_at": "2024-02-12T20:45:43.000000Z","updated_at": "2024-02-12T20:45:43.000000Z" }}, { "id": 2,"type": "typetest2", "demande": "Bonjour fff","id_user": 3, "updated_at": "2024-02-22T10:08:55.000000Z","created_at": "2024-02-22T10:08:55.000000Z","statut" : "en cour","user": {"id": 3,"name": "Enzo","code_postal": 0,"ville": "","adresse": "","num_telephone": 0,"email": "cocodoudo@gmail.com","role": "admin","email_verified_at": null,"created_at": "2024-02-12T20:45:43.000000Z","updated_at": "2024-02-12T20:45:43.000000Z"}}, {"id": 2, "type": "typetest2","demande": "Bonjour fff", "id_user": 3,"updated_at": "2024-02-22T10:08:55.000000Z", "created_at": "2024-02-22T10:08:55.000000Z","statut" : "en attente","user": {"id": 3,"name": "Enzo","code_postal": 0,"ville": "","adresse": "","num_telephone": 0,"email": "cocodoudo@gmail.com","role": "admin","email_verified_at": null,"created_at": "2024-02-12T20:45:43.000000Z","updated_at": "2024-02-12T20:45:43.000000Z" } } ]

    const box = document.getElementById('allInfo');
    box.innerHTML = "";

    console.log(filtre)

    var allInfo = ""
    for(i=0; i<data.length; i++) {
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
                "               <div>Statut : " + data[i].statut + "</div>" +
                "           </div>\n" +
                "       </div>\n"

            var button =
                "       <div class=\"option\">\n"
            if (data[i].statut === "en attente") {
                button = button.concat(
                    "           <button class=\"accepter\" onclick='acceptAsk(" + data[i].id + ")'>Accepter</button>\n" +
                    "           <button class=\"annuler\" onclick='cancelAsk(" + data[i].id + ")'>Annuler</button>\n" +
                    "           <button class=\"supp\">Supprimer</button>\n" +
                    "       </div>\n" +
                    "    </div>\n" +
                    "</div>"
                )
            } else if (data[i].statut === "en cour") {
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

