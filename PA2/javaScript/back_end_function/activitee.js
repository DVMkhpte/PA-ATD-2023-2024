
function affichageActivitee(data) {
    var filtre =
        "<div class=\"filtre\">\n" +
        "   <div  class=\"barre_de_recherche\">\n" +
        "       <input type=\"text\" id=\"search-article-input\" placeholder=\"Activitées\">\n" +
        "   </div>\n" +
        "   <div  class=\"tout_les_filtre\">\n" +
        "       <select class=\"boutton\" name=\"trie\" id=\"trie\">\n" +
        "           <option selected disabled hidden id=\"choix\">Trier par</option>\n" +
        "           <option value=\"nom\" onclick=\"trie(\"nom\")\">Nom</option>\n" +
        "           <option value=\"date\" onclick=\"trie(\"date\")\">Date debut</option>\n" +
        "           <option value=\"type\" onclick=\"trie(\"type\")\">type</option>\n" +
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
            "       <div class=\"description_activitee\">\n" +
            "           <div class=\"description1_activitee\">\n" +
            "               <div class=\"description1_1_activitee\">\n" +
            "                   <div class=\"nom\">" + data[i].nom + "</div>\n" +
            "               </div>\n" +
            "               <div class=\"adresse\"> Au  + data[i].adresse + </div>\n" +
            "                   <div class=\"date\">Du " + data[i].date_debut + " au " + data[i].date_fin + "</div>\n" +
            "               </div>\n" +
            "               <div class=\"description2_activitee\">\n" +
            "                   <p> + data[i].adresse + </p>\n" +
            "                   <div class=\"superviserPar\">Superviser Par : " + data[i].superviser_par.name + "</div>\n" +
            "                   <div class=\"nb_plae\">Place restante : " + data[i].nb_place + "</div>\n" +
            "               </div>\n" +
            "           </div>\n" +
            "           <div class=\"option\">\n" +
            "               <button class=\"modif\">Modifier l\\'activité</button>\n" +
            "               <button class=\"voir\">Voir les participants</button>\n" +
            "               <button class=\"supp\">Supprimer</button>\n" +
            "           </div>\n" +
            "       </div>\n" +
            "   </div>"

        allInfo = allInfo.concat(info)
    }
    var affichage = filtre.concat(allInfo);
    return affichage
}