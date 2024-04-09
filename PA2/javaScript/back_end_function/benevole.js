
function affichageBenevole(data){
    var filtre =
        "<div class=\"filtre\"> " +
        "   <div class= \"barre_de_recherche\"> " +
        "       <input type = \"text\" id = \"search-article-input\" placeholder = \"Activitées\" >" +
        "   </div>" +
        "   <div  class=\"tout_les_filtre\">" +
        "       <select class=\"boutton\" name=\"trie\" id=\"trie\">" +
        "           <option selected disabled hidden id=\"choix\">Trier par</option>" +
        "           <option value = \"nom\" onclick = \"trie(\"nom\")\" >Nom</option>" +
        "           <option value=\"prenom\" onclick=\"trie(\" prenom\")\">Prénom</option>" +
        "           <option value=\"acces\" onclick=\"trie(\"acces\")\">Accés</option>" +
        "          <option value=\"acces\" onclick=\"trie(\"statut\")\">Statut</option>" +
        "       </select>" +
        "   </div>" +
        "   <div class=\"button_filtre\">\n" +
        "       <button class=\"button_new\" onclick='add(\"addUser.php\")'>Nouveau</button>" +
        "   </div>" +
        "</div>";

    var allInfo = "";
    var info = "";
    for(i=0; i<data.length; i++){
        if(data[i].role == "benevole"){
            info =
                "<div class=\"contener_1\">\n" +
                "   <div class=\"contener_2\">\n" +
                "       <div class=\"descriptions_users\">\n" +
                "           <div class=\"description1_users\">\n" +
                "               <div class=\"nom\">Nom : " + data[i].name + "</div>\n" +
                "               <div class=\"prenom\">Prénom :  + data[i].prenom + </div>\n" +
                "               <div class=\"statut\">Statut : </div>\n" +
                "           </div>\n" +
                "           <div class=\"description2_users\">\n" +
                "               <div class=\"role\">Role : " + data[i].role + "</div>\n" +
                "               <div class=\"email\">Email : " + data[i].email + "</div>\n" +
                "               <div class=\"verified_email\">Email verifié : " + data[i].email_verified + "</div>\n" +
                "           </div>\n" +
                "           <div class=\"description3_users\">\n" +
                "               <div class=\"adresse\">Adresse : " + data[i].code_postal + ", " + data[i].ville + ", " + data[i].adresse + "</div>\n" +
                "           </div>\n" +
                "       </div>\n" +
                "       <div class=\"option\">\n" +
                "           <button class=\"modif_acces\">Modifier accé</button>\n" +
                "           <button class=\"passer_admin\">Passer admin</button>\n" +
                "           <button class=\"bannir\">Bannir</button>\n" +
                "           <button class=\"supp\">Supprimer</button>\n" +
                "       </div>\n" +
                "   </div>\n" +
                "</div>"


            allInfo = allInfo.concat(info)
        }
    }
    var affichage = filtre.concat(allInfo);
    return affichage;
}