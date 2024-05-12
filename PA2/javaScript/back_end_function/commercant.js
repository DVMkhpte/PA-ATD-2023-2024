
async function getInfoC(data){
    var info =
        "<div class=\"contener_1\">\n" +
        "   <div class=\"contener_2\"  id=\"commercant"+data.id+"\">\n" +
        "       <div class=\"description_activitee\">\n" +
        "           <div class=\"description1_activitee\">\n" +
        "               <div class=\"description1_1_activitee\">\n" +
        "                   <div class=\"nom\">" + data.nom + "</div>\n" +
        "               </div>\n" +
        "               <div class=\"adresse\"> Au  "+ data.adresse + "</div>\n" +
        "           </div>\n" +
        "           <div class=\"description2_activitee\">\n" +
        "               <p>Type: " + data.type + "</p>\n"+
        "           </div>\n" +
        "       </div>\n" +
        "       <div class=\"option\">\n" +
        "           <button class=\"supp\" onclick='suppFormation("+ data.id +")'>Supprimer</button>\n" +
        "       </div>\n" +
        "   </div>\n" +
        "</div>"

    return info
}




async function affichageCommercant(data){
    var filtre =
        "<div class=\"filtre\">\n" +
        "   <div class=\"barre_de_recherche\">\n" +
        "       <input type=\"text\" id=\"search-commercant-input\" oninput=\"searchCommercants()\" placeholder=\"Commercant\">\n"+
        "   </div>\n"+
        "   <div class=\"button_filtre\">\n" +
        "       <button class=\"button_new\" onclick=\"add('addCommercant.php')\">Nouveau</button>\n" +
        "   </div>\n" +
        "   <div class='div_riset'>" +
        "       <img src='../img/reset.png' onclick='affichageBackEnd(\"Commercant\")'/>"+
        "   </div>"+
        "</div>"


    var allInfo = "<div id='allInfo'>";
    var info = "";
    for (i = 0; i < data.length; i++) {
        info = await getInfoC(data[i])
        allInfo = allInfo.concat(info)
    }
    allInfo = allInfo.concat("</div>")

    var affichage = filtre.concat(allInfo);

    return affichage
}



async function suppFormation(idC){
    const responseSuppF = await requestApiNoBody("DELETE", "/commercants/"+idC);
    showAlert("Commercant Supprimé!");
    affichageBackEnd("Commercant")
}




async function searchCommercants(){
    var data = await requestApiNoBody("GET", "/commercants/");

    const input = document.getElementById('search-commercant-input');
    const search = input.value;

    var allInfo = ""
    const box = document.getElementById('allInfo');
    box.innerHTML = "";
    var dataName = ""
    for(i=0; i<data.length; i++) {

        if(search.length > 0) {
            dataName = data[i].nom
            if (dataName.includes(search)) {
                var info = await getInfoC(data[i])

                allInfo = allInfo.concat(info)
            }
        }else {
            var info = await getInfoC(data[i])

            allInfo = allInfo.concat(info)
        }
    }
    box.innerHTML = allInfo
}