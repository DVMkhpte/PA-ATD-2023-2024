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
            //var data = await requestApiNoBody("GET", "/formations");
            var data = [
                {
                    id: "1",
                    nom: "si mais",
                    type: "Type 1",
                    adresse: "123 Rue de la Rue",
                    date_debut: "01/04/2024",
                    date_fin: "03/04/2024",
                    description: "Ceci est la description de l'activité 1",
                    nb_place: 20,
                    supervisor: {
                        name: "Superviseur 1"
                    }
                },
                {
                    id: "2",
                    nom: "mais non",
                    type: "Type 2",
                    adresse: "456 Avenue de l'Avenue",
                    date_debut: "05/04/2024",
                    date_fin: "07/04/2024",
                    description: "Ceci est la description de l'activité 2",
                    nb_place: 15,
                    supervisor: {
                        name: null
                    }
                }
            ]
            var strBox = await affichageFormation(data);
            break;

        case "Mission":
            //var data = await requestApiNoBody("GET", "/demande");
            var data = [
                {
                    "id": 1,
                    "type": "typetest",
                    "demande": "Bonjour",
                    "id_user": 3,
                    "etat": "En attente",
                    "updated_at": "2024-02-22T10:08:55.000000Z",
                    "created_at": "2024-02-22T10:08:55.000000Z",
                    "user": {
                        "id": 3,
                        "name": "Enzo",
                        "code_postal": 0,
                        "ville": "",
                        "adresse": "",
                        "num_telephone": 0,
                        "email": "cocodoudo@gmail.com",
                        "role": "admin",
                        "email_verified_at": null,
                        "created_at": "2024-02-12T20:45:43.000000Z",
                        "updated_at": "2024-02-12T20:45:43.000000Z"
                    }
                }
            ]
            var strBox = await affichageMission(data);
            break;

        case "Mes missions":
            //var data = await requestApiNoBody("GET", "/mission");
            var data = ""
            var strBox = await affichageMesMission(data)
            break;

        case "Mes Formations":
            //var data = await requestApiNoBody("GET", "/formation");
            var data = ""
            var strBox = await affichageMesFormation(data)
            break;

        default:
            break;
    }

    const affichageContainer = document.getElementById('container_2');
    affichageContainer.innerHTML = strBox;
    
    
}