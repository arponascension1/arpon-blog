<?php

namespace App\Http\Middleware;

use App\Models\Setting;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class CheckMaintenanceMode
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $settings = Cache::rememberForever('app_settings', function () {
            return Setting::all()->pluck('value', 'key')->toArray();
        });

        $maintenanceMode = $settings['maintenance_mode'] ?? '0';

        // If maintenance mode is OFF, just proceed
        if ($maintenanceMode !== '1') {
            return $next($request);
        }

        // Maintenance mode is ON.
        // Skip maintenance check for admin routes and auth/login routes
        if ($request->is('admin*') || 
            $request->is('login') || 
            $request->is('logout') || 
            $request->is('register') || 
            $request->is('forgot-password') || 
            $request->is('reset-password*') || 
            $request->is('verify-email*') || 
            $request->is('confirm-password*') ||
            $request->is('password') ||
            $request->is('email/verification-notification') ||
            $request->is('api*')) {
            return $next($request);
        }

        // If user is logged in and is an admin, allow access to the rest of the site
        if (Auth::check() && Auth::user()->is_admin) {
            return $next($request);
        }

        $message = $settings['maintenance_message'] ?? 'Sorry, we are doing some maintenance. Please check back soon.';

        return Inertia::render('Error', [
            'status' => 503,
            'message' => $message,
        ])->toResponse($request)->setStatusCode(503);
    }
}
