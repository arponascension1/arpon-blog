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

        view()->composer('app', function ($view) {
            $settings = \Illuminate\Support\Facades\Cache::rememberForever('app_settings', function () {
                return \App\Models\Setting::all()->pluck('value', 'key')->toArray();
            });
            $view->with('settings', $settings);
        });
    }
}
