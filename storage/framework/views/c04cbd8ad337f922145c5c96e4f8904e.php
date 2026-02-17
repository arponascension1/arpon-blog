<!DOCTYPE html>
<html lang="<?php echo e(str_replace('_', '-', app()->getLocale())); ?>">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="theme-color" content="#ffffff">
        <meta name="apple-mobile-web-app-title" content="<?php echo e(config('app.name')); ?>">
        <meta name="application-name" content="<?php echo e(config('app.name')); ?>">

        <title inertia><?php echo e(config('app.name', 'Laravel')); ?></title>

        <?php if(isset($settings['site_favicon']) && $settings['site_favicon']): ?>
            <link rel="icon" href="<?php echo e($settings['site_favicon']); ?>?v=<?php echo e(md5($settings['site_favicon'])); ?>">
        <?php elseif(isset($settings['site_logo']) && $settings['site_logo']): ?>
            <link rel="icon" href="<?php echo e($settings['site_logo']); ?>?v=<?php echo e(md5($settings['site_logo'])); ?>">
        <?php else: ?>
            <link rel="icon" type="image/x-icon" href="/favicon.ico?v=<?php echo e(time()); ?>">
        <?php endif; ?>

        <?php if(isset($settings['site_description'])): ?>
            <meta name="description" content="<?php echo e($settings['site_description']); ?>">
        <?php endif; ?>

        <link rel="alternate" type="application/atom+xml" title="Recent Stories" href="<?php echo e(route('blog.feed')); ?>">

        <?php if(config('services.google.adsense_client_id')): ?>
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=<?php echo e(config('services.google.adsense_client_id')); ?>"
                crossorigin="anonymous"></script>
        <?php endif; ?>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />

        <!-- Scripts -->
        <?php echo app('Tighten\Ziggy\BladeRouteGenerator')->generate(); ?>
        <?php echo app('Illuminate\Foundation\Vite')->reactRefresh(); ?>
        <?php echo app('Illuminate\Foundation\Vite')(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"]); ?>
        <?php if (!isset($__inertiaSsrDispatched)) { $__inertiaSsrDispatched = true; $__inertiaSsrResponse = app(\Inertia\Ssr\Gateway::class)->dispatch($page); }  if ($__inertiaSsrResponse) { echo $__inertiaSsrResponse->head; } ?>
    </head>
    <body class="font-sans antialiased">
        <?php if (!isset($__inertiaSsrDispatched)) { $__inertiaSsrDispatched = true; $__inertiaSsrResponse = app(\Inertia\Ssr\Gateway::class)->dispatch($page); }  if ($__inertiaSsrResponse) { echo $__inertiaSsrResponse->body; } elseif (config('inertia.use_script_element_for_initial_page')) { ?><script data-page="app" type="application/json"><?php echo json_encode($page); ?></script><div id="app"></div><?php } else { ?><div id="app" data-page="<?php echo e(json_encode($page)); ?>"></div><?php } ?>
    </body>
</html>
<?php /**PATH /home/arpon/Documents/laravel-project/arpon-blog/resources/views/app.blade.php ENDPATH**/ ?>