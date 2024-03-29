<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Demandes;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class DemandeController extends Controller
{
    public function index()
    {
        $adminUser = Auth::user();
        $demandes = Demandes::with('user')->get();

        Log::channel('admin_activity')->info("Index demandes demande by " . $adminUser->name);
        return response()->json($demandes);
    }

    public function show($id)
    {
        $adminUser = Auth::user();
        $demande = Demandes::with('user')->find($id);

        if (!$demande) {
            Log::channel('admin_activity')->info("Show demande demande by: " . $adminUser->name . " but the demande was not found");
            return response()->json(['message' => 'Demande demande not found'], 404);
        }

        Log::channel('admin_activity')->info("Show demande demande by " . $adminUser->name);
        return response()->json($demande);
    }

    public function store(Request $request)
    {
        $User = Auth::user();
        
        try {
            $data = $request->validate([
                'type' => 'required|string|in:demande_bénévole,aide_service_administratif,demande_navette,demande_visite,autre',
                'demande' => 'required|string', 
            ]);
    
            $data['id_user'] = $User->id;
            
            $demande = Demandes::create($data);

            Log::channel('user_activity')->info("Create demande demande by " . $User->name);
            return response()->json($demande, 201);
        
            }catch (\Exception $e) {
                
                return response()->json(['message' => 'An error occurred while creating the demande.', 'error' => $e->getMessage()], 500);
            }
        }
    

    public function destroy($id)
    {
    $adminUser = Auth::user();

    try {
        $demande = Demandes::findOrFail($id);
        $demande->delete();

        Log::channel('admin_activity')->info("Delete demande demande " . $id . " by " . $adminUser->name);

        return response()->json(['message' => 'Demande demande delete']);
    } catch (\Exception $e) {
        return response()->json(['message' => 'An error occurred while deleting the demande.'], 500);
    }
    }
}


?>