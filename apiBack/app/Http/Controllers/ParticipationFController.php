<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ParticipeF;
use App\Models\Formation;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class ParticipationFController extends Controller
{
    public function index()
    {
        $adminUser = Auth::user();
        $participations = ParticipeF::with('user', 'formation')->get();

        Log::channel('admin_activity')->info("Index Formation participation by " . $adminUser->name);
        return response()->json($participations);
    }

    public function show($id)
    {
        $adminUser = Auth::user();
        $participations = ParticipeF::with('user', 'formation')->find($id);

        if (!$participations) {
            Log::channel('admin_activity')->info("Show formation participation by: " . $adminUser->name . " but the formation participation was not found");
            return response()->json(['message' => 'Formation participation not found'], 404);
        }

        Log::channel('admin_activity')->info("Show formation participation by " . $adminUser->name);
        return response()->json($participations);
    }

    public function store(Request $request)
    {
        $User = Auth::user();
        
        try {
            $data = $request->validate([
                'id_formation' => 'required|integer', 
            ]);
    
            $data['id_user'] = $User->id;
            
            DB::beginTransaction();
            
            $participation = ParticipeF::create($data);
    
            DB::table('formations')->where('id', $data['id_formation'])->decrement('nb_place');
    
            DB::commit();
    
            Log::channel('admin_activity')->info("Create formation participation by " . $User->name);
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
            
            $participation = ParticipeF::findOrFail($id);

            $formation = Formation::findOrFail($participation->id_formation);

            $participation->delete();

            $formation->increment('nb_place');

            DB::commit();

            Log::channel('admin_activity')->info("Delete formation participation " . $id . " by " . $adminUser->name);
        return response()->json(['message' => 'Formation participation delete']);
    

       
    } catch (\Exception $e) {
        DB::rollBack();
        return response()->json(['message' => 'An error occurred while deleting the participation.'], 500);
    }
    
}
}