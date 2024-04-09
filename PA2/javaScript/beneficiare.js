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
            //var data = await requestApiNoBody("GET", "/activitees/");
            data = ""
            strBox = await affichageActivity(data);
            break;

        case "Demande":
            strBox = await affichageDemande();
            break;

        case "Mes demande":
            var data = [
                {
                    "type": "Demande 1",
                    "fait_par": { "id":1, "name": "John Doe" },
                    "date": "2024-04-08",
                    "demande": "Ceci est la première demande."
                },
                {
                    "type": "Demande 2",
                    "fait_par": { "id":1,"name": "Jane Smith" },
                    "date": "2024-04-07",
                    "demande": "Ceci est la deuxième demande."
                },
                {
                    "type": "Demande 3",
                    "fait_par": {"id":2, "name": "Alice Johnson" },
                    "date": "2024-04-06",
                    "demande": "Ceci est la troisième demande."
                }
            ];
            //var data = await requestApiNoBody("GET", "/activitees/");
            strBox = await affichageMesDemande(data,1);
            break;

        case "Mes Activité":
            //var data = await requestApiNoBody("GET", "/activitees/");
            strBox = await affichageMesActivitee(data,id);
            break;
    }

    const affichageContainer = document.getElementById('container_2');
    affichageContainer.innerHTML = strBox;
    
    
}