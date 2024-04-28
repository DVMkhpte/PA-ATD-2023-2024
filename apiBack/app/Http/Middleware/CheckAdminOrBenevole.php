<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckAdminOrBenevole
{
    public function handle(Request $request, Closure $next)
    {

        if ($request->user() && ($request->user()->hasRole('admin') || $request->user()->hasRole('benevole'))) {
            return $next($request);
        }

        return response()->json(['message' => 'Unauthorized'], 401);
    }
}
