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
        "   </div>"+
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
                "               <td>" + data[i].immatriculation + "</td>\n" +
                "               <td>" + data[i].modele + "</td>\n" +
                "               <td>" + data[i].type + "</td>\n" +
                "               <td>" + data[i].status + "</td>\n" +
                "           </tr>\n"
        }
    }
    info +=
        "       </tbody>\n" +
        "   </table>\n"

    return info
}

async function affichageDenree(idEntrepot){
    var dataEtagere = await requestApiNoBody("GET", "/etageres/")
    console.log(dataEtagere)

    var info =
        "   <div  class=\"entrepot_titre\">"+
        "       <h3>Stock</h3>\n" +
        "   </div>"+
        "   <div id =\"voir_denree\">"+
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
    console.log(idE)

    var info =
        "<div class=\"entrepot\">\n" +
        "   <h3 class='entrepot_name'>Stock de l'entrepot : "+ data.nom +"</h3>\n" +
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
        "                       <div>Etagere : "+ numEtagere +"</div>" +
        "                       <button onclick='retourEtagere("+ dataEtagere.id_entrepot +")'>Retour</button>" +
        "                   </div>"+
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
        "                    </table>"
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
        "                   <table>\n" +
        "                        <thead>\n" +
        "                            <tr>\n" +
        "                               <th>Produit</th>"+
        "                                <th>Id</th>\n" +
        "                                <th>Date d'arrivée</th>\n" +
        "                                <th>Date limite</th>\n" +
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
                "                            </tr>\n"
        }
    }
    info +=
        "                        </tbody>\n" +
        "                    </table>"
    voirDenree.innerHTML = info

}



async function retourEtagere(idEntrepot){
    const voirDenree = document.getElementById("entrepot_stock")
    var info = await affichageDenree(idEntrepot)
    voirDenree.innerHTML = info
}


