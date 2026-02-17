<?php

namespace App\Http\Middleware;

use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $settings = Cache::rememberForever('app_settings', function () {
            return Setting::all()->pluck('value', 'key')->toArray();
        });

        // Define which settings are safe to share with the frontend
        $publicSettings = collect($settings)->only([
            'site_name',
            'app_description',
            'site_logo',
            'site_favicon',
            'site_language',
            'timezone',
            'site_description',
            'site_keywords',
            'og_title',
            'og_description',
            'twitter_card',
            'google_analytics_id',
            'search_console_id',
            'admin_email',
            'contact_phone',
            'contact_address',
            'facebook_url',
            'twitter_url',
            'instagram_url',
            'linkedin_url',
            'google_adsense_client_id',
            'about_content',
            'privacy_policy_content',
        ])->toArray();

        // Decrypt AdSense ID for the frontend
        if (! empty($publicSettings['google_adsense_client_id'])) {
            try {
                $publicSettings['google_adsense_client_id'] = decrypt($publicSettings['google_adsense_client_id']);
            } catch (\Exception $e) {
                // Keep as is
            }
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'flash' => [
                'success' => $request->session()->get('success'),
                'error' => $request->session()->get('error'),
            ],
            'settings' => $publicSettings,
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ];
    }
}
