<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        if ($this->app->runningInConsole()) {
            return;
        }

        $settings = \Illuminate\Support\Facades\Cache::rememberForever('app_settings', function () {
            try {
                if (! \Illuminate\Support\Facades\Schema::hasTable('settings')) {
                    return [];
                }
                return \App\Models\Setting::all()->pluck('value', 'key')->toArray();
            } catch (\Exception $e) {
                return [];
            }
        });

        // Apply Mail Settings at Runtime
        if (! empty($settings['mail_mailer'])) {
            config(['mail.default' => $settings['mail_mailer']]);
        }

        if (! empty($settings['mail_host'])) {
            $mailUsername = $settings['mail_username'] ?? '';
            $mailPassword = $settings['mail_password'] ?? '';

            // Decrypt Username
            if (! empty($mailUsername)) {
                try {
                    $mailUsername = decrypt($mailUsername);
                } catch (\Exception $e) {
                    // Keep as is
                }
            }

            // Decrypt Password
            if (! empty($mailPassword)) {
                try {
                    $mailPassword = decrypt($mailPassword);
                } catch (\Exception $e) {
                    // Keep as is
                }
            }

            config([
                'mail.mailers.smtp.host' => $settings['mail_host'],
                'mail.mailers.smtp.port' => $settings['mail_port'] ?? '587',
                'mail.mailers.smtp.username' => $mailUsername,
                'mail.mailers.smtp.password' => $mailPassword,
                'mail.mailers.smtp.encryption' => $settings['mail_encryption'] ?? 'tls',
                'mail.from.address' => $settings['mail_from_address'] ?? $settings['admin_email'] ?? '',
                'mail.from.name' => $settings['mail_from_name'] ?? $settings['site_name'] ?? config('app.name'),
            ]);
        }

        // Apply Google AdSense Setting at Runtime
        if (! empty($settings['google_adsense_client_id'])) {
            $adsenseId = $settings['google_adsense_client_id'];
            try {
                $adsenseId = decrypt($adsenseId);
            } catch (\Exception $e) {
                // Keep as is if not encrypted
            }
            config(['services.google.adsense_client_id' => $adsenseId]);
        }

        view()->composer('app', function ($view) use ($settings) {
            $view->with('settings', $settings);
        });
    }
}
