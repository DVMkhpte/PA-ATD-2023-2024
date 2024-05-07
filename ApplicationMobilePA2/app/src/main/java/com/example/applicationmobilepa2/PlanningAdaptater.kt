package com.example.applicationmobilepa2


import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.BaseAdapter
import android.widget.ImageView
import android.widget.TextView

class PlanningAdaptater : BaseAdapter {


    var context:Context
    var listeActivityPlanning:MutableList<Planning> = mutableListOf()

    constructor(context: Context, listeActivityPlanning: MutableList<Planning>) : super() {
        this.context = context
        this.listeActivityPlanning = listeActivityPlanning
    }


    override fun getCount(): Int {
        return this.listeActivityPlanning.size;
    }

    override fun getItem(position: Int): Any {
        return this.listeActivityPlanning.get(position)
    }

    override fun getItemId(position: Int): Long {
        return 0;
    }

    override fun getView(position: Int, convertView: View?, parent: ViewGroup?): View {
        var v:View

        if(convertView == null){
            var inflater = LayoutInflater.from(this.context)
            v = inflater.inflate(R.layout.row_planning,null)
        }else{
            v = convertView
        }
        var current = getItem(position) as Planning
        var name = v.findViewById<TextView>(R.id.tv_name)
        name.text = current.nom

        var date = v.findViewById<TextView>(R.id.tv_date)
        date.text = current.date

        var adresse = v.findViewById<TextView>(R.id.tv_adresse)
        adresse.text = current.adresse

        var type = v.findViewById<TextView>(R.id.tv_type)
        type.text = current.type

        return v
    }
}