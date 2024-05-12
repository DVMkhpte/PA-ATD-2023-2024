package com.example.applicationmobilepa2

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.ListView
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import com.android.volley.Response
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import org.json.JSONArray
import org.json.JSONObject

class ActivityProfil : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_profil)

        //--Recuperation des infoLogin----------------------------------------------------
        var infoLogin = getSharedPreferences("save", MODE_PRIVATE)
        var token  = infoLogin.getString("token", "")
        if (token != null) {
            token = token.substringAfter("|")
        }
        var id  = infoLogin.getString("id", "")


        //--Affichage----------------------------------------------------------------------
        val queue = Volley.newRequestQueue(applicationContext)
        val requestProfil = object : StringRequest(
            Method.GET,
            "http://autempsdonne.com:8000/api/user",
            Response.Listener { resultat ->
                var infoProfil = JSONObject(resultat.toString())

                var nom = findViewById<TextView>(R.id.nom)
                nom.text = infoProfil.getString("name")

                var email = findViewById<TextView>(R.id.email)
                email.text = infoProfil.getString("email")

                var adresse1 = findViewById<TextView>(R.id.adresse1)
                adresse1.text = infoProfil.getString("adresse")

                var ville = infoProfil.getString("ville")
                var codePostal = infoProfil.getString("code_postal")
                var adresse2 = findViewById<TextView>(R.id.adresse2)
                adresse2.text = "$codePostal, $ville"

                var numPhone = findViewById<TextView>(R.id.numPhone)
                numPhone.text = infoProfil.getString("num_telephone")


            },
            Response.ErrorListener { error ->
                Toast.makeText(applicationContext, "Erreur lors de la récupération", Toast.LENGTH_SHORT).show()
            }) {
            override fun getHeaders(): MutableMap<String, String> {
                val headers = HashMap<String, String>()
                headers["Authorization"] = "Bearer $token"
                return headers
            }
        }
        queue.add(requestProfil)


        var retour = findViewById<TextView>(R.id.retour)
        retour.setOnClickListener{
            finish()
        }

        var finishTask = findViewById<TextView>(R.id.logOut)
        finishTask.setOnClickListener{

        }


    }
}