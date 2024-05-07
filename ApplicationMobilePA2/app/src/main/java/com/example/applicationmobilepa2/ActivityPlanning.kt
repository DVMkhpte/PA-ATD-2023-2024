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
import android.widget.ListView
import android.widget.Toast
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import org.json.JSONObject


class ActivityPlanning : AppCompatActivity() {
    @RequiresApi(Build.VERSION_CODES.O)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_planning)


        //--Resuperation des infoLogin---------------------
        var infoLogin = getSharedPreferences("save", MODE_PRIVATE)
        var token  = infoLogin.getString("token", "")
        if (token != null) {
            token = token.substringAfter("|")
        }
        var id  = infoLogin.getString("id", "")



        //--Initialisation des dates--------------------------
        val currentDate = LocalDate.now()
        val year = currentDate.year
        val month = currentDate.month.getDisplayName(TextStyle.FULL, Locale.getDefault())
        val monthInt = currentDate.month.value
        val today = currentDate.dayOfMonth

        val calendar = Calendar.getInstance()
        val dayWeek = calendar.get(Calendar.DAY_OF_WEEK)

        var tabDay = Array(7){1}
        for(i in 1..<dayWeek){
            tabDay[i-1]=today-i
        }
        var nbBoucle = 7-dayWeek
        for(i in 0..nbBoucle){
            tabDay[(dayWeek-1)+i]=today+i
        }



        //--Assignement des dates---------------------------------
        var monthTV = findViewById<TextView>(R.id.month)
        monthTV.text = month

        for(i in 0..6){
            val dayIdString = "jour$i"
            val dayId = resources.getIdentifier(dayIdString, "id", packageName)
            var calendarDay = findViewById<TextView>(dayId)
            calendarDay.text = tabDay[i].toString()
        }



        //--setUp de l'affichage---------------------------------------
        var jour0 = findViewById<TextView>(R.id.jour0)
        var jour1 = findViewById<TextView>(R.id.jour1)
        var jour2 = findViewById<TextView>(R.id.jour2)
        var jour3 = findViewById<TextView>(R.id.jour3)
        var jour4 = findViewById<TextView>(R.id.jour4)
        var jour5 = findViewById<TextView>(R.id.jour5)
        var jour6 = findViewById<TextView>(R.id.jour6)

        var date = "$year-$monthInt-"
        val selectDate = date.plus(today)
        requestApiPlanning(id, token, selectDate)

        jour0.setOnClickListener{
            val selectDate = date.plus(jour0.text.toString())
            requestApiPlanning(id, token, selectDate)
        }
        jour1.setOnClickListener{
            val selectDate = date.plus(jour1.text.toString())
            requestApiPlanning(id, token, selectDate)
        }
        jour2.setOnClickListener{
            val selectDate = date.plus(jour2.text.toString())
            requestApiPlanning(id, token, selectDate)
        }
        jour3.setOnClickListener{
            val selectDate = date.plus(jour3.text.toString())
            requestApiPlanning(id, token, selectDate)
        }
        jour4.setOnClickListener{
            val selectDate = date.plus(jour4.text.toString())
            requestApiPlanning(id, token, selectDate)
        }
        jour5.setOnClickListener{
            val selectDate = date.plus(jour5.text.toString())
            requestApiPlanning(id, token, selectDate)
        }
        jour6.setOnClickListener{
            val selectDate = date.plus(jour6.text.toString())
            requestApiPlanning(id, token, selectDate)
        }


    }

    private fun requestApiPlanning(idUser: String?, tokenUser: String?, date: String?) {
        val urlEvenement = "http://10.0.2.2:8000/api/user/"+ idUser +"/evenement"
        Log.d("selectDate", date.toString())
        Log.d("url", urlEvenement )
        Log.d("Token", tokenUser.toString())

        val headers = HashMap<String, String>()
        headers["Authorization"] = "Bearer $tokenUser"

        var queue = Volley.newRequestQueue(applicationContext)
        var request = StringRequest(
            Request.Method.GET, urlEvenement,
            Response.Listener { resultat ->
                Log.d("result", resultat.toString())
            },
            Response.ErrorListener { error ->
                Toast.makeText(applicationContext,"Erreur lors de la recuperation",Toast.LENGTH_SHORT).show()
                Log.d("error", error.toString())
            })

        queue.add(request)
    }
}