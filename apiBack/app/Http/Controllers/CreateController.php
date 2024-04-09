<?php

namespace App\Http\Controllers;



use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use App\Notification\VerifyEmail;

class CreateController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'code_postal'=> 'required|integer',
            'ville' => 'required|string|max:255',
            'adresse' => 'required|string|max:255',
            'num_telephone'=> 'required|integer',
            'password' => 'required|string|min:8',
            'role' => 'string|in:benevole,beneficiaire,admin',
        ]);

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'code_postal' => $data[ 'code_postal'],
            'ville'=> $data['ville'],
            'adresse'=> $data['adresse'],
            'num_telephone'=> $data['num_telephone'],
            'password' => Hash::make($data['password']),
            'role' => $data['role'],
            ]);

        //$user->notify(new VerifyEmail($user));

        Log::channel('user_activity')->info("New user created with email " . $user->email);
        return response()->json($user);
    }
}

?>
