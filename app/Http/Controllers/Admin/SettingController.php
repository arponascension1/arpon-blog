<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class SettingController extends Controller
{
    public function index(Request $request): Response
    {
        $settings = Setting::all()->pluck('value', 'key');

        // ... (existing defaults)
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

            // Ads
            'google_adsense_client_id' => '',

            // Pages Content
            'about_content' => '<h2>Our Mission</h2><p>At Arpon Blog, our mission is simple: to provide high-quality, thought-provoking content that informs, inspires, and challenges our readers.</p>',
            'privacy_policy_content' => '<h2>Privacy Policy</h2><p>Your privacy is important to us. It is Arpon Blog\'s policy to respect your privacy regarding any information we may collect from you across our website.</p>',

            // SMTP
            'mail_mailer' => 'smtp',
            'mail_host' => '',
            'mail_port' => '587',
            'mail_username' => '',
            'mail_password' => '',
            'mail_encryption' => 'tls',
            'mail_from_address' => '',
            'mail_from_name' => '',
        ];

        $settings = array_merge($defaults, $settings->toArray());

        // Mask sensitive data for the UI
        if (! empty($settings['mail_password'])) {
            $settings['mail_password'] = '********';
        }

        // Decrypt AdSense ID for the UI if it's encrypted
        if (! empty($settings['google_adsense_client_id'])) {
            try {
                $settings['google_adsense_client_id'] = decrypt($settings['google_adsense_client_id']);
            } catch (\Exception $e) {
                // Keep as is if not encrypted yet
            }
        }

        // Decrypt SMTP Username for the UI if it's encrypted
        if (! empty($settings['mail_username'])) {
            try {
                $settings['mail_username'] = decrypt($settings['mail_username']);
            } catch (\Exception $e) {
                // Keep as is
            }
        }

        return Inertia::render('Admin/Settings/Index', [
            'settings' => $settings,
            'active_tab' => $request->query('tab', 'general'),
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

            // Ads
            'google_adsense_client_id' => 'nullable|string|max:255',

            // Pages Content
            'about_content' => 'nullable|string',
            'privacy_policy_content' => 'nullable|string',

            // SMTP
            'mail_mailer' => 'nullable|string|in:smtp,sendmail,log',
            'mail_host' => 'nullable|string|max:255',
            'mail_port' => 'nullable|string|max:10',
            'mail_username' => 'nullable|string|max:255',
            'mail_password' => 'nullable|string|max:255',
            'mail_encryption' => 'nullable|string|max:10',
            'mail_from_address' => 'nullable|email|max:255',
            'mail_from_name' => 'nullable|string|max:255',
        ]);

        $sensitiveKeys = ['mail_password', 'mail_username', 'google_adsense_client_id'];

        foreach ($validated as $key => $value) {
            // If it's the mail password and it's masked (unchanged), don't update it
            if ($key === 'mail_password' && $value === '********') {
                continue;
            }

            // Encrypt sensitive fields
            if (in_array($key, $sensitiveKeys) && ! empty($value)) {
                $value = encrypt($value);
                Log::info("Sensitive setting updated: {$key} by Admin ID: ".auth()->id());
            }

            Setting::updateOrCreate(['key' => $key], ['value' => $value ?? '']);
        }

        Cache::forget('app_settings');

        return redirect()->back()->with('success', 'Settings updated successfully.');
    }
}
