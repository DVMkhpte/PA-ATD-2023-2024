<?php

namespace App\Http\Controllers;

use App\Models\Activites;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;


class ActiviteController extends Controller
{

    public function index()
    {

        //$adminUser = Auth::user();
        $activite = Activites::with('supervisor')->get();

        //Log::channel('admin_activity')->info("Index Activite by " . $adminUser->name);
        return response()->json($activite);

    }

    public function show($id)
    {
        //$adminUser = Auth::user();
        $activite = Activites::with('supervisor')->find($id);

        if (!$activite) {
            //Log::channel('admin_activity')->info("Show Activite by: " . $adminUser->name . "but the Activite was not found");
            return response()->json(['message' => 'Activite not found'], 404);
        }

        //Log::channel('admin_activity')->info("Show Activite by " . $adminUser->name);
        return response()->json($activite);
    }

    public function store(Request $request)
    {
        //$adminUser = Auth::user();
        $data = $request->validate([
            'nom' => 'required|string|max:255',
            'description' => 'required|string',
            'date_debut' => 'required|date',
            'date_fin' => 'required|date|after_or_equal:date_debut',
            'adresse' => 'required|string',
            'nb_place' => 'required|integer',
            'superviser_par' => 'integer',
        ]);

        $supervisor = User::findOrFail($data['superviser_par']);

        if (!$supervisor->hasRole('bénévole')) {
            return response()->json(['message' => 'The supervisor is not a volunteer'], 400);
        }

        $activite = Activites::create($data);

        //Log::channel('admin_activity')->info("Create Activite by " . $adminUser->name);
        return response()->json($activite, 201);
    }

    public function update(Request $request, $id)
    {
        //$adminUser = Auth::user();
        $activite = Activites::find($id);

        if (!$activite) {
            //Log::channel('admin_activity')->info("Update Activite by: " . $adminUser->name . "but the Activite was not found");
            return response()->json(['message' => 'Activite not found'], 404);
        }

        $data = $request->validate([
            'nom' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'date_debut' => 'required|date',
            'date_fin' => 'required|date|after_or_equal:date_debut',
            'adresse' => 'required|string',
            'nb_place' => 'required|integer',
            'superviser_par' => 'integer',
        ]);

        $supervisor = User::findOrFail($data['superviser_par']);

        if (!$supervisor->hasRole('bénévole')) {
            return response()->json(['message' => 'The supervisor is not a volunteer'], 400);
        }

        $activite->update($data);

        //Log::channel('admin_activity')->info("Update Activite " . $activite->nom . " by " . $adminUser->name);
        return response()->json($activite, 200);
    }

    public function destroy($id)
    {
        //$adminUser = Auth::user();
        $activite = Activites::find($id);

        if (!$activite) {
            //Log::channel('admin_activity')->info("Destroy Activite by: " . $adminUser->name . "but the Activite was not found");
            return response()->json(['message' => 'Activite not found'], 404);
        }

        $activite->delete();

        //Log::channel('admin_activity')->info("Delete event " . $activite->nom . " by " . $adminUser->name);
        return response()->json(['message' => 'Activite delete']);
    }
}

?>
