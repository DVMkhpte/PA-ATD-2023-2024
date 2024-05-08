package com.example.applicationmobilepa2

class Planning {
    var id = 0
    var type = ""
    var nom = ""
    var date = ""
    var adresse = ""
    var description = ""

    constructor(id: Int, type: String, nom: String, date: String, description: String, adresse: String) {
        this.id = id
        this.type = type
        this.nom = nom
        this.date = date
        this.adresse = adresse
        this.description = description
    }
}