<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="theme-color" content="#ffffff">
        <meta name="apple-mobile-web-app-title" content="{{ config('app.name') }}">
        <meta name="application-name" content="{{ config('app.name') }}">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        @if(isset($settings['site_favicon']) && $settings['site_favicon'])
            <link rel="icon" href="{{ $settings['site_favicon'] }}?v={{ md5($settings['site_favicon']) }}">
        @elseif(isset($settings['site_logo']) && $settings['site_logo'])
            <link rel="icon" href="{{ $settings['site_logo'] }}?v={{ md5($settings['site_logo']) }}">
        @else
            <link rel="icon" type="image/x-icon" href="/favicon.ico?v={{ time() }}">
        @endif

        @if(isset($settings['site_description']))
            <meta name="description" content="{{ $settings['site_description'] }}">
        @endif

        <link rel="alternate" type="application/atom+xml" title="Recent Stories" href="{{ route('blog.feed') }}">

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
