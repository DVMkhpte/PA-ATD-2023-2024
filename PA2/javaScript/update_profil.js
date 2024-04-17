function redirectModifProfil(){
    window.location.href = "modif_profil.php";
}

function modif(numId){
    var input = document.getElementById("input-"+numId);
    input.style.display="block";
}

window.onload = function affichage_start(){
    for(var i=1; i<7; i++){
        var modif_input = document.getElementById("input-"+i);
        modif_input.style.display="none";
    }
}


async function validModif() {

    const nom = document.getElementById('input-nom').value;
    const prenom = document.getElementById('input-prenom').value;
    const ville = document.getElementById('input-ville').value;
    const adresse = document.getElementById('input-adresse').value;
    const codePostal = document.getElementById('input-codePostal').value;
    const numPhone = document.getElementById('input-numPhone').value;
    const eamil = document.getElementById('input-email').value;

    const formData = {
        nom: nom,
        prenom: prenom,
        ville: ville,
        adresse: adresse,
        code_postal: codePostal,
        num_phone: numPhone,
        email: email
    };

    console.log(formData)

    /*
    try {
        const response = await requestApi(formData, "POST", "/activitees/add");
        if (response.status === 200) {
            showAlert("Création de l'activitée réussie !");
        } else {
            showAlert("Erreur lors de la création de l'utilisateur : " + response.status);
        }
    } catch (error) {
        showAlert('Erreur lors de la requête à l\'API : ' + error.message);
    }
    */
}