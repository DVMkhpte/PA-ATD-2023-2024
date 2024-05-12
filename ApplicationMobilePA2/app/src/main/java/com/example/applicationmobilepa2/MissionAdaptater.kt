package com.example.applicationmobilepa2

import android.content.Context
import android.os.Build
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.BaseAdapter
import android.widget.TextView
import androidx.annotation.RequiresApi
import java.time.LocalDate

class MissionAdaptater : BaseAdapter {
    var context: Context
    var listeActivityMission: MutableList<Mission> = mutableListOf()

    constructor(context: Context, listeActivityMission: MutableList<Mission>) : super() {
        this.context = context
        this.listeActivityMission = listeActivityMission
    }


    override fun getCount(): Int {
        return this.listeActivityMission.size;
    }

    override fun getItem(position: Int): Any {
        return this.listeActivityMission.get(position)
    }

    override fun getItemId(position: Int): Long {
        return 0;
    }

    @RequiresApi(Build.VERSION_CODES.O)
    override fun getView(position: Int, convertView: View?, parent: ViewGroup?): View {
        var v: View

        if (convertView == null) {
            var inflater = LayoutInflater.from(this.context)
            v = inflater.inflate(R.layout.row_mission, null)
        } else {
            v = convertView
        }
        var current = getItem(position) as Mission
        var name = v.findViewById<TextView>(R.id.tv_type)
        name.text = current.type

        var date = v.findViewById<TextView>(R.id.tv_date)

        val currentDate = LocalDate.now()
        val year = currentDate.year

        date.text = current.date

        var adresse = v.findViewById<TextView>(R.id.tv_adresse)
        adresse.text = current.adresse

        var etat = v.findViewById<TextView>(R.id.tv_etat)
        etat.text = current.etat

        return v
    }
}