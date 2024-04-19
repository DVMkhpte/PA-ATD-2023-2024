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
    
    
    switch (affichage){
        case "Formation":
            var data = await requestApiNoBody("GET", "/formations");
            var strBox = await affichageFormation(data);
            break;

        case "Demande en attente":
            var data = await requestApiNoBody("GET", "/demande");
            var strBox = await affichageDemande(data);
            break;

        case "Mes missions":
            var data = await requestApiNoBody("GET", "/missions");
            var strBox = await affichageMesMission(data)
            break;

        case "Mes Formations":
            var data = await requestApiNoBody("GET", "/participef");
            var strBox = await affichageMesFormation(data)
            break;

        case "Evenement":
            var data = await requestApiNoBody("GET", "/evenements");
            strBox = await affichageEvenement(data);
            break;

        case "Mes evenement":
            var data = await requestApiNoBody("GET", "/evenements");
            strBox = await affichageMesEvent(data);
            break;

        default:
            break;
    }

    const affichageContainer = document.getElementById('container_2');
    affichageContainer.innerHTML = strBox;
    
    
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