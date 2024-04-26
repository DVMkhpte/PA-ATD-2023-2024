<?php

namespace App\Http\Controllers;

use App\Models\Camions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class CamionsController extends Controller
{
    public function index()
    {
        $adminUser = Auth::user();
        $camions = Camions::all();

        Log::channel('admin_activity')->info("Index Camions by " . $adminUser->name);
        return response()->json($camions);
    }

    public function show($id)
    {
        $adminUser = Auth::user();
        $camion = Camions::find($id);

        if (!$camion) {
            Log::channel('admin_activity')->info("Show Camion by: " . $adminUser->name . " but the Camion was not found");
            return response()->json(['message' => 'Camion not found'], 404);
        }

        Log::channel('admin_activity')->info("Show Camion by " . $adminUser->name);
        return response()->json($camion);
    }

    public function store(Request $request)
    {
        $adminUser = Auth::user();
        $data = $request->validate([
            'immatriculation' => 'required|string|max:255',
            'modele' => 'required|string|max:255',
            'type' => 'string|max:255',
            'status' => 'string|max:255',
            'poids' => 'integer',
            'hauteur' => 'integer',
            'capacite_max' => 'integer',
            'date_dernier_controle' => 'date',
            'id_entrepot' => 'integer',
        ]);

        $camion = Camions::create($data);

        Log::channel('admin_activity')->info("Create Camion by " . $adminUser->name);
        return response()->json($camion, 201);
    }

    public function update(Request $request, $id)
    {
        $adminUser = Auth::user();
        $camion = Camions::find($id);

        if (!$camion) {
            Log::channel('admin_activity')->info("Update Camion by: " . $adminUser->name . " but the Camion was not found");
            return response()->json(['message' => 'Camion not found'], 404);
        }

        $data = $request->validate([
            'immatriculation' => 'required|string|max:255',
            'modele' => 'required|string|max:255',
            'type' => 'string|max:255',
            'status' => 'string|max:255',
            'poids' => 'integer',
            'hauteur' => 'integer',
            'capacite_max' => 'integer',
            'date_dernier_controle' => 'date',
            'id_entrepot' => 'integer',
        ]);

        $camion->update($data);

        Log::channel('admin_activity')->info("Update Camion " . $camion->immatriculation . " by " . $adminUser->name);
        return response()->json($camion, 200);
    }

    public function destroy($id)
    {
        $adminUser = Auth::user();
        $camion = Camions::find($id);

        if (!$camion) {
            Log::channel('admin_activity')->info("Destroy Camion by: " . $adminUser->name . " but the Camion was not found");
            return response()->json(['message' => 'Camion not found'], 404);
        }

        $camion->delete();

        Log::channel('admin_activity')->info("Delete Camion " . $camion->immatriculation . " by " . $adminUser->name);
        return response()->json(['message' => 'Camion deleted']);
    }
}
