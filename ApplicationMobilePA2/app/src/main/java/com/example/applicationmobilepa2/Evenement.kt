package com.example.applicationmobilepa2

class Evenement {

    var id = 0
    var nom = ""
    var description = ""
    var date = ""
    var type = ""
    var adresse = ""

    constructor(id: Int, nom: String, description: String, date: String, type: String, adresse: String) {
        this.id = id
        this.nom = nom
        this.description = description
        this.date = date
        this.type = type
        this.adresse = adresse
    }
}