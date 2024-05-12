package com.example.applicationmobilepa2


import android.app.PendingIntent
import android.content.Intent
import android.content.IntentFilter
import android.nfc.NdefMessage
import android.nfc.NfcAdapter
import android.nfc.Tag
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.Parcelable
import android.util.Log
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import com.android.volley.Request
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.Volley
import org.json.JSONObject
import java.io.UnsupportedEncodingException

class MainActivity : AppCompatActivity() {
    private var nfcAdapter: NfcAdapter? = null
    private var pendingIntent: PendingIntent? = null
    private var tag: Tag? = null
    private var writeMode: Boolean = false
    private var writingTagFilter: Array<IntentFilter>? = null
    private var nfcContent: String? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)




        //--Code de lecture NFC-------------------------------
        nfcAdapter = NfcAdapter.getDefaultAdapter(this)
        if (nfcAdapter == null) {
            Toast.makeText(this, "Jeton NFC non supporté", Toast.LENGTH_SHORT).show()
        }

        readFromIntent(intent)
        pendingIntent = PendingIntent.getActivity(this, 0, intent, PendingIntent.FLAG_IMMUTABLE)
        val tagDetected = IntentFilter(NfcAdapter.ACTION_TAG_DISCOVERED)
        tagDetected.addCategory(Intent.CATEGORY_DEFAULT)
        writingTagFilter = arrayOf(tagDetected)





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
            val url = "http://autempsdonne.com:8000/api/user/login"
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
                            if (nfcContent == null) {
                                edit.putString("nfcContent", 0.toString())
                            }else{
                                edit.putString("nfcContent", nfcContent)
                            }
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


    //--Fonction de lecture NFC-------------------------
    private fun readFromIntent(intent: Intent) {
        var action = intent.action
        if(NfcAdapter.ACTION_TAG_DISCOVERED == action || NfcAdapter.ACTION_TECH_DISCOVERED == action || NfcAdapter.ACTION_NDEF_DISCOVERED == action){
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
        if (msgs.isNullOrEmpty()) return

        var id = ""
        val payload = msgs[0].records[0].payload
        val textEncoding = if ((payload[0].toInt() and 128) == 0) "UTF-8" else "UTF-16"
        val languageCodeLength = payload[0].toInt() and 0x3F

        try {
            id = String(payload, languageCodeLength + 1, payload.size - languageCodeLength - 1, charset(textEncoding))
        } catch (e: UnsupportedEncodingException) {
            Log.e("UnsupportedEncodingException", e.toString())
        }
        nfcContent = id
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