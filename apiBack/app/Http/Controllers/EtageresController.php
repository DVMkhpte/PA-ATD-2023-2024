<?php

namespace App\Http\Controllers;

use App\Models\Entrepots;
use App\Models\Etageres;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class EtageresController extends Controller
{
    public function index()
    {
        $adminUser = Auth::user();
        $etageres = Etageres::with('entrepot')->get();

        Log::channel('admin_activity')->info("Index étagerès by " . $adminUser->name);
        return response()->json($etageres);


    }
    public function show($id)
    {
        $adminUser = Auth::user();
        $etagere = Etageres::with('entrepot')->find($id);

        if (!$etagere) {
            Log::channel('admin_activity')->info("Show étagère by: " . $adminUser->name . " but the étagère was not found");
            return response()->json(['message' => 'étagèrenot found'], 404);
        }

        Log::channel('admin_activity')->info("Show étagère by " . $adminUser->name);
        return response()->json($etagere);
    }

    public function store(Request $request)
    {
        $adminUser = Auth::user();
        try {
            $data = $request->validate([
                'numero' => 'required|string|max:255',
                'id_entrepot' => 'required|integer|exists:entrepots,id',
            ]);

            $entrepot = Entrepots::findOrFail($data['id_entrepot']);
            if ($entrepot->nb_etageres >= $entrepot->nb_etageres_max) {
                return response()->json(['message' => 'The maximum number of shelves for this warehouse has been reached.'], 400);
            }

            $etagere = Etageres::create($data);

            DB::table('entrepots')->where('id', $data['id_entrepot'])->increment('nb_etageres');
            DB::commit();

            Log::channel('user_activity')->info("Create activite participation by " . $adminUser->name);

            return response()->json($etagere, 201);
        }catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'An error occurred while creating the étagère.', 'error' => $e->getMessage()], 500);
        }
    }


    public function destroy($id)
    {

        $adminUser = Auth::user();
        try {
            DB::beginTransaction();

            $etagere = Etageres::findOrFail($id);
            $etagere->delete();

            DB::table('entrepots')->where('id', $etagere->id_entrepot)->decrement('nb_etageres');
            DB::commit();

            Log::channel('admin_activity')->info("Delete étagère " . $id . " by " . $adminUser->name);
            return response()->json(['message' => 'Etagère Delete']);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'An error occurred while deleting the etagère.'], 500);
        }
    }
}
