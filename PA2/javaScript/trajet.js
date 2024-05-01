
async function newTrajet(origin, arrivee, tabEtapes){
    var tabEtapesTrie = [origin]
    var depart, distance, distanceMin, adresseMin

    var nbEtape = tabEtapes.length
    for(i=0; i<nbEtape; i++) {
        distanceMin = await getDistance(tabEtapesTrie[0], tabEtapes[0])
        distanceMin = parseFloat(distanceMin.match(/[\d,\.]+/)[0].replace(",", "."));
        adresseMin = tabEtapes[0]
        depart=tabEtapesTrie[i]

        for (j = 0; j < tabEtapes.length; j++){
            distance = await getDistance(depart, tabEtapes[j])
            distance = parseFloat(distance.match(/[\d,\.]+/)[0].replace(",", "."));

            if(distance < distanceMin){
                distanceMin = distance
                adresseMin = tabEtapes[j]
            }
        }
        tabEtapes = tabEtapes.filter(element => element !== adresseMin);
        tabEtapesTrie.push(adresseMin)
    }

    tabEtapesTrie.push(arrivee)

    return tabEtapesTrie
}

async function newCollecte(){
    const newForm = document.getElementById("mainStock")
    const dataEntrepot = await requestApiNoBody("GET", "/entrepots/")
    const dataCommercants = await requestApiNoBody("GET", "/commercants/")

    var form =
        "<div class='newTrajet'>" +
        "   <div class='newFormTrajet'>" +
        "       <select class=\"selectEntrepot\" name=\"status\" id=\"entrepotOrigin\" required>\n" +
        "           <option selected disabled hidden id=\"entrepot\" >Entrepot Origin</option>\n"+
        "           <option value='"+ dataEntrepot[0].adresse +"'>"+ dataEntrepot[0].nom +"</option>" +
        "           <option value='"+ dataEntrepot[1].adresse +"'>"+ dataEntrepot[1].nom +"</option>"+
        "       </select>\n"+
        "       <div>Selectionnez les etapes :</div>"+
        "       <div class='allCheckbox'>"
    for(i=0; i<dataCommercants.length; i++) {
        form +=
        "    <div class='checkbox'>"+
        "           <input class='checkboxCommercants' type=\"checkbox\" id='"+ dataCommercants[i].id +"' name='"+ dataCommercants[i].id +"'>\n" +
        "           <label for='"+ dataCommercants[i].id +"'>"+ dataCommercants[i].nom +"</label>" +
        "   </div>"
    }
    form +=
        "       </div>" +
        "       <select class=\"selectEntrepot\" name=\"status\" id=\"entrepotDestination\" required>\n" +
        "           <option selected disabled hidden id=\"entrepotDestination\" >Entrepot destination</option>\n" +
        "           <option value='" + dataEntrepot[0].adresse + "'>" + dataEntrepot[0].nom + "</option>" +
        "           <option value='" + dataEntrepot[1].adresse + "'>" + dataEntrepot[1].nom + "</option>" +
        "       </select>\n"+
        "       <input class=\"inputDate\" type=\"datetime-local\" id=\"date\" required>" +
        "       <div class='validTrajet'>"+
        "           <button class='validTrajetButton' onclick='validCollect()'>Generer le trajet</button>" +
        "        </div>"+
        "   </div>" +
        "   <div id='recap'>" +
        "       "+
        "   </div>" +
        "</div>"

    newForm.innerHTML = form
}
async function validCollect(){
    const dataCommercants = await requestApiNoBody("GET", "/commercants/")

    const origines = document.getElementById("entrepotOrigin").value
    const destination = document.getElementById("entrepotDestination").value
    const date = document.getElementById("date").value
    var etapes = []
    for(i=0; i<dataCommercants.length; i++){
        var checkboxValue = document.getElementById(dataCommercants[i].id).checked;
        if (checkboxValue) {
            etapes.push(dataCommercants[i].adresse)
        }
    }

    var tabEtapesTrie = await newTrajet(origines, destination, etapes)


    const addReacap = document.getElementById("recap")

    var nbEtape = tabEtapesTrie.length
    var recap =
        "<div id='pdf'>"+
        "   <h2 id='titre' > Nouvelle collecte </h2>" +
        "   <h3 id='feuilleDeRoutes'>Feuille de route</h3>" +
        "   <div id='routes'>" +
        "       Pour le : " +
        "       <div id='date'>"+ date +"</div> "+
        "       <div id='depart'>Depart : "+ tabEtapesTrie[0] +"</div>"
    for(i=1; i<nbEtape -1; i++) {
        recap += "<div id='etape" + i + "'>Etape " + i + " : " + tabEtapesTrie[i] + "</div>"
    }

    recap +=
        "       <div id='destination'>Destination : "+ tabEtapesTrie[nbEtape -1] +"</div>"+
        "   </div>" +
        "</div>" +
        "<div class='option trajet'>" +
        "   <button class='addNewTrajet' onclick='validTrajet("+ (nbEtape - 1) +", \"collecte\")'>Valider cette collecte</button>" +
        "</div>"

    addReacap.innerHTML = recap


}

async function newMaraude(){

}





async function validTrajet(nbEtapes, type){
    var textAsk = ""
    var getText
    var textPdf = document.getElementById("pdf")

    var pdfName = 'trajet-'+ type +'.pdf'
    var opt = {
        margin:  0.5,
        filename:     'trajet.pdf',
        image:        { type: 'jpeg', quality: 1 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(textPdf).save()


    getText = document.getElementById("depart")
    textAsk += getText.innerText+"  "

    for(i=1; i<nbEtapes; i++){
        getText = document.getElementById("etape"+i)
        textAsk += getText.innerText+"  "
    }
    getText = document.getElementById("destination")
    textAsk += getText.innerText+"  "

    var date = document.getElementById("date").value

    const formData = {
        type: "collecte",
        demande: textAsk,
        permis: "0",
        etat : "valide",
        date: date
    };
    console.log(formData)
    try {
        const response = await requestApi(formData, "POST", "/demande/add");
        showAlert("Création de la demande !");

    } catch (error) {
        showAlert('Erreur lors de la requête à l\'API : ' + error.message);
    }
}


