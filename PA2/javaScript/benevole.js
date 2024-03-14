async function affichageBenevole(affichage) {
    const gestionTitre = document.getElementById('titre');
    gestionTitre.innerHTML = "";

    const resTitre = affichage
    gestionTitre.innerHTML = resTitre;
    
    var resetStyle = document.getElementsByClassName("div_img");
    
    for(var i=0; i<resetStyle.length; i++){
        resetStyle[i].style.boxShadow = "none";
        resetStyle[i].style.backgroundColor = "#83EE99";
    }
    

    var modifElement = document.getElementById(affichage);
    if(modifElement){
        modifElement.style.boxShadow = "inset 0px 4px 4px rgba(0, 0, 0, 0.25)";
        modifElement.style.backgroundColor = "#59CD97";
    }
    
    
    const gestionInfos = document.getElementById('container_2');
    gestionInfos.innerHTML = "";
    const resBox = await fetch('../api/benevole_api.php?affichage=' + affichage);
    const strBox = await resBox.text();
    gestionInfos.innerHTML = strBox;
    
    
}