package com.example.applicationmobilepa2

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log

class ActivityPlanning : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_planning)

        var infoLogin = getSharedPreferences("save", MODE_PRIVATE)
        var token  = infoLogin.getString("token", "")
        if (token != null) {
            Log.d("token", token)
        }
        var id  = infoLogin.getString("id", "")
        if (id != null) {
            Log.d("id", id)
        }
    }
}