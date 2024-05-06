async function affichageBenevole(affichage) {
    const gestionTitre = document.getElementById('titre');
    gestionTitre.innerHTML = "";

    const resTitre = affichage
    gestionTitre.innerHTML = resTitre;
    
    var resetStyle = document.getElementsByClassName("div_img");
    
    for(var i=0; i<resetStyle.length; i++){
        resetStyle[i].style.boxShadow = "none";
        resetStyle[i].style.backgroundColor = "#38A7A6";
    }
    

    var modifElement = document.getElementById(affichage);
    if(modifElement){
        modifElement.style.boxShadow = "inset 0px 4px 4px rgba(0, 0, 0, 0.25)";
        modifElement.style.backgroundColor = "#59CD97";
    }

    const retirerContainer = document.getElementById('container_2');
    retirerContainer.innerHTML = "";

    var strBox = ""
    var data = []
    
    switch (affichage){
        case "Formation":
            data = await requestApiNoBody("GET", "/formations");
            strBox = await affichageFormation(data);
            break;

        case "Demande en attente":
            data = await requestApiNoBody("GET", "/demande");
            strBox = await affichageDemande(data);
            break;

        case "Mes missions":
            data = await requestApiNoBody("GET", "/missions");
            strBox = await affichageMesMission(data)
            break;

        case "Mes Formations":
            var idU = localStorage.getItem("id")
            var link = "/user/"+ idU +"/participationsF"
            data = await requestApiNoBody("GET", link);
            strBox = await affichageMesFormation(data)
            break;

        case "Evenement":
            data = await requestApiNoBody("GET", "/evenements");
            strBox = await affichageEvenement(data);
            break;

        case "Mes evenement":
            data = await requestApiNoBody("GET", "/evenements");
            strBox = await affichageMesEvent(data);
            break;

        default:
            break;
    }

    const affichageContainer = document.getElementById('container_2');
    affichageContainer.innerHTML = strBox;
    
    
}


async function deconexion(){
    var token = localStorage.getItem("token")
    var logOutForm = {
        "token": token
    }
    console.log(logOutForm)
    await requestApi(logOutForm, "POST", "/user/logout")
    window.location.href ="../pages"
}


async function extractionPdf(){
    var textPdf = document.getElementById("info_profil_general")

    var pdfName = 'myInfo.pdf'
    var opt = {
        margin:  10,
        filename:     pdfName,
        image:        { type: 'jpeg', quality: 1 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(textPdf).save()
}

async function updateProfil(){
    window.location.href ="../pages/modif_profil.php"
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