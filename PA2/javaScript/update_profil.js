
function modif(numId){
    var input = document.getElementById("input-"+numId);
    input.style.display="block";
}



async function validModif() {

    const name = document.getElementById('input-1').value;
    const email = document.getElementById('input-2').value;
    const codePostal = document.getElementById('input-4').value;
    const ville = document.getElementById('input-ville').value;
    const adresse = document.getElementById('input-adresse').value;
    const numPhone = document.getElementById('input-5').value;

    const formData = {
        "name": name,
        "email": email,
        "code_postal": codePostal,
        "ville": ville,
        "adresse": adresse,
        "num_phone": numPhone,
    };

    console.log(formData)


    try {
        const response = await requestApi(formData, "PATCH", "/user/updates");
        showAlert("Création de l'activitée réussie !");


        var roleUser = localStorage.getItem('role')
        if(roleUser === "benevole"){
            window.location.href ='../pages/benevole.php'
        }else if(roleUser === "beneficiaire"){
            window.location.href ='../pages/beneficiary.php'
        }

    } catch (error) {
        showAlert('Erreur lors de la requête à l\'API : ' + error.message);
    }

}