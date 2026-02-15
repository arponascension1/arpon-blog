<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
    <title><?php echo e(config('app.name')); ?></title>
    <link href="<?php echo e(url('/feed')); ?>" rel="self"/>
    <link href="<?php echo e(url('/')); ?>"/>
    <updated><?php echo e(now()->toAtomString()); ?></updated>
    <id><?php echo e(url('/')); ?></id>
    <author>
        <name><?php echo e(config('app.name')); ?></name>
    </author>

    <?php $__currentLoopData = $posts; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $post): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
        <entry>
            <title><?php echo e($post->title); ?></title>
            <link href="<?php echo e(route('posts.show', $post->slug)); ?>"/>
            <id><?php echo e(route('posts.show', $post->slug)); ?></id>
            <author>
                <name><?php echo e($post->author->name); ?></name>
            </author>
            <summary type="html"><?php echo e($post->excerpt); ?></summary>
            <updated><?php echo e($post->updated_at->toAtomString()); ?></updated>
        </entry>
    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
</feed>
<?php /**PATH /home/arpon/Documents/laravel-project/arpon-blog/resources/views/feed.blade.php ENDPATH**/ ?>