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
        var id  = infoLogin.getString("id", "")



        //--Initialisation des dates--------------------------
        val currentDate = LocalDate.now()
        val month = currentDate.month.getDisplayName(TextStyle.FULL, Locale.getDefault())
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



        val urlEvenement = "http://10.0.2.2:8000/api/user/"+ id +"/evenement"
        Log.d("url", urlEvenement )
        Log.d("Token", token.toString())

        val headers = HashMap<String, String>()
        headers["Authorization"] = "Bearer $token"

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