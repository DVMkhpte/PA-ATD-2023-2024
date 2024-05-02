<?php

namespace App\Http\Controllers;

use App\Models\Formation;
use App\Models\ParticipeF;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;


class FormationController extends Controller
{

    public function index()
    {
        $adminUser = Auth::user();
        $formation = Formation::with('supervisor')->get();

        Log::channel('admin_activity')->info("Index formation by " . $adminUser->name);
        return response()->json($formation);
    }

    public function show($id)
    {
        $adminUser = Auth::user();
        $formation = Formation::with('supervisor')->find($id);

        if (!$formation) {
            Log::channel('admin_activity')->info("Show formation by: " . $adminUser->name . "but the formation was not found");
            return response()->json(['message' => 'Formation not found'], 404);
        }

        Log::channel('admin_activity')->info("Show formation by " . $adminUser->name);
        return response()->json($formation);
    }

    public function getUserFormation($userId)
    {
        try {
            $participations = ParticipeF::with('formation')->where('id_user', $userId)->get();
            $participations->transform(function ($item, $key) {
                $item->formation->descrip = $item->formation->description;
                unset($item->formation->description);
                return $item;
            });

            $formations = $participations->map(function ($participation) {
                return $participation->formation;
            });

            return response()->json($formations);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while fetching user participations.', 'error' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        $adminUser = Auth::user();
        $data = $request->validate([
            'nom' => 'required|string|max:255',
            'description' => 'required|string',
            'date_debut' => 'required|date',
            'date_fin' => 'required|date|after_or_equal:date_debut',
            'adresse' => 'required|string',
            'nb_place' => 'required|integer',
            'supervise_par' => '',
        ]);


        if (isset($data['supervise_par'])) {
            $supervisor = User::findOrFail($data['supervise_par']);
            if (!$supervisor->hasRole('benevole')) {
                return response()->json(['message' => 'The supervisor is not a volunteer'], 400);
            }
        }

        $formation = Formation::create($data);

        Log::channel('admin_activity')->info("Create formation by " . $adminUser->name);
        return response()->json($formation, 201);
    }

    public function update(Request $request, $id)
    {
        $adminUser = Auth::user();
        $formation = Formation::find($id);

        if (!$formation) {
            Log::channel('admin_activity')->info("Update formation by: " . $adminUser->name . "but the formation was not found");
            return response()->json(['message' => 'Formation not found'], 404);
        }

        $data = $request->validate([
            'nom' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'date_debut' => 'required|date',
            'date_fin' => 'required|date|after_or_equal:date_debut',
            'adresse' => 'required|string',
            'nb_place' => 'required|integer',
            'supervise_par' => 'integer',
        ]);

        $supervisor = User::findOrFail($data['supervise_par']);

        if (!$supervisor->hasRole('benevole')) {
            return response()->json(['message' => 'The supervisor is not a volunteer'], 400);
        }

        $formation->update($data);

        Log::channel('admin_activity')->info("Update formation " . $formation->nom . " by " . $adminUser->name);
        return response()->json($formation, 200);
    }

    public function destroy($id)
    {
        $adminUser = Auth::user();
        $formation = Formation::find($id);

        if (!$formation) {
            Log::channel('admin_activity')->info("Destroy formation by: " . $adminUser->name . "but the formation was not found");
            return response()->json(['message' => 'Formation not found'], 404);
        }

        $formation->delete();

        Log::channel('admin_activity')->info("Delete event " . $formation->nom . " by " . $adminUser->name);
        return response()->json(['message' => 'Formation delete']);
    }
}
