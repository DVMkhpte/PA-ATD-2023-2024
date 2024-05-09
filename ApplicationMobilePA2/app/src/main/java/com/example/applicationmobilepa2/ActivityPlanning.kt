package com.example.applicationmobilepa2

import android.content.Intent
import android.os.Build
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.TextView
import androidx.annotation.IdRes
import androidx.annotation.RequiresApi
import java.time.LocalDate
import java.time.format.TextStyle
import java.util.Locale
import java.util.Calendar
import android.widget.Button
import android.widget.EditText
import android.widget.ImageView
import android.widget.ListView
import android.widget.Toast
import androidx.lifecycle.lifecycleScope
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import kotlinx.coroutines.awaitAll
import org.json.JSONArray
import org.json.JSONObject
import kotlin.math.log
import java.text.SimpleDateFormat
import java.util.Date
import kotlin.coroutines.resume
import kotlin.coroutines.resumeWithException
import kotlin.coroutines.suspendCoroutine
import kotlinx.coroutines.*


class ActivityPlanning : AppCompatActivity() {
    @RequiresApi(Build.VERSION_CODES.O)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_planning)


        //--Recuperation des infoLogin-------------------------------
        var infoLogin = getSharedPreferences("save", MODE_PRIVATE)
        var token  = infoLogin.getString("token", "")
        if (token != null) {
            token = token.substringAfter("|")
        }
        var id  = infoLogin.getString("id", "")



        //--Initialisation des dates----------------------------------
        val currentDate = LocalDate.now()
        val year = currentDate.year

        val month = currentDate.month.getDisplayName(TextStyle.FULL, Locale.getDefault())
        val monthIntUnformated = currentDate.month.value
        val monthInt = "%02d".format(monthIntUnformated)

        val today =currentDate.dayOfMonth

        val calendar = Calendar.getInstance()
        val dayWeek = calendar.get(Calendar.DAY_OF_WEEK)

        var tabDay = Array(7){1}
        for(i in 1 until dayWeek){
            tabDay[(dayWeek-i)-1]=today-i
        }
        var nbBoucle = 7-dayWeek
        for(i in 0..nbBoucle){
            tabDay[(dayWeek-1)+i]=today+i
        }




        //--Assignement des dates--------------------------------------------------------
        var monthTV = findViewById<TextView>(R.id.month)
        monthTV.text = month

        for(i in 0..6){
            val dayIdString = "jour$i"
            val dayId = resources.getIdentifier(dayIdString, "id", packageName)
            var calendarDay = findViewById<TextView>(dayId)
            calendarDay.text = tabDay[i].toString()
        }



        //--setUp de l'affichage------------------------------------------------------
        var jour0 = findViewById<TextView>(R.id.jour0)
        var jour1 = findViewById<TextView>(R.id.jour1)
        var jour2 = findViewById<TextView>(R.id.jour2)
        var jour3 = findViewById<TextView>(R.id.jour3)
        var jour4 = findViewById<TextView>(R.id.jour4)
        var jour5 = findViewById<TextView>(R.id.jour5)
        var jour6 = findViewById<TextView>(R.id.jour6)

        var listActivity = mutableListOf<Planning>()

        var date = "$year-$monthInt-"
        var selectDate = date.plus("%02d".format(today))

        lifecycleScope.launch {
            listActivity = requestApiPlanning(id, token, selectDate, "evenement")
            listActivity += requestApiPlanning(id,token,selectDate, "formation")
            listActivity += requestApiPlanning(id,token,selectDate, "mission")

            var lv = findViewById<ListView>(R.id.lv_planning)
            var adap = PlanningAdaptater(applicationContext, listActivity)
            lv.adapter = adap
        }


        //--Choix de la date-------------------------------------------------------------
        val jours = listOf(jour0, jour1, jour2, jour3, jour4, jour5, jour6)
        jours.forEachIndexed { index, button ->
            button.setOnClickListener {

                selectDate = date.plus("%02d".format(button.text.toString().toInt()))
                lifecycleScope.launch {
                    listActivity = requestApiPlanning(id, token, selectDate, "evenement")
                    listActivity += requestApiPlanning(id,token,selectDate, "formation")
                    listActivity += requestApiPlanning(id,token,selectDate, "mission")

                    var lv = findViewById<ListView>(R.id.lv_planning)
                    var adap = PlanningAdaptater(applicationContext, listActivity)
                    lv.adapter = adap
                }
            }
        }



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

        var afficheageProfil = findViewById<ImageView>(R.id.menu)
        afficheageProfil.setOnClickListener{
            val i = Intent(this,ActivityProfil::class.java)
            startActivity(i)
        }

    }

    private suspend fun requestApiPlanning(idUser: String?, tokenUser: String?, datePlanning: String, type: String): MutableList<Planning> {
        return suspendCoroutine { continuation ->
            val listActivity = mutableListOf<Planning>()

            val queue = Volley.newRequestQueue(applicationContext)
            val requestEvent = object : StringRequest(
                Method.GET,
                "http://10.0.2.2:8000/api/user/$idUser/$type",
                Response.Listener { resultat ->
                    val jsonGlobal = JSONArray(resultat)

                    if (jsonGlobal.length() > 0) {
                        for (i in 0 until jsonGlobal.length()) {
                            val br = jsonGlobal.getJSONObject(i)
                            if(type == "mission"){

                                var dateActivity = br.getString("date")
                                dateActivity = dateActivity.substringBefore(" ")

                                if (dateActivity == datePlanning) {
                                    val date = br.getString("date").substring(5)
                                    val event = Planning(
                                        br.getInt("id"),
                                        type,
                                        br.getString("type"),
                                        date,
                                        br.getString("adresse"),
                                        br.getString("demande")
                                    )
                                    listActivity.add(event)
                                }

                            }else {

                                var dateActivity = br.getString("date_debut")
                                dateActivity = dateActivity.substringBefore(" ")

                                if (dateActivity == datePlanning) {
                                    val debut = br.getString("date_debut").substring(5)
                                    val fin = br.getString("date_fin").substring(5)
                                    val date = "$debut \n$fin"

                                    var fullAdresse = ""
                                    if(type == "evenement"){
                                        val ville = br.getString("ville")
                                        val adresse = br.getString("adresse")
                                        fullAdresse = "$adresse, $ville"
                                    }else{
                                        fullAdresse = br.getString("adresse")
                                    }

                                    val event = Planning(
                                        br.getInt("id"),
                                        type,
                                        br.getString("nom"),
                                        date,
                                        fullAdresse,
                                        br.getString("description")
                                    )
                                    listActivity.add(event)
                                }

                            }
                        }
                    }
                    continuation.resume(listActivity)
                },
                Response.ErrorListener { error ->
                    Toast.makeText(applicationContext, "Erreur lors de la récupération", Toast.LENGTH_SHORT).show()
                }) {
                override fun getHeaders(): MutableMap<String, String> {
                    val headers = HashMap<String, String>()
                    headers["Authorization"] = "Bearer $tokenUser"
                    return headers
                }
            }
            queue.add(requestEvent)
        }
    }
}