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
        "<div class=\"entrepot_camion\">\n" +
        "   <h3 class=\"entrepot_titre\">Camions</h3>\n" +
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
        "   </table>\n" +
        "</div>"

    return info
}

async function affichageDenree(idEntrepot){
    var dataEtagere = await requestApiNoBody("GET", "/etageres/")
    console.log(dataEtagere)

    var info =
        "<div class=\"entrepot_stock\">\n" +
        "   <h3 class=\"entrepot_titre\">Stock</h3>\n" +
        "   <div id =\"voir_denree\"></div>\n" +
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
                "               <tr class=\"denree\" onclick='voirAllDenree(" + dataEtagere[i].id + ")'>\n" +
                "                   <td></td>\n" +
                "                   <td>" + dataEtagere[i].numero + "</td>\n" +
                "                   <td>" + dataEtagere[i].capacite_actuelle + "</td>\n" +
                "               </tr>\n"
        }
    }
    info +=
        "           </tbody>\n" +
        "       </table>\n" +
        "</div>"

    return info

}

async function entrepotInfo(data){
    var idE = data.id
    console.log(idE)

    var info =
        "<div class=\"entrepot\">\n" +
        "   <h3 class='entrepot_name'>Stock de l'entrepot : "+ data.nom +"</h3>\n" +
        "   <div class=\"info_stock\">"

    info+= await affichageCamion(idE)

    info+= await affichageDenree(idE)

    info +=
        "   </div>\n" +
        "</div>"


    return info
}




async function voirAllDenree(idEtagere){
    const voirDenree = document.getElementById("voir_denree")
    var dataProduit = await requestApiNoBody("GET", "/produits")

    var info =
        "                   <table>\n" +
        "                        <thead>\n" +
        "                            <tr>\n" +
        "                               <th>Etagere</th>"+
        "                               <th>Nom</th>"+
        "                                <th>Id</th>\n" +
        "                                <th>Date d'arrivée</th>\n" +
        "                                <th>Date limite</th>\n" +
        "                            </tr>\n" +
        "                        </thead>\n" +
        "                        <tbody>\n"
    for(i=0; i<dataProduit.length; i++) {
        if(dataProduit[i].id_etagere === idEtagere) {
            info +=
                "                            <tr>\n" +
                "                                <td>" + dataProduit[i].etagere.numero + "</td>\n" +
                "                                <td>" + dataProduit[i].nom + "</td>\n" +
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

