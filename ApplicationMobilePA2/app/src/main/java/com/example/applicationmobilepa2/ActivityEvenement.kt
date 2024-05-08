package com.example.applicationmobilepa2

import android.content.Intent
import android.os.Build
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.ImageView
import android.widget.ListView
import android.widget.Toast
import androidx.annotation.RequiresApi
import androidx.appcompat.app.AlertDialog
import androidx.lifecycle.lifecycleScope
import com.android.volley.Response
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import kotlinx.coroutines.launch
import org.json.JSONArray
import java.time.LocalDate
import kotlin.coroutines.resume

class ActivityEvenement : AppCompatActivity() {
    @RequiresApi(Build.VERSION_CODES.O)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_evenement)

        //--Resuperation des infoLogin---------------------
        var infoLogin = getSharedPreferences("save", MODE_PRIVATE)
        var token  = infoLogin.getString("token", "")
        if (token != null) {
            token = token.substringAfter("|")
        }
        var id  = infoLogin.getString("id", "")


        //--Initialisation de l'affichage------------------------
        val currentDate = LocalDate.now()
        val year = currentDate.year

        val listEvent = mutableListOf<Evenement>()

        val queue = Volley.newRequestQueue(applicationContext)
        val requestEvent = object : StringRequest(
            Method.GET,
            "http://10.0.2.2:8000/api/user/$id/evenement",
            Response.Listener { resultat ->
                val jsonGlobal = JSONArray(resultat)

                if (jsonGlobal.length() > 0) {
                    for (i in 0 until jsonGlobal.length()) {
                        val br = jsonGlobal.getJSONObject(i)

                        val date_debut = br.getString("date_debut").substring(5)
                        val date_fin = br.getString("date_fin").substring(5)
                        val date = "$date_debut - $date_fin, $year"

                        val ville = br.getString("ville")
                        val adresse = br.getString("adresse")
                        val fullAdresse = "$adresse, $ville"

                        var evenement:Evenement = Evenement(
                            br.getInt("id"),
                            br.getString("nom"),
                            br.getString("description"),
                            date,
                            br.getString("type"),
                            fullAdresse
                        )
                        listEvent.add(evenement)
                    }
                    var lv = findViewById<ListView>(R.id.lv_evenement)
                    var adap = EvenementAdaptater(applicationContext, listEvent)
                    lv.adapter = adap

                    lv.setOnItemClickListener{adapter,view,position,id ->
                        var ba = adapter.adapter as EvenementAdaptater
                        var item = ba.getItem(position) as Evenement

                        var popup = AlertDialog.Builder(this)
                        popup.setTitle(item.nom)
                        var info = "${item.date}\n\nDescription : ${item.description}"
                        popup.setMessage(info)

                        popup.setNegativeButton("ok"){ dialog, wich ->
                            dialog.dismiss()
                        }
                        popup.show()

                    }
                }
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
        queue.add(requestEvent)

        //--Navigation--------------------------------------------------------------------
        var afficheagePlanning = findViewById<ImageView>(R.id.planning)
        afficheagePlanning.setOnClickListener{
            val i = Intent(this,ActivityPlanning::class.java)
            startActivity(i)
        }

        var afficheageMission = findViewById<ImageView>(R.id.mission)
        afficheageMission.setOnClickListener{
            val i = Intent(this,ActivityMission::class.java)
            startActivity(i)
        }

        var afficheageFormation = findViewById<ImageView>(R.id.formation)
        afficheageFormation.setOnClickListener{
            val i = Intent(this,ActivityFormation::class.java)
            startActivity(i)
        }

        var afficheageEvenement = findViewById<ImageView>(R.id.evenement)
        afficheageEvenement.setOnClickListener{
            val i = Intent(this,ActivityEvenement::class.java)
            startActivity(i)
        }

    }
}