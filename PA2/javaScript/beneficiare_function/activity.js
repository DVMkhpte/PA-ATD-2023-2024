async function affichageActivity(data){
    var filtre =
        "<div class=\"filtre\">\n" +
        "   <div  class=\"barre_de_recherche\">\n" +
        "       <input type=\"text\" id=\"search-article-input\" placeholder=\"Activitées\">\n" +
        "   </div>\n" +
        "   <div  class=\"tout_les_filtre\">\n" +
        "       <select class=\"boutton\" name=\"trie\" id=\"trie\">\n" +
        "           <option selected disabled hidden id=\"choix\">Trier par</option>\n" +
        "           <option value=\"nom\" onclick=\"trie(\"nom\")\">Nom</option>\n" +
        "           <option value=\"prenom\" onclick=\"trie(\"type\")\">Type</option>\n" +
        "           <option value=\"acces\" onclick=\"trie(\"lieu\")\">Lieu</option>\n" +
        "           <option value=\"acces\" onclick=\"trie(\"date\")\">Date</option>\n" +
        "       </select>\n" +
        "   </div>\n" +
        "</div>"

    var allInfo = "<div class=\"all_info\">\n";
    var info = "";
    for (i = 0; i < 3; i++) {
        info =
            "   <div class=\"info\">\n" +
            "       <div class=\"description_general\">\n" +
            "           <div class=\"description_1\">\n" +
            "               <div class=\"description_1_1\">\n" +
            "                   <div class=\"nom\">Nom</div>\n" +
            "                   <div class=\"prenom\">Type</div>\n" +
            "               </div>\n" +
            "               <div class=\"description_1_2\">\n" +
            "                   <div class=\"acces\">lieu</div>\n" +
            "                   <div class=\"statut\">Date</div>\n" +
            "               </div>\n" +
            "           </div>\n" +
            "           <div class=\"description_2\">\n" +
            "               <div class=\"desription\">Desription : Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque, id. Facilis, accusamus qui. Itaque laudantium laboriosam totam dignissimos voluptates debitis explicabo, in hic officiis error obcaecati, quis minus ipsam similique.</div>\n" +
            "           </div>\n" +
            "       </div>\n" +
            "       <div class=\"option\">\n" +
            "           <button onclick=\"joinActivity("+ 1 +","+ 1 +")\" class=\"inscription\">Inscription</button>\n" +
            "       </div>\n" +
            "   </div>\n"
        allInfo = allInfo.concat(info)
    }
    allInfo = allInfo.concat("</div>")

    var affichage = filtre.concat(allInfo);
    return affichage
}


async function joinActivity(idActivity){

    const formData = {
        "id_activite": idActivity,
        "id_user": idUser
    };
    /*
    try {
        const response = await requestApi(formData, "POST", "/participea/add");
        if (response.status === 200) {
            showAlert("Création de l'utilisateur réussie !");
        } else {
            showAlert("Erreur lors de la création de l'inscription' : " + response.status);
        }
    } catch (error) {
        showAlert('Erreur lors de la requête à l\'API : ' + error.message);
    }
     */
}


async function affichageMesActivitee(data, id){

    var filtre =
        "<div class=\"filtre\">\n" +
        "   <div  class=\"barre_de_recherche\">\n" +
        "       <input type=\"text\" id=\"search-article-input\" placeholder=\"Activitées\">\n" +
        "   </div>\n" +
        "   <div  class=\"tout_les_filtre\">\n" +
        "       <select class=\"boutton\" name=\"trie\" id=\"trie\">\n" +
        "           <option selected disabled hidden id=\"choix\">Trier par</option>\n" +
        "           <option value=\"nom\" onclick=\"trie(\"nom\")\">Nom</option>\n" +
        "           <option value=\"prenom\" onclick=\"trie(\"type\")\">Type</option>\n" +
        "           <option value=\"acces\" onclick=\"trie(\"lieu\")\">Lieu</option>\n" +
        "           <option value=\"acces\" onclick=\"trie(\"date\")\">Date</option>\n" +
        "       </select>\n" +
        "   </div>\n" +
        "</div>"

    var allInfo = "<div class=\"all_info\">\n";
    var info = "";
    for (i = 0; i < 3; i++) {
        info =
            "   <div class=\"info\">\n" +
            "       <div class=\"description_general\">\n" +
            "           <div class=\"description_1\">\n" +
            "               <div class=\"description_1_1\">\n" +
            "                   <div class=\"nom\">Nom</div>\n" +
            "                   <div class=\"prenom\">Type</div>\n" +
            "               </div>\n" +
            "               <div class=\"description_1_2\">\n" +
            "                   <div class=\"acces\">lieu</div>\n" +
            "                   <div class=\"statut\">Date</div>\n" +
            "               </div>\n" +
            "           </div>\n" +
            "           <div class=\"description_2\">\n" +
            "               <div class=\"desription\">Desription : Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque, id. Facilis, accusamus qui. Itaque laudantium laboriosam totam dignissimos voluptates debitis explicabo, in hic officiis error obcaecati, quis minus ipsam similique.</div>\n" +
            "           </div>\n" +
            "       </div>\n" +
            "       <div class=\"option\">\n" +
            "           <button onclick=\"joinActivity("+ 1 +","+ 1 +")\" class=\"inscription\">Inscription</button>\n" +
            "       </div>\n" +
            "   </div>\n"
        allInfo = allInfo.concat(info)
    }
    allInfo = allInfo.concat("</div>")

    var affichage = filtre.concat(allInfo);
    return affichage
}