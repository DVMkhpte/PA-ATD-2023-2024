
async function affichageBackEnd(affichage) {
    const retirerTitreAdmin = document.getElementById('titre');
    retirerTitreAdmin.innerHTML = "";
    const resTitre = affichage
    const affichageTitreAdmin = document.getElementById('titre');
    affichageTitreAdmin.innerHTML = resTitre;

    const retirerBoxAdmin = document.getElementById('box');
    retirerBoxAdmin.innerHTML = "";
    const resBox = await fetch('../fetch/back_end_api.php?affichage=' + affichage);
    const strBox = await resBox.text();
    const affichageBoxAdmin = document.getElementById('box');
    affichageBoxAdmin.innerHTML = strBox;
}

function trie(filtre){
    console.log(filtre);
}