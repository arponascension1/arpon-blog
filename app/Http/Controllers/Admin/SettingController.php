<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;

class SettingController extends Controller
{
    public function index(): Response
    {
        $settings = Setting::all()->pluck('value', 'key');

        // Ensure default keys exist if they don't in DB
        $defaults = [
            // General
            'site_name' => config('app.name', 'Laravel Blog'),
            'app_description' => '',
            'site_logo' => '',
            'site_favicon' => '',
            'site_language' => 'en',
            'timezone' => 'UTC',

            // SEO
            'site_description' => '',
            'site_keywords' => '',
            'og_title' => '',
            'og_description' => '',
            'twitter_card' => 'summary_large_image',
            'google_analytics_id' => '',
            'search_console_id' => '',

            // Contact
            'admin_email' => '',
            'contact_phone' => '',
            'contact_address' => '',
            'facebook_url' => '',
            'twitter_url' => '',
            'instagram_url' => '',
            'linkedin_url' => '',

            // Maintenance
            'maintenance_mode' => '0',
            'maintenance_message' => 'Site is under maintenance. Please check back later.',
        ];

        $settings = array_merge($defaults, $settings->toArray());

        return Inertia::render('Admin/Settings/Index', [
            'settings' => $settings,
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            // General
            'site_name' => 'required|string|max:255',
            'app_description' => 'nullable|string',
            'site_logo' => 'nullable|string',
            'site_favicon' => 'nullable|string',
            'site_language' => 'nullable|string|max:10',
            'timezone' => 'nullable|string|max:50',

            // SEO
            'site_description' => 'nullable|string',
            'site_keywords' => 'nullable|string',
            'og_title' => 'nullable|string|max:255',
            'og_description' => 'nullable|string',
            'twitter_card' => 'nullable|string|max:255',
            'google_analytics_id' => 'nullable|string|max:50',
            'search_console_id' => 'nullable|string|max:255',

            // Contact
            'admin_email' => 'nullable|email|max:255',
            'contact_phone' => 'nullable|string|max:50',
            'contact_address' => 'nullable|string',
            'facebook_url' => 'nullable|url|max:255',
            'twitter_url' => 'nullable|url|max:255',
            'instagram_url' => 'nullable|url|max:255',
            'linkedin_url' => 'nullable|url|max:255',

            // Maintenance
            'maintenance_mode' => 'nullable|in:0,1',
            'maintenance_message' => 'nullable|string',
        ]);

        foreach ($validated as $key => $value) {
            Setting::updateOrCreate(['key' => $key], ['value' => $value ?? '']);
        }

        Cache::forget('app_settings');

        return redirect()->back()->with('success', 'Settings updated successfully.');
    }
}
