<?php

namespace App\Http\Middleware;
use Kreait\Firebase\Auth;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle($request, Closure $next) {
    $token = $request->bearerToken();
    
    try {
        $auth = app(Auth::class);
        $verifiedToken = $auth->verifyIdToken($token);
        $role = $verifiedToken->claims()->get('role');
        
        if ($role !== 'admin') {
            return response()->json(['error' => 'Akses ditolak. Hanya admin!'], 403);
        }
        
        return $next($request);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Token tidak valid'], 401);
    }
}
}
