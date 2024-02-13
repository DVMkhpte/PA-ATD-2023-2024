<?php  

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Log;

class LogApiAccess
{
    public function handle($request, Closure $next)
    {
        
        Log::info('API access', [
            'ip' => $request->ip(),
            'url' => $request->fullUrl(),
            'method' => $request->method(),
            'user_agent' => $request->header('User-Agent'),
        ]);

        return $next($request);
    }
}

?>