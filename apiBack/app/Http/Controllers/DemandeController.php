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
        //$adminUser = Auth::user();
        $demandes = Demandes::with('user')->get();

        //Log::channel('admin_activity')->info("Index demandes demande by " . $adminUser->name);
        return response()->json($demandes);
    }

    public function getUserDemandes()
    {
        $user = Auth::user();
        $demandes = $user->demandes()->get();

        //Log::channel('user_activity')->info("Show all demande by " . $user->name);
        return response()->json($demandes);
    }

    public function show($id)
    {
        //$adminUser = Auth::user();
        $demande = Demandes::with('user')->find($id);

        if (!$demande) {
            //Log::channel('admin_activity')->info("Show demande demande by: " . $adminUser->name . " but the demande was not found");
            return response()->json(['message' => 'Demande demande not found'], 404);
        }

        //Log::channel('admin_activity')->info("Show demande demande by " . $adminUser->name);
        return response()->json($demande);
    }

    public function store(Request $request)
    {
        /*$User = Auth::user();*/

        try {
            $data = $request->validate([
                'type' => 'required|string|in:demande_benevole,aide_service_administratif,demande_navette,demande_visite,autre',
                'demande' => 'required|string',
                'permis' => 'string',
                'etat' => 'required|string|in:En attente,En cours, Fait, Annuler',
            ]);

           /* $data['id_user'] = $User->id;*/

            $demande = Demandes::create($data);

            //Log::channel('user_activity')->info("Create demande demande by "/* . $User->name*/);
            return response()->json($demande, 201);

            }catch (\Exception $e) {

                return response()->json(['message' => 'An error occurred while creating the demande.', 'error' => $e->getMessage()], 500);
            }
        }


    public function destroy($id)
    {
    //$adminUser = Auth::user();

    try {
        $demande = Demandes::findOrFail($id);
        $demande->delete();

        //Log::channel('admin_activity')->info("Delete demande demande " . $id . " by " . $adminUser->name);

        return response()->json(['message' => 'Demande demande delete']);
    } catch (\Exception $e) {
        return response()->json(['message' => 'An error occurred while deleting the demande.'], 500);
    }
    }

    public function update(Request $request, $id)
    {
        /*$user = Auth::user();*/

        try {
            $demande = Demandes::findOrFail($id);

            $data = $request->validate([
                'type' => 'required|string|in:demande_benevole,aide_administratif,navette,visite,autre',
                'demande' => 'required|string',
                'permis' => 'string',
                'etat' => 'required|string|in:En attente,En cours, Fait, Annuler, Valide',
                'id_user' => 'required|integer',
            ]);


            $demande->update($data);

            /*Log::channel('user_activity')->info("Update demande demande " . $id . " by " . $user->name);*/
            return response()->json($demande, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while updating the demande.', 'error' => $e->getMessage()], 500);
        }
    }

}


?>
