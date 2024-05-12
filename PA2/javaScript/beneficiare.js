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
            strBox = await affichageMesDemande();
            break;

        case "Mes Activité":
            var data = await requestApiNoBody("GET", "/activitees/");
            strBox = await affichageMesActivitee(data);
            break;
        case "Planning":
            var token = localStorage.getItem('token');
            var userId = localStorage.getItem('id');
            var url = 'http://localhost:3000/?token=' + encodeURIComponent(token) + '&userId=' + encodeURIComponent(userId);
            window.location.href = url;
            break;
    }

    const affichageContainer = document.getElementById('container_2');
    affichageContainer.innerHTML = strBox;
    
    
}


async function extractionPdf(){
    var data = await requestApiNoBody("GET", "/user")

    var textPdf =
        "<h1>Profil :</h1>" +
        "<div class=\"info_profil_1\">" +
        "    <div id=\"nom_profil\" class=\"info_profil\">" + data.name + "</div>" +
        "   <div id=\"num_profil\" class=\"info_profil\">" + data.num_telephone + "</div>" +
        "</div>" +
        "<div class=\"info_profil_2\">" +
        "   <div id=\"email_profil\" class=\"info_profil\">" + data.email + "</div>" +
        "</div>" +
        "<div class=\"info_profil_3\">" +
        "    <div id=\"ville_profil\" class=\"info_profil\">" + data.adresse + ", " + data.code_postal + " " + data.ville + "</div>" +
        "</div>"

    var opt = {
        margin:  10,
        filename:     'myInfo.pdf',
        image:        { type: 'jpeg', quality: 1 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(textPdf).save()
}


async function updateProfil(){
    window.location.href ="../pages/modif_profil.php"
}

async function aide(){
    window.location.href ="../pages/ticketForm.php"
}