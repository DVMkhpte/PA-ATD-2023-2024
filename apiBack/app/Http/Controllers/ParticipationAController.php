<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ParticipeA;
use App\Models\Activites;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class ParticipationAController extends Controller
{
    public function index()
    {
        $adminUser = Auth::user();
        $participations = ParticipeA::with('user', 'activite')->get();

        Log::channel('admin_activity')->info("Index activite participation by " . $adminUser->name);
        return response()->json($participations);
    }

    public function show($id)
    {
        $adminUser = Auth::user();
        $participations = ParticipeA::with('user', 'activite')->find($id);

        if (!$participations) {
            Log::channel('admin_activity')->info("Show activite participation by: " . $adminUser->name . " but the activite participation was not found");
            return response()->json(['message' => 'activite participation not found'], 404);
        }

        Log::channel('admin_activity')->info("Show activite participation by " . $adminUser->name);
        return response()->json($participations);
    }

    public function getUserParticipations($userId)
    {
        try {
            $participations = ParticipeA::with('activite')->where('id_user', $userId)->get();
            return response()->json($participations);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while fetching user participations.' , 'error' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        $User = Auth::user();

        try {
            $data = $request->validate([
                'id_activite' => 'required|integer'
            ]);

            $data['id_user'] = $User->id;

            $participation = ParticipeA::create($data);

            DB::table('activites')->where('id', $data['id_activite'])->decrement('nb_place');

            Log::channel('user_activity')->info("Create activite participation by " . $User->name);
            return response()->json($participation, 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'An error occurred while creating the participation.'], 500);
        }
    }

    public function destroy($id)
    {
        $adminUser = Auth::user();
        try {
            DB::beginTransaction();

            $participation = ParticipeA::findOrFail($id);

            $activite = Activites::findOrFail($participation->id_activite);

            $participation->delete();

            $activite->increment('nb_place');

           DB::commit();

            Log::channel('admin_activity')->info("Delete activite participation " . $id . " by " . $adminUser->name);
        return response()->json(['message' => 'activite participation delete']);



    } catch (\Exception $e) {
        DB::rollBack();
        return response()->json(['message' => 'An error occurred while deleting the participation.'], 500);
    }

}
}
