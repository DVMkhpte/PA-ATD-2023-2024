package com.example.applicationmobilepa2

class Mission {

    var id = 0
    var type = ""
    var demande = ""
    var etat = ""
    var adresse = ""
    var date =""
    var faitPar =""
    var permis =""

    constructor(id: Int, type: String, demande: String, etat: String, adresse: String, date: String, faitPar: String, pemris: String) {
        this.id = id
        this.type = type
        this.demande = demande
        this.etat = etat
        this.adresse = adresse
        this.date = date
        this.faitPar = faitPar
        this.permis = permis
    }
}