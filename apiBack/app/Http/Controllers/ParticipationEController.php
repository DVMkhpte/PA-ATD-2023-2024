<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ParticipeE;
use App\Models\Evenement;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class ParticipationEController extends Controller
{
    public function index()
    {
        $adminUser = Auth::user();
        $participations = ParticipeE::with('user', 'evenement')->get();

        Log::channel('admin_activity')->info("Index evenement participation by " . $adminUser->name);
        return response()->json($participations);
    }

    public function show($id)
    {
        $adminUser = Auth::user();
        $participations = ParticipeE::with('user', 'evenement')->find($id);

        if (!$participations) {
            Log::channel('admin_activity')->info("Show evenement participation by: " . $adminUser->name . " but the evenement participation was not found");
            return response()->json(['message' => 'Evenement participation not found'], 404);
        }

        Log::channel('admin_activity')->info("Show evenement participation by " . $adminUser->name);
        return response()->json($participations);
    }

    public function store(Request $request)
    {
        $User = Auth::user();
        
        try {
            $data = $request->validate([
                'id_evenement' => 'required|integer', 
            ]);

            $data['id_user'] = $User->id;
    
            $participation = ParticipeE::create($data);
    
           Log::channel('user_activity')->info("Create evenement participation by " . $User->name);
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
            
            $participation = ParticipeE::findOrFail($id);

            $participation->delete();

           DB::commit();

            Log::channel('admin_activity')->info("Delete evenement participation " . $id . " by " . $adminUser->name);
        return response()->json(['message' => 'evenement participation delete']);
    

       
    } catch (\Exception $e) {
        DB::rollBack();
        return response()->json(['message' => 'An error occurred while deleting the participation.'], 500);
    }
    
}
}