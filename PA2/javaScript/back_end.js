
async function affichageBackEnd(affichage) {
    const retirerTitreAdmin = document.getElementById('titre');
    retirerTitreAdmin.innerHTML = "";
    const resTitre = affichage
    const affichageTitreAdmin = document.getElementById('titre');
    affichageTitreAdmin.innerHTML = resTitre;

    const retirerBoxAdmin = document.getElementById('box');
    retirerBoxAdmin.innerHTML = "";

    var strBox = ""

    //requestApi(formData, method, link)
    switch (affichage) {
        case 'Bénévoles':
            var data = await requestApiNoBody("GET", "/users/")
            strBox = await affichageUser(data, "benevole");

            break;

        case 'Bénéficiaires':
            var data = await requestApiNoBody("GET", "/users/");
            strBox = await affichageUser(data, "beneficiaire");

            break;

        case 'Admin':
            var data = await requestApiNoBody("GET", "/users/");
            strBox = await affichageUser(data, "admin");

            break;

        case 'Activitées':
            var data = await requestApiNoBody("GET", "/activitees/");
            strBox = await affichageActivitee(data);
            break;

        case 'Formations':
            var data = await requestApiNoBody("GET", "/formations");
            var strBox = await affichageFormation(data);
            break;

        case 'Demandes':
            var data = await requestApiNoBody("GET", "/demande");
            strBox = await affichageDemande(data);
            break;

        case 'Missions':
            var data = await requestApiNoBody("GET", "/missions");
            strBox = await affichageMission(data);
            break;

        case "Evenement":
            var data = await requestApiNoBody("GET", "/evenements");
            strBox = await affichageEvenement(data);
            break;

        case "Stock" :
            window.location.href ="../pages/stock.php"
            break;

        default:
            break;
    }

    const affichageBoxAdmin = document.getElementById('box');
    affichageBoxAdmin.innerHTML = strBox;

}


async function updateRoleUser(id, role){
    console.log(role)
    console.log(id)
    var formData =
    {
        "role": role
    }
    try {
        const response = await requestApi(formData, "PATCH", "/users/"+id);
        showAlert("Changement de role effectué");
    } catch (error) {
        showAlert('Erreur lors de la requête à l\'API : ' + error.message);
    }
    switch (role){
        case "benevole":
            affichageBackEnd("Bénévoles")
            break;
        case "admin":
            console.log("admin")
            affichageBackEnd("Admin")
            break;

    }


}

function add(link){
    window.location.href ="../pages/newPage/" + link
}

function hide(id){
    const hideDive = document.getElementById(id)
    hideDive.innerHTML = ""
}


function getAllType(data){
    var allTypes = []
    for (i = 0; i < data.length; i++) {
        if(!(allTypes.includes(data[i].type))){
            allTypes.push(data[i].type)
        }
    }
    return allTypes
}

async function  getAllUserNameByRole(role){
    var data = await requestApiNoBody("GET", "/users/")

    var userNameList = {}
    for(i=0;i<data.length;i++) {
        if (data[i].role === role){
           userNameList[data[i].id] = data[i].name
        }
    }
    return userNameList
}

