package com.example.applicationmobilepa2

class Formation {
    var id = 0
    var nom = ""
    var description = ""
    var date = ""
    var adresse = ""

    constructor(id: Int, nom: String, description: String, date: String, adresse: String) {
        this.id = id
        this.nom = nom
        this.description = description
        this.date = date
        this.adresse = adresse
    }
}