package com.example.applicationmobilepa2

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.BaseAdapter
import android.widget.TextView

class FormationAdaptater : BaseAdapter {
    var context: Context
    var listeActivityFormation: MutableList<Formation> = mutableListOf()

    constructor(context: Context, listeActivityFormation: MutableList<Formation>) : super() {
        this.context = context
        this.listeActivityFormation = listeActivityFormation
    }


    override fun getCount(): Int {
        return this.listeActivityFormation.size;
    }

    override fun getItem(position: Int): Any {
        return this.listeActivityFormation.get(position)
    }

    override fun getItemId(position: Int): Long {
        return 0;
    }

    override fun getView(position: Int, convertView: View?, parent: ViewGroup?): View {
        var v: View

        if (convertView == null) {
            var inflater = LayoutInflater.from(this.context)
            v = inflater.inflate(R.layout.row_formation, null)
        } else {
            v = convertView
        }
        var current = getItem(position) as Formation
        var name = v.findViewById<TextView>(R.id.tv_name)
        name.text = current.nom

        var date = v.findViewById<TextView>(R.id.tv_date)
        date.text = current.date

        var adresse = v.findViewById<TextView>(R.id.tv_adresse)
        adresse.text = current.adresse

        return v
    }
}