async function getInfoD(data) {
    var info =
        "<div class=\"contener_1\">\n" +
        "   <div class=\"contener_2\">\n" +
        "       <div class=\"description_demande\">\n" +
        "           <div class=\"description1_demande\">\n" +
        "               <div class=\"type\">Type : " + data.type + "</div>\n" +
        "               <div class=\"fait_par\">De : " + data.user.name + "</div>\n" +
        "               <div class=\"date\">Fait le : " + data.created_at + "</div>\n" +
        "           </div>\n" +
        "           <div class=\"description2_demande\">\n" +
        "               <div>" + data.demande + "</div>\n" +
        "               <div>Statut : " + data.etat + "</div>" +
        "           </div>\n" +
        "       </div>\n"

    var button =
        "       <div class=\"option\">\n"
    if (data.etat === "en attente" && data.type !== "demande_benevole") {
        button = button.concat(
            "           <button class=\"accepter\" onclick='validAsk(" + data.id + ")'>Valider</button>\n" +
            "           <button class=\"annuler\" onclick='cancelAsk(" + data.id + ")'>Annuler</button>\n" +
            "           <button class=\"supp\">Supprimer</button>\n" +
            "       </div>\n" +
            "    </div>\n" +
            "</div>"
        )
    }else if(data.etat === "a valider"){
        button = button.concat(
            "           <button class=\"accepter\" onclick='createMission(" + data.id + ")'>Valider la mission</button>\n" +
            "           <button class=\"annuler\" onclick='cancelAsk(" + data.id + ")'>Annuler</button>\n" +
            "           <button class=\"supp\">Supprimer</button>\n" +
            "       </div>\n" +
            "    </div>\n" +
            "</div>"
        )
    }else if(data.etat === "valide" || data.etat === "en cour"){
        button = button.concat(
            "           <button class=\"annuler\" onclick='cancelAsk(" + data.id + ")'>Annuler</button>\n" +
            "           <button class=\"supp\">Supprimer</button>\n" +
            "       </div>\n" +
            "    </div>\n" +
            "</div>"
        )
    }else if(data.type === "demande_benevole"){
        button = button.concat(
            "           <button class=\"accepter\" onclick='newBenevole("+ data.id +", "+ data.user.id +")'>Ajouter benevole</button>\n" +
            "           <button class=\"annuler\" onclick='cancelAsk(" + data.id + ")'>Annuler</button>\n" +
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

    return info
}


async function affichageDemande(data) {
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
        "           <option value='en_cour' onclick='trieStateD(\"a valider\")'>A valider</option>" +
        "           <option value='valider' onclick='trieStateD(\"valide\")'>Valide</option>" +
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
        info = await getInfoD(data[i])

        allInfo = allInfo.concat(info)
    }
    allInfo = allInfo.concat("</div>")

    var affichage = filtre.concat(allInfo);
    return affichage
}


async function newBenevole(idD, idU){
    var data = await requestApiNoBody("GET", "/demande/"+ idD);
    var updateAsk = {
        "id": data.id,
        "type": data.type,
        "demande": data.demande,
        "permis": data.permis,
        "etat": "fait",
        "id_user": data.id_user,
        "updated_at": data.updated_at,
        "created_at": data.created_at
    }
    try {
        const response = await requestApi(updateAsk, "PATCH", "/demande/"+id);
        if (response.status === 200) {
            showAlert("Nouveau benevole ajouté");
        } else {
            showAlert("Erreur lors du changement de status: " + response.status);
        }
    } catch (error) {
        showAlert('Erreur lors de la requête à l\'API : ' + error.message);
    }

    updateRoleUser(idU, "benevole")
}


async function createMission(id){
    var data = await requestApiNoBody("GET", "/demande/"+ id);

    var updateAsk = {
        "id": data.id,
        "type": data.type,
        "demande": data.demande,
        "permis": data.permis,
        "etat": "en cour",
        "id_user": data.id_user,
        "updated_at": data.updated_at,
        "created_at": data.created_at
    }
    var newMission = {
        "id_demande": id
    }


            try {
                const response = await requestApi(newMission, "POST", "/missions/add");
                if (response.status === 200) {
                    showAlert("Nouvelle Mission");
                    affichageBackEnd("Missions")
                } else {
                    showAlert("Erreur lors de la creation de la mission: " + response.status);
                }
            } catch (error) {
                showAlert('Erreur lors de la requête à l\'API : ' + error.message);
            }


}


async function validAsk(id){
    var data = await requestApiNoBody("GET", "/demande/"+ id);

    var formData = {
        "id": data.id,
        "type": data.type,
        "demande": data.demande,
        "permis": data.permis,
        "etat": "valide",
        "id_user": data.id_user,
        "updated_at": data.updated_at,
        "created_at": data.created_at
    }
    try {
        const response = await requestApi(formData, "PATCH", "/demande/"+id);
        if (response.status === 200) {
            showAlert("Demande valide, maintenan visible pour les benenvoles");
            affichageBackEnd("Demandes")
        } else {
            showAlert("Erreur lors du changement d'etat: " + response.status);
        }
    } catch (error) {
        showAlert('Erreur lors de la requête à l\'API : ' + error.message);
    }
}


async function cancelAsk(id){
    var data = await requestApiNoBody("GET", "/demande/"+ id);
    var formData = {
        "id": data.id,
        "type": data.type,
        "demande": data.demande,
        "permis": data.permis,
        "etat": "annuler",
        "id_user": data.id_user,
        "updated_at": data.updated_at,
        "created_at": data.created_at
    }
    console.log(formData)
    try {
        const response = await requestApi(formData, "PATCH", "/demande/"+id);
        if (response.status === 200) {
            showAlert("Annulation de la demande!");
        } else {
            showAlert("Erreur lors du changement d'etat': " + response.status);
        }
    } catch (error) {
        showAlert('Erreur lors de la requête à l\'API : ' + error.message);
    }


}




async function trieTypeD(filtre){
    var data = await requestApiNoBody("GET", "/demande");

    const box = document.getElementById('allInfo');
    box.innerHTML = "";

    var allInfo = ""
    for(i=0; i<data.length; i++) {
        console.log(data[i].type)
        if (data[i].type === filtre) {
            var info = await getInfoD(data[i])
            allInfo = allInfo.concat(info)
        }
    }
    box.innerHTML = allInfo

}


async function trieStateD(filtreEtat){
    var data = await requestApiNoBody("GET", "/demande");

    const box = document.getElementById('allInfo');
    box.innerHTML = "";

    var allInfo = ""
    for(i=0; i<data.length; i++) {
        if (data[i].etat === filtreEtat) {
            var info = await getInfoD(data[i])
            allInfo = allInfo.concat(info)
        }
    }
    box.innerHTML = allInfo
}

