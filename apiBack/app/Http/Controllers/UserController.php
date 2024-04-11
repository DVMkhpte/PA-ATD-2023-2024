<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{


public function index()
    {
        $adminUser = Auth::user();
        $users = User::all();

        Log::channel('admin_activity')->info("Index user by " . $adminUser->name);
        return response()->json($users);
    }

public function show($id)
    {
        $adminUser = Auth::user();
        $user = User::find($id);

        if (!$user) {

            Log::channel('admin_activity')->info("Show user by: " . $adminUser->name . "but the user was not found");
            return response()->json(['message' => 'User not found'], 404);
        }

        Log::channel('admin_activity')->info("Show user by: " . $adminUser->name);
        return response()->json($user);
    }

public function update(Request $request, $id)
    {
        $adminUser = Auth::user();
        $user = User::find($id);

        if (!$user) {
            Log::channel('admin_activity')->info("Update user by: " . $adminUser->name . "but the user was not found");
            return response()->json(['message' => 'User not found'], 404);
        }

        $data = $request->validate([
            'name' => 'string|max:255',
            'email' => 'string|email|max:255|unique:users,email,' . $id,
            'code_postal'=> 'integer',
            'ville' => 'string|max:255',
            'adresse' => 'string|max:255',
            'num_telephone'=> 'integer',
            'password' => 'string|min:8',
            'role' => 'string',
        ]);

        $user->update($data);

        Log::channel('admin_activity')->info("Update user " . $user->email . " by " . $adminUser->name);
        return response()->json($user);
    }

    public function destroy($id)
    {
        $adminUser = Auth::user();
        $user = User::find($id);

        if (!$user) {
            Log::channel('admin_activity')->info("Destroy user by: " . $adminUser->name . "but the user was not found");
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->delete();

        Log::channel('admin_activity')->info("Delete user " . $user->email . " by " . $adminUser->name);
        return response()->json(['message' => 'User Delete']);
    }
}
