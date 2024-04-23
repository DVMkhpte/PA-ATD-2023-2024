async function affichageBeneficiaire(affichage) {
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
        case "Activitée":
            var data = await requestApiNoBody("GET", "/activitees/");
            strBox = await affichageActivity(data);
            break;

        case "Demande":
            strBox = await affichageDemande();
            break;

        case "Mes demande":
            //var data = await requestApiNoBody();
            strBox = await affichageMesDemande(data);
            break;

        case "Mes Activité":
            var data = await requestApiNoBody("GET", "/activitees/");
            strBox = await affichageMesActivitee(data);
            break;
    }

    const affichageContainer = document.getElementById('container_2');
    affichageContainer.innerHTML = strBox;
    
    
}