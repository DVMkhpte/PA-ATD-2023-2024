<?php

namespace App\Http\Controllers;

use App\Models\Evenement;
use App\Http\Controllers\Controller;
use App\Models\ParticipeE;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class EvenementController extends Controller
{
    public function index()
    {
        $adminUser = Auth::user();
        $evenements = Evenement::all();

        Log::channel('admin_activity')->info("Index event by " . $adminUser->name);
        return response()->json($evenements);
    }

    public function show($id)
    {
        $adminUser = Auth::user();
        $evenement = Evenement::find($id);

        if (!$evenement) {
            Log::channel('admin_activity')->info("Show event by: " . $adminUser->name . " but the event was not found");
            return response()->json(['message' => 'Event not found'], 404);
        }

        Log::channel('admin_activity')->info("Show event by " . $adminUser->name);
        return response()->json($evenement);
    }

    public function getUserEvenement($userId)
    {
        try {
            $participations = ParticipeE::with('evenement')->where('id_user', $userId)->get();
            $participations->transform(function ($item, $key) {
                return $item;
            });

            $evenements = $participations->map(function ($participation) {
                return $participation->evenement;
            });

            return response()->json($evenements);
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
            'type' => 'required|string|max:255',
            'etat' => 'string|in:ouvert',
            'adresse' => 'required|string|max:255',
            'ville' => 'required|string|max:255',
        ]);

        $evenement = Evenement::create($data);

        Log::channel('admin_activity')->info("Create event by " . $adminUser->name);
        return response()->json($evenement, 201);
    }

    public function update(Request $request, $id)
    {
        $adminUser = Auth::user();
        $evenement = Evenement::find($id);

        if (!$evenement) {
            Log::channel('admin_activity')->info("Update event by: " . $adminUser->name . " but the event was not found");
            return response()->json(['message' => 'Event not found'], 404);
        }

        $data = $request->validate([
            'nom' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'date_debut' => 'required|date',
            'date_fin' => 'required|date|after_or_equal:date_debut',
            'type' => 'required|string|max:255',
            'etat' => 'required|string|in:ouvert',
            'adresse' => 'required|string|max:255',
            'ville' => 'required|string|max:255',
        ]);

        $evenement->update($data);

        Log::channel('admin_activity')->info("Update event " . $evenement->nom . " by " . $adminUser->name);
        return response()->json($evenement, 200);
    }

    public function destroy($id)
    {
        $adminUser = Auth::user();
        $evenement = Evenement::find($id);

        if (!$evenement) {
            Log::channel('admin_activity')->info("Destroy event by: " . $adminUser->name . " but the event was not found");
            return response()->json(['message' => 'Event not found'], 404);
        }

        $evenement->participations()->delete();

        $evenement->delete();

        Log::channel('admin_activity')->info("Delete event " . $evenement->nom . " by " . $adminUser->name);
        return response()->json(['message' => 'Event deleted']);
    }
}
