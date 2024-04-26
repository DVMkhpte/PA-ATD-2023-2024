<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckAdminOrBenevole
{
    public function handle(Request $request, Closure $next)
    {
        $user = Auth::user();

        if ($user->hasRole('admin') || $user->hasRole('benevole')) {
            return $next($request);
        }

        return response()->json(['message' => 'Unauthorized'], 403);
    }
}
