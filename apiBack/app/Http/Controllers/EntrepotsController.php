<?php

namespace App\Http\Controllers;

use App\Models\Entrepots;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class EntrepotsController extends Controller
{
    public function index()
    {
        $adminUser = Auth::user();
        $entrepots = Entrepots::all();

        Log::channel('admin_activity')->info("Index Entrepots by " . $adminUser->name);
        return response()->json($entrepots);
    }

    public function show($id)
    {
        $adminUser = Auth::user();
        $entrepot = Entrepots::find($id);

        if (!$entrepot) {
            Log::channel('admin_activity')->info("Show Entrepot by: " . $adminUser->name . " but the Entrepot was not found");
            return response()->json(['message' => 'Entrepot not found'], 404);
        }

        Log::channel('admin_activity')->info("Show Entrepot by " . $adminUser->name);
        return response()->json($entrepot);
    }

    public function update(Request $request, $id)
    {
        $adminUser = Auth::user();
        $entrepot = Entrepots::find($id);

        if (!$entrepot) {
            Log::channel('admin_activity')->info("Update Entrepot by: " . $adminUser->name . " but the Entrepot was not found");
            return response()->json(['message' => 'Entrepot not found'], 404);
        }

        $data = $request->validate([
            'nom' => 'required|string|max:255',
            'adresse' => 'required|string|max:255',
            'taille' => 'required|numeric',
            'nb_etageres' => 'required|integer',
            'nb_etageres_max' => 'required|integer',
            'nb_etageres_remplie' => 'required|integer',
            'place_restante' => 'required|integer',
        ]);

        $entrepot->update($data);

        Log::channel('admin_activity')->info("Update Entrepot " . $entrepot->nom . " by " . $adminUser->name);
        return response()->json($entrepot, 200);
    }

   /* public function destroy($id)
    {
        $adminUser = Auth::user();
        $entrepot = Entrepots::find($id);

        if (!$entrepot) {
            Log::channel('admin_activity')->info("Destroy Entrepot by: " . $adminUser->name . " but the Entrepot was not found");
            return response()->json(['message' => 'Entrepot not found'], 404);
        }

        $entrepot->delete();

        Log::channel('admin_activity')->info("Delete Entrepot " . $entrepot->nom . " by " . $adminUser->name);
        return response()->json(['message' => 'Entrepot deleted']);
    }
   */
}

