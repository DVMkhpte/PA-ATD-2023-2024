async function getInfoU(data){
    var info =
        "<div class=\"contener_1\">\n" +
        "   <div class=\"contener_2\">\n" +
        "       <div class=\"descriptions_users\">\n" +
        "           <div class=\"description1_users\">\n" +
        "               <div class=\"nom\">Nom : " + data.name + "</div>\n" +
        "           </div>\n" +
        "           <div class=\"description2_users\">\n" +
        "               <div class=\"role\">Role : " + data.role + "</div>\n" +
        "               <div class=\"email\">Email : " + data.email + "</div>\n" +
        "           </div>\n" +
        "           <div class=\"description3_users\">\n" +
        "               <div class=\"adresse\">Adresse : " + data.code_postal + ", " + data.ville + ", " + data.adresse + "</div>\n" +
        "           </div>\n" +
        "       </div>\n" +
        "       <div class=\"option\">\n"
        if(data.role === "beneficiaire") {
            info += "<button class=\"passer_admin\" onclick='updateRoleUser(" + data.id + ", \"benevole\")'>Passer benevole</button>\n"
        }else if(data.role === "benevole"){
            info += "<button class=\"passer_admin\" onclick='updateRoleUser(" + data.id + ", \"admin\")'>Passer admin</button>\n"
        }
        info = info.concat(
        "           <button class=\"bannir\" onclick='updateRoleUser("+ data.id +", \"banni\")'>Bannir</button>\n" +
        "           <button class=\"supp\">Supprimer</button>\n" +
        "       </div>\n" +
        "   </div>\n" +
        "</div>")

    return info
}


async function affichageUser(data, role){
    var filtre =
        "<div class=\"filtre\"> " +
        "   <div class= \"barre_de_recherche\"> " +
        "       <input type = \"text\" id = \"search-user-input\" oninput=\"searchUser('"+ role +"')\" placeholder = \""+ role +"\" >" +
        "   </div>" +
        "</div>";

    var allInfo = "<div id='allInfo'>";
    var info = "";
    for(i=0; i<data.length; i++){
        if(data[i].role === role){
            var info = await getInfoU(data[i])
            allInfo = allInfo.concat(info)
        }
    }
    allInfo = allInfo.concat("</div>")
    var affichage = filtre.concat(allInfo);
    return affichage;
}


async function searchUser(role){
    var data = await requestApiNoBody("GET", "/users/")

    const input = document.getElementById('search-user-input');
    const search = input.value;

    var allInfo = ""
    const box = document.getElementById('allInfo');
    box.innerHTML = "";
    var dataName = ""
    for(i=0; i<data.length; i++) {
        if(data[i].role === role) {
            if (search.length > 0) {
                dataName = data[i].name
                if (dataName.includes(search)) {
                    var info = await getInfoU(data[i])

                    allInfo = allInfo.concat(info)
                }
            } else {
                var info = await getInfoU(data[i])

                allInfo = allInfo.concat(info)
            }
        }
    }
    box.innerHTML = allInfo
}