<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function store(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($credentials)) {
            $user = $request->user();

            if ($user->role === 'admin') {

                $token = $user->createToken('admin-access-token')->plainTextToken;

                Log::channel('admin_activity')->info("Admin with email {$user->email} logged in successfully");
                return response()->json(['token' => $token,'role' => $user->role,'id' => $user->id], 200);
            }else{

                $token = $user->createToken('Personal Access Token')->plainTextToken;
            }

            Log::channel('user_activity')->info("User with email {$user->email} logged in successfully");
            return response()->json(['token' => $token,'role' => $user->role,'id' => $user->id], 200);
        }


        Log::channel('user_activity')->info("User with email {$request->input('email')} tried to login but failed");
        return response()->json(['message' => 'Invalid credentials'], 401);

    }
}

?>
