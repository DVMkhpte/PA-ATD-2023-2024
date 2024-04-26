<?php

namespace App\Http\Controllers;

use App\Models\Etageres;
use App\Models\Produit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ProduitController extends Controller
{
    public function index()
    {
        $adminUser = Auth::user();
        $produits = Produit::with('etagere.entrepot')->get();

        Log::channel('admin_activity')->info("Index produits by " . $adminUser->name);
        return response()->json($produits);
    }

    public function show($id)
    {
        $adminUser = Auth::user();
        $produit = Produit::with('etagere.entrepot')->find($id);

        if (!$produit) {
            Log::channel('admin_activity')->info("Show produit by: " . $adminUser->name . " but the produit was not found");
            return response()->json(['message' => 'Produit not found'], 404);
        }

        Log::channel('admin_activity')->info("Show produit by " . $adminUser->name);
        return response()->json($produit);
    }

    public function store(Request $request)
    {
        $adminUser = Auth::user();
        try {
            $data = $request->validate([
                'nom' => 'required|string|max:255',
                'type' => 'string|max:255',
                'date_arrivee' => 'required|date',
                'date_limite' => 'date',
                'id_etagere' => 'required|integer|exists:etageres,id',
            ]);

            $etagere = Etageres::findOrFail($data['id_etagere']);
            if ($etagere->capacite_actuelle === 0) {
                return response()->json(['message' => 'The shelf is full and cannot accept more products.'], 400);
            }

            DB::beginTransaction();

            $produit = Produit::create($data);

            if ($etagere->capacite_actuelle === 1) {
                $entrepot = $etagere->entrepot;
                $entrepot->increment('nb_etageres_remplie');
            }

            $etagere->decrement('capacite_actuelle');
            $etagere->entrepot->decrement('place_restante');

            DB::commit();


            Log::channel('admin_activity')->info("Create produit by " . $adminUser->name);

            return response()->json($produit, 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while creating the produit.', 'error' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        $adminUser = Auth::user();
        try {
            $produit = Produit::findOrFail($id);
            $etagere = $produit->etagere;

            $produit->delete();

            DB::table('etageres')->where('id', $produit->id_etagere)->increment('capacite_actuelle');
            DB::table('entrepots')->where('id', $etagere->id_entrepot)->increment('place_restante');

            if ($etagere->capacite_actuelle == 0) {
                DB::table('entrepots')->where('id', $etagere->id_entrepot)->decrement('nb_etageres_remplie');
            }

            DB::commit();

            Log::channel('admin_activity')->info("Delete produit " . $id . " by " . $adminUser->name);
            return response()->json(['message' => 'Produit deleted']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while deleting the produit.', 'error' => $e->getMessage()], 500);
        }
    }
}


