package com.example.applicationmobilepa2

import android.app.PendingIntent
import android.content.Intent
import android.content.IntentFilter
import android.nfc.NdefMessage
import android.nfc.NfcAdapter
import android.nfc.Tag
import android.nfc.tech.Ndef
import android.os.Build
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.Parcelable
import android.util.Log
import android.widget.ImageView
import android.widget.ListView
import android.widget.Toast
import androidx.annotation.RequiresApi
import androidx.appcompat.app.AlertDialog
import com.android.volley.Response
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import org.json.JSONArray
import java.io.UnsupportedEncodingException
import java.time.LocalDate

class ActivityMission : AppCompatActivity() {
    private var nfcAdapter: NfcAdapter? = null
    private var pendingIntent: PendingIntent? = null
    private var tag: Tag? = null
    private var writeMode: Boolean = false
    private var writingTagFilter: Array<IntentFilter>? = null

    @RequiresApi(Build.VERSION_CODES.O)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_mission)

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

        val listMission = mutableListOf<Mission>()

        val queue = Volley.newRequestQueue(applicationContext)
        val requestMission = object : StringRequest(
            Method.GET,
            "http://10.0.2.2:8000/api/user/$id/mission",
            Response.Listener { resultat ->
                val jsonGlobal = JSONArray(resultat)

                if (jsonGlobal.length() > 0) {
                    for (i in 0 until jsonGlobal.length()) {
                        val br = jsonGlobal.getJSONObject(i)
                        val date = "${br.getString("date").substring(5)}, $year"

                        var mission:Mission = Mission(
                            br.getInt("id"),
                            br.getString("type"),
                            br.getString("demande"),
                            br.getString("etat"),
                            br.getString("adresse"),
                            date,
                        )
                        listMission.add(mission)
                    }
                    var lv = findViewById<ListView>(R.id.lv_mission)
                    var adap = MissionAdaptater(applicationContext, listMission)
                    lv.adapter = adap

                    lv.setOnItemClickListener{adapter,view,position,id ->
                        var ba = adapter.adapter as MissionAdaptater
                        var item = ba.getItem(position) as Mission

                        var popup = AlertDialog.Builder(this)
                        popup.setTitle(item.type)
                        var info = "${item.date}\n\nDescription : ${item.demande}"
                        popup.setMessage(info)

                        //--Validation de la mission avec le Jeton----------------------------------
                        popup.setNegativeButton("Valider mission"){ dialog, wich ->
                            dialog.dismiss()

                            //--Affichage du msg-------------------------
                            var popupValidMission = AlertDialog.Builder(this)
                            popupValidMission.setTitle("Valider la mission  ${item.id}")
                            var info = "Veillez rapprochez votre telephone du jeton afin de valider votre mission"
                            popupValidMission.setMessage(info)

                            popupValidMission.setNegativeButton("Annuler"){ dialog, wich ->
                                dialog.dismiss()
                            }
                            popupValidMission.setCancelable(false)

                            val alertDialogMission = popupValidMission.create()
                            alertDialogMission.setOnShowListener {
                                //--Code de lecture NFC-------------------------------
                                //--Code de lecture NFC-------------------------------

                                nfcAdapter = NfcAdapter.getDefaultAdapter(this)
                                if (nfcAdapter == null) {
                                    Toast.makeText(this, "Jeton NFC non supporté", Toast.LENGTH_SHORT).show()
                                    alertDialogMission.dismiss()
                                }

                                pendingIntent = PendingIntent.getActivity(this, 0, intent, PendingIntent.FLAG_IMMUTABLE)
                                val tagDetected = IntentFilter(NfcAdapter.ACTION_TAG_DISCOVERED)
                                tagDetected.addCategory(Intent.CATEGORY_DEFAULT)
                                writingTagFilter = arrayOf(tagDetected)
                                readFromIntent(intent)

                            }

                            alertDialogMission.show()
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
        queue.add(requestMission)



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





    //--Fonction de lecture NFC-------------------------
    private fun readFromIntent(intent: Intent) {
        var action = intent.getAction()
        if(NfcAdapter.ACTION_TAG_DISCOVERED.equals(action)
            || NfcAdapter.ACTION_TECH_DISCOVERED.equals(action)
            || NfcAdapter.ACTION_NDEF_DISCOVERED.equals(action)){
            val rawMsgs: Array<Parcelable>? = intent.getParcelableArrayExtra(NfcAdapter.EXTRA_NDEF_MESSAGES)?.map { it as Parcelable }?.toTypedArray()
            var msgs: Array<NdefMessage>? = null
            if (rawMsgs != null) {
                msgs = Array(rawMsgs.size) { index ->
                    rawMsgs[index] as NdefMessage
                }
            }

            buildTagViews(msgs)
        }

    }

    private fun buildTagViews(msgs: Array<NdefMessage>?) {
        if (msgs == null || msgs.isEmpty()) return

        var id = ""
        val payload = msgs[0].records[0].payload
        val textEncoding = if ((payload[0].toInt() and 128) == 0) "UTF-8" else "UTF-16"
        val languageCodeLength = payload[0].toInt() and 0x3F

        try {
            id = String(payload, languageCodeLength + 1, payload.size - languageCodeLength - 1, charset(textEncoding))
        } catch (e: UnsupportedEncodingException) {
            Log.e("UnsupportedEncodingException", e.toString())
        }

        Toast.makeText(this, id, Toast.LENGTH_LONG).show()

    }



    override fun onNewIntent(intent: Intent) {
        super.onNewIntent(intent)
        setIntent(intent)
        readFromIntent(intent)
        if (NfcAdapter.ACTION_NDEF_DISCOVERED == intent.action) {
            tag = intent.getParcelableExtra(NfcAdapter.EXTRA_TAG) as Tag?
        }
    }


    override fun onPause() {
        super.onPause()
        writeModeOff()
    }

    override fun onResume() {
        super.onResume()
        if (nfcAdapter != null && pendingIntent != null && writingTagFilter != null) {
            writeModeOn()
        }
    }

    private fun writeModeOn() {
        writeMode = true
        nfcAdapter?.enableForegroundDispatch(this, pendingIntent, writingTagFilter, null)
    }

    private fun writeModeOff() {
        writeMode = false
        nfcAdapter?.disableForegroundDispatch(this)
    }




}
