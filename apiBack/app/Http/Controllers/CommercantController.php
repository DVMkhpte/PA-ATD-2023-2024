<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Commercant;
use Illuminate\Support\Facades\Log;

class CommercantController extends Controller
{
    public function index()
    {
        $adminUser = auth()->user();
        $commercants = Commercant::all();

        Log::channel('admin_activity')->info("Index commercants by " . $adminUser->name);
        return response()->json($commercants);
    }

    public function show($id)
    {
        $adminUser = auth()->user();
        $commercant = Commercant::findOrFail($id);

        if (!$commercant) {
            Log::channel('admin_activity')->info("Show commercant by: " . $adminUser->name . " but the commercant was not found");
            return response()->json(['message' => 'Commercant not found'], 404);
        }

        Log::channel('admin_activity')->info("Show commercant by " . $adminUser->name);
        return response()->json($commercant);
    }

    public function store(Request $request)
    {
        $adminUser = auth()->user();
        try {
            $data = $request->validate([
                'nom' => 'required|string|max:255',
                'adresse' => 'required|string|max:255',
                'type' => 'required|string|max:255',
            ]);

            $commercant = Commercant::create($data);

            Log::channel('user_activity')->info("Create commercant by " . $adminUser->name);

            return response()->json($commercant, 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while creating the commercant.', 'error' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $adminUser = auth()->user();
        try {
            $commercant = Commercant::findOrFail($id);

            $data = $request->validate([
                'nom' => 'string|max:255',
                'adresse' => 'string|max:255',
                'type' => 'string|max:255',
            ]);

            $commercant->update($data);

            Log::channel('admin_activity')->info("Update commercant by " . $adminUser->name);

            return response()->json($commercant, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while updating the commercant.', 'error' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        $adminUser = auth()->user();
        try {
            $commercant = Commercant::findOrFail($id);
            $commercant->delete();

            Log::channel('admin_activity')->info("Delete commercant by " . $adminUser->name);

            return response()->json(['message' => 'Commercant deleted']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while deleting the commercant.', 'error' => $e->getMessage()], 500);
        }
    }
}
