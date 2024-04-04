
function affichageDemande(data) {
    var filtre =
        "<div class=\"filtre\">\n" +
        "   <div  class=\"barre_de_recherche\">\n" +
        "       <input type=\"text\" id=\"search-article-input\" placeholder=\"Demandes\">\n" +
        "   </div>\n" +
        "   <div  class=\"tout_les_filtre\">\n" +
        "       <select class=\"boutton\" name=\"trie\" id=\"trie\">\n" +
        "           <option selected disabled hidden id=\"choix\">Trier par</option>\n" +
        "           <option value=\"type\" onclick=\"trie(\"type\")\">Type</option>\n" +
        "           <option value=\"date\" onclick=\"trie(\"date\")\">Date</option>\n" +
        "       </select>\n" +
        "   </div>\n" +
        "   <div class=\"button_filtre\">\n" +
        "       <button class=\"button_new\">Nouveau</button>\n" +
        "   </div>\n" +
        "</div>"

    var allInfo = "";
    var info = "";
    for (i = 0; i < data.length; i++) {
        info =
            "<div class=\"contener_1\">\n" +
            "   <div class=\"contener_2\">\n" +
            "       <div class=\"description_demande\">\n" +
            "           <div class=\"description1_demande\">\n" +
            "               <div class=\"type\">Type : " + data[i].type + "</div>\n" +
            "               <div class=\"fait_par\">De :  + data[i].fait_par.name + </div>\n" +
            "               <div class=\"date\">Fait le :  + data[i].date + </div>\n" +
            "           </div>\n" +
            "           <div class=\"description2_demande\">\n" +
            "               <p>" + data[i].demande + "</p>\n" +
            "           </div>\n" +
            "       </div>\n" +
            "       <div class=\"option\">\n" +
            "           <button class=\"accepter\">Accepter</button>\n" +
            "           <button class=\"supp\">Supprimer</button>\n" +
            "       </div>\n" +
            "    </div>\n" +
            "</div>"

        allInfo = allInfo.concat(info)
    }

    var affichage = filtre.concat(allInfo);
    return affichage
}