async function getEntrepot(entrepotName){
    var data = await requestApiNoBody("GET", "/entrepots/")
    var entrepot = ""
    for(i=0; i<data.length; i++){
        if(data[i].nom === entrepotName){
            entrepot = data[i]
        }
    }

    return entrepot
}


async function refreshCamion(idEntrepot){
    const refreshCamion = document.getElementById("entrepot_camion")
    var info = await affichageCamion(idEntrepot)
    refreshCamion.innerHTML = info
}

async function trieProduitByName(idEtagere){
    var dataAllProduit = await requestApiNoBody("GET", "/produits")

    var dataProduit = []
    for(j=0; j<dataAllProduit.length; j++){
        var produit = {}
        if(dataAllProduit[j].id_etagere === idEtagere) {
            produit = {
                nomP: dataAllProduit[j].nom,
                type: dataAllProduit[j].type,
                quantite: 1
            }

            var nomExist = false
            for (k = 0; k < dataProduit.length; k++) {
                if (dataProduit[k].nomP === produit.nomP){
                    nomExist = true
                    dataProduit[k].quantite += 1
                }
            }

            if (!nomExist) {
                dataProduit.push(produit)
            }
        }
    }

    return dataProduit
}


async function affichageStock(affichage) {
    const stock = document.getElementById('container');
    stock.innerHTML = "";

    var strBox = []
    var data = []


    switch (affichage) {
        case "Saint Quentin":
            data = await getEntrepot(affichage)
            strBox = await entrepotInfo(data)
            break

        case "Laon":
            data = await getEntrepot(affichage)
            strBox = await entrepotInfo(data)
            break

        default:
            break;
    }

    stock.innerHTML = strBox
}


async function affichageCamion(idEntrepot){
    var data = await requestApiNoBody("GET", "/camions/")
    var info =
        "   <div  class=\"entrepot_titre\">"+
        "       <h3>Camions</h3>\n" +
        "       <button class='buttonAdd' onclick='addCamion("+ idEntrepot +")'>Ajouter</button>" +
        "   </div>"+
        "   <div class='overflowStock'>"+
        "   <table>\n" +
        "       <thead>\n" +
        "           <tr>\n" +
        "               <th>Matriculation</th>\n" +
        "               <th>Modèle</th>\n" +
        "               <th>Type</th>\n" +
        "               <th>Statut</th>\n" +
        "               <th>Options</th>\n" +
        "           </tr>\n" +
        "       </thead>\n" +
        "       <tbody>\n"
    for(i=0; i<data.length; i++){
        if(data[i].id_entrepot === idEntrepot) {
            info +=
                "           <tr>\n" +
                "               <td>"+ data[i].immatriculation +"</td>\n" +
                "               <td>"+ data[i].modele +"</td>\n" +
                "               <td>"+ data[i].type +"</td>\n" +
                "               <td>"+ data[i].status +"</td>\n" +
                "               <td>"+
                "                   <button class='updateButton' onclick='updateCamion("+ data[i].id +")'>Update statut</button>" +
                "               </td>\n" +
                "           </tr>\n"
        }
    }
    info +=
        "       </tbody>\n" +
        "   </table>\n"+
        "</div>"

    return info
}

async function affichageDenree(idEntrepot){
    var dataEtagere = await requestApiNoBody("GET", "/etageres/")
    console.log(dataEtagere)

    var info =
        "   <div  class=\"entrepot_titre\">"+
        "       <h3>Stock</h3>\n" +
        "   </div>"+
        "   <div class='overflowStock' id='voir_denree'>"+
        "       <table>\n" +
        "           <thead>\n" +
        "               <tr>\n" +
        "                   <th>Etageres</th>"+
        "                   <th>Numero</th>\n" +
        "                   <th>Capacitée</th>\n" +
        "               </tr>\n" +
        "           </thead>\n" +
        "           <tbody>\n"
    for(i=0; i<dataEtagere.length; i++){
        if(dataEtagere[i].id_entrepot === idEntrepot) {
            info +=
                "               <tr class=\"denree\" onclick='voirAllDenree(" + dataEtagere[i].id + ", \""+ dataEtagere[i].numero +"\")'>\n" +
                "                   <td></td>\n" +
                "                   <td>" + dataEtagere[i].numero + "</td>\n" +
                "                   <td>" + dataEtagere[i].capacite_actuelle + "</td>\n" +
                "               </tr>\n"
        }
    }
    info +=
        "           </tbody>\n" +
        "       </table>\n" +
        "   </div>\n"

    return info

}

async function entrepotInfo(data){
    var idE = data.id

    var info =
        "<div class=\"entrepot\">\n" +
        "   <h3 class='entrepot_name'>Entrepot de "+ data.nom +"</h3>\n" +
        "   <div class=\"info_stock\">"+
        "       <div id=\"entrepot_camion\">\n"

    info+= await affichageCamion(idE)

    info+=  "</div>" +
            "<div id=\"entrepot_stock\">\n"

    info+= await affichageDenree(idE)

    info +=
        "       </div>"+
        "   </div>\n" +
        "</div>"


    return info
}




async function voirAllDenree(idEtagere, numEtagere){
    const voirDenree = document.getElementById("voir_denree")
    var dataEtagere = await requestApiNoBody("GET", "/etageres/"+idEtagere)

    var dataProduit = await trieProduitByName(idEtagere)

    var info =
        "                   <div class='etagere'>" +
        "                       <div>Etagere : "+ numEtagere +"" +
        "                           <button class='buttonAddEtatagere' onclick='addProduit("+ idEtagere +")'>Ajouter</button>" +
        "                       </div>" +
        "                       <button onclick='retourEtagere("+ dataEtagere.id_entrepot +")'>Retour</button>" +
        "                   </div>"+
        "                   <div class='overflowStock'>"+
        "                   <table>\n" +
        "                        <thead>\n" +
        "                            <tr>\n" +
        "                               <th>Nom produit</th>"+
        "                                <th>Type</th>\n" +
        "                                <th>Quantité</th>\n" +
        "                            </tr>\n" +
        "                        </thead>\n" +
        "                        <tbody>\n"
    for(i=0; i<dataProduit.length; i++) {
        info +=
            "                            <tr class=\"denree\" onclick='voirDenreeByName(" + dataEtagere.id + ", \""+ dataEtagere.numero +"\", \""+ dataProduit[i].nomP +"\")'>\n" +
            "                                <td>" + dataProduit[i].nomP + "</td>\n" +
            "                                <td>" + dataProduit[i].type + "</td>\n" +
            "                                <td>" + dataProduit[i].quantite + "</td>\n" +
            "                            </tr>\n"
    }
    info +=
        "                        </tbody>\n" +
        "                    </table>"+
        "               </div>"
    voirDenree.innerHTML = info

}


async function voirDenreeByName(idEtagere, numeroEtagere, nomProduit){
    const voirDenree = document.getElementById("voir_denree")
    var dataProduit = await requestApiNoBody("GET", "/produits")
    var dataEtagere = await requestApiNoBody("GET", "/etageres/"+idEtagere)

    var info =
        "                   <div class='etagere'>" +
        "                       <div>Etagere : "+ numeroEtagere +", produit : "+ nomProduit +"</div>" +
        "                       <button onclick='voirAllDenree("+ dataEtagere.id +", \""+ dataEtagere.numero +"\")'>Retour</button>" +
        "                   </div>"+
        "                   <div class='overflowStock'>"+
        "                   <table>\n" +
        "                        <thead>\n" +
        "                            <tr>\n" +
        "                               <th>Produit</th>"+
        "                                <th>Id</th>\n" +
        "                                <th>Date d'arrivée</th>\n" +
        "                                <th>Date limite</th>\n" +
        "                                <th>Option</th>\n" +
        "                            </tr>\n" +
        "                        </thead>\n" +
        "                        <tbody>\n"
    for(i=0; i<dataProduit.length; i++) {
        if(dataProduit[i].id_etagere === idEtagere && dataProduit[i].nom === nomProduit) {
            info +=
                "                            <tr>\n" +
                "                                <td></td>\n" +
                "                                <td>" + dataProduit[i].id + "</td>\n" +
                "                                <td>" + dataProduit[i].date_arrivee + "</td>\n" +
                "                                <td>" + dataProduit[i].date_limite + "</td>\n" +
                "                                <td>" +
                "                                   <button class='buttonSupp' onclick='supp("+dataProduit[i].id+", \"/produits/\")'>Supp</button>" +
                "                               </td>\n" +
                "                            </tr>\n"
        }
    }
    info +=
        "                        </tbody>\n" +
        "                    </table>"+
        "                 </div>"
    voirDenree.innerHTML = info

}



async function retourEtagere(idEntrepot){
    const voirDenree = document.getElementById("entrepot_stock")
    var info = await affichageDenree(idEntrepot)
    voirDenree.innerHTML = info
}



async function supp(id, link){
    var fetchLink = link+id
    console.log(fetchLink)
    await requestApiNoBody("DELETE", fetchLink)
    showAlert("Produit supprimé!");
}



async function addCamion(idEntrepot){
    const updateCamion = document.getElementById("entrepot_camion")

    var info =
        "   <div  class=\"entrepot_titre\">"+
        "       <h3>Nouveau Camion</h3>\n" +
        "   </div>" +
        "   <div  class='inputAdd' id='inputAdd1'>" +
        "       <input id='immatriculation' type='text' placeholder='Immatriculation' required>" +
        "       <input id='modele' placeholder='modele' type='text' required>" +
        "   </div>" +
        "   <div  class='inputAdd' id='inputAdd2'>" +
        "       <select class=\"selectAdd\" name=\"type\" id=\"type\" required>\n" +
        "           <option selected disabled hidden id=\"type\">Type</option>\n"+
        "           <option value='porteur' >Porteur</option>" +
        "           <option value='semi-remorque' >Semi-remorque</option>" +
        "           <option value='tracteur' >Tracteur</option>" +
        "           <option value='camionnette'>Camionnette</option>" +
        "       </select>\n"+
        "       <select class=\"selectAdd\" name=\"status\" id=\"status\" required>\n" +
        "           <option selected disabled hidden id=\"type\" >Status</option>\n"+
        "           <option value='disponible' >Dispnible</option>" +
        "           <option value='en panne' >en panne</option>" +
        "           <option value='maintenance' >maintenance</option>" +
        "       </select>\n"+
        "       <input id='date_dernier_controle' placeholder='Date controle technique' type='date' required>" +
        "   </div>" +
        "   <div  class='inputAdd' id='inputAdd3'>" +
        "       <input id='poids' placeholder='Poids' type='number' required>" +
        "       <input id='hauteur' placeholder='Hauteur' type='number' required>" +
        "       <input id='capacite_max' placeholder='Capacite max' type='number' required>" +
        "   </div>" +
        "   <div  class='inputAdd' id='inputAdd4'>" +
        "       <button class='buttonAdd' onclick='confirmNewCamion("+ idEntrepot +")'>Ajouter</button>" +
        "       <button class='buttonAdd' onclick='refreshCamion("+ idEntrepot +")'>Retour</button>" +
        "   </div>" +
        ""

    updateCamion.innerHTML = info
}


async function confirmNewCamion(idEntrepot){
    const immatriculation = document.getElementById("immatriculation").value
    const modele = document.getElementById("modele").value
    const type = document.getElementById("type").value
    const status = document.getElementById("status").value
    const poids = document.getElementById("poids").value
    const hauteur = document.getElementById("hauteur").value
    const capacite_max = document.getElementById("capacite_max").value
    const date_dernier_controle = document.getElementById("date_dernier_controle").value


    if(poids > 0 && hauteur > 0 && capacite_max > 0){
        var formData = {
            "immatriculation": immatriculation,
            "modele": modele,
            "type": type,
            "status": status,
            "poids": poids,
            "hauteur": hauteur,
            "capacite_max": capacite_max,
            "date_dernier_controle": date_dernier_controle,
            "id_entrepot": idEntrepot
        }

        console.log(formData)

        await requestApi(formData, "POST", "/camions/add")
        showAlert("Camion créé!");

        refreshCamion(idEntrepot)

    }else{
        showAlert("Erreur dans les valeurs");
        await addCamion(idEntrepot)
    }

}


async function updateCamion(idCamion){
    const updateCamion = document.getElementById("entrepot_camion")
    var dataCamion = await requestApiNoBody("GET", "/camions/"+idCamion)

    var form =
        "   <div  class=\"entrepot_titre\">"+
        "       <h3>Camions</h3>\n" +
        "   </div>"+
        "   <table>\n" +
        "       <thead>\n" +
        "           <tr>\n" +
        "               <th>Matriculation</th>\n" +
        "               <th>Modèle</th>\n" +
        "               <th class='selectColone'>Type</th>\n" +
        "               <th class='selectColone'>Statut</th>\n" +
        "               <th>Options</th>\n" +
        "           </tr>\n" +
        "       </thead>\n" +
        "       <tbody>\n" +
        "           <tr>" +
        "               <td>"+ dataCamion.immatriculation +"</td>" +
        "               <td>"+ dataCamion.modele +"</td>" +
        "               <td class='selectColone'>" +
        "                   <select class=\"select\" name=\"type\" id=\"type\">\n" +
        "                       <option selected disabled hidden id=\"type\" value='"+ dataCamion.type +"'>Type</option>\n"+
        "                       <option value='porteur' >Porteur</option>" +
        "                       <option value='semi-remorque' >Semi-remorque</option>" +
        "                       <option value='tracteur' >Tracteur</option>" +
        "                       <option value='camionnette'>Camionnette</option>" +
        "                   </select>\n"+
        "               </td>" +
        "               <td class='selectColone'>" +
        "                   <select class=\"select\" name=\"status\" id=\"status\">\n" +
        "                       <option selected disabled hidden id=\"type\" value='"+ dataCamion.status +"'>Status</option>\n"+
        "                       <option value='disponible' >Dispnible</option>" +
        "                       <option value='en panne' >en panne</option>" +
        "                       <option value='maintenance' >maintenance</option>" +
        "                   </select>\n"+
        "               </td>" +
        "               <td>" +
        "                   <button class='buttonAdd' onclick='validModif("+ idCamion +")'>Valider</button>" +
        "               </td>" +
        "           </tr>"

    updateCamion.innerHTML = form
}


async function validModif(idCamion){
    var dataCamion = await requestApiNoBody("GET", "/camions/"+idCamion)

    const type = document.getElementById("type").value
    const status = document.getElementById("status").value

    var formData = {
        "immatriculation": dataCamion.immatriculation,
        "modele": dataCamion.modele,
        "type": type,
        "status": status
    }

    console.log(formData)

    await requestApi(formData, "PATCH", "/camions/"+idCamion)
    showAlert("Camion modifié!");

    refreshCamion(dataCamion.id_entrepot)

}

async function addProduit(idEtagere){

}

