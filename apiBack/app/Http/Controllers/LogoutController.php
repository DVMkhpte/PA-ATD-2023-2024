<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LogoutController extends Controller
{
    public function store(Request $request)
    {
        
        if ($request->user()) {
           
            $request->user()->tokens()->delete();
            
            Log::channel('user_activity')->info("User with email {$user->email} logout");
            return response()->json(['message' => 'Successfully logged out'], 200);
        }

       
        return response()->json(['message' => 'Unauthorized'], 401);
    }
}

?>