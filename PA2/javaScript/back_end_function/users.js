
function affichageUser(data, role){
    var filtre =
        "<div class=\"filtre\"> " +
        "   <div class= \"barre_de_recherche\"> " +
        "       <input type = \"text\" id = \"search-article-input\" placeholder = \"Activitées\" >" +
        "   </div>" +
        "   <div class=\"button_filtre\">\n" +
        "       <button class=\"button_new\" onclick='add(\"addUser.php\")'>Nouveau</button>" +
        "   </div>" +
        "</div>";

    var allInfo = "";
    var info = "";
    for(i=0; i<data.length; i++){
        if(data[i].role === role){
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
                "           <button class=\"passer_admin\" onclick='updateRoleUser("+ data[i].id +")'>Passer admin</button>\n" +
                "           <button class=\"bannir\" onclick='banUser("+ data[i].id +")'>Bannir</button>\n" +
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

async function banUser(id){
    var fomrData =
        {
            "statut": "ban"
        }

    /*
    try {
        const response = await requestApi(formData, "PITCH", "/users/"+id);
        if (response.status === 200) {
            showAlert(Utilisateur bannie");
        } else {
            showAlert("Erreur lors du bannisement: " + response.status);
        }
    } catch (error) {
        showAlert('Erreur lors de la requête à l\'API : ' + error.message);
    }
    */
}