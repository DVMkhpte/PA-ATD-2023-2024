package com.example.applicationmobilepa2

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
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

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        var login = findViewById<Button>(R.id.login)
        login.setOnClickListener{
            var email=findViewById<EditText>(R.id.email)
            var emailString=email.text.toString()
            var mdp=findViewById<EditText>(R.id.mdp)
            var mdpString=mdp.text.toString()

            val formData = JSONObject().apply {
                put("email", emailString)
                put("password", mdpString)
            }

            val queue = Volley.newRequestQueue(applicationContext)
            val url = "http://10.0.2.2:8000/api/user/login"
            val jsonObjectRequest = JsonObjectRequest(Request.Method.POST, url, formData,
                {resultat ->
                    val jsonObject = JSONObject(resultat.toString())
                    if (jsonObject.has("token") ){
                        val token = jsonObject.getString("token")
                        val role = jsonObject.getString("role")
                        val id = jsonObject.getString("id")

                        if (role == "benevole") {
                            var saveInfo = getSharedPreferences("save", MODE_PRIVATE)
                            var edit = saveInfo.edit()
                            edit.putString("token", token)
                            edit.putString("role", role)
                            edit.putString("id", id)
                            edit.apply()


                            var a = Intent(this, ActivityPlanning::class.java)
                            startActivity(a)
                        }
                    }else{
                        Toast.makeText(applicationContext,"Erreur lors de la connexion",Toast.LENGTH_SHORT).show()
                    }
                },
                {error ->
                    Toast.makeText(applicationContext,"Erreur lors de la connexion",Toast.LENGTH_SHORT).show()
                })

            queue.add(jsonObjectRequest)


        }
    }
}