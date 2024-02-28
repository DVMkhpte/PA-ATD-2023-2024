<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Demandes;
use App\Models\Missions;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class MissionsController extends Controller
{
    public function index()
    {
        $adminUser = Auth::user();
        $participations = Missions::with('user', 'demande')->get();

        Log::channel('admin_activity')->info("Index mission participation by " . $adminUser->name);
        return response()->json($participations);
    }

    public function show($id)
    {
        $adminUser = Auth::user();
        $participations = Missions::with('user', 'mission')->find($id);

        if (!$participations) {
            Log::channel('admin_activity')->info("Show mission participation by: " . $adminUser->name . " but the mission participation was not found");
            return response()->json(['message' => 'Mission participation not found'], 404);
        }

        Log::channel('admin_activity')->info("Show mission participation by " . $adminUser->name);
        return response()->json($participations);
    }

    public function store(Request $request)
    {
        $User = Auth::user();
        
        try {
            $data = $request->validate([
                'id_demande' => 'required|integer', 
            ]);

            $data['realiser_par'] = $User->id;
    
            $participation = Missions::create($data);


           Log::channel('user_activity')->info("Create mission participation by " . $User->name);
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
            
            $participation = Missions::findOrFail($id);

           $participation->delete();
            

           DB::commit();

            Log::channel('admin_activity')->info("Delete mission participation " . $id . " by " . $adminUser->name);
        return response()->json(['message' => 'Mission participation delete']);
    

       
    } catch (\Exception $e) {
        DB::rollBack();
        return response()->json(['message' => 'An error occurred while deleting the participation.'], 500);
    }
    
}
}