<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\MediaController;
use App\Http\Controllers\Admin\PostController;
use App\Http\Controllers\Admin\SearchController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\TagController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\Client\DashboardController as ClientDashboardController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

// Public Blog Routes
Route::get('/', [BlogController::class, 'index'])->name('home');
Route::get('/articles', [BlogController::class, 'articles'])->name('blog.articles');
Route::get('/about', [BlogController::class, 'about'])->name('blog.about');
Route::get('/privacy-policy', [BlogController::class, 'privacyPolicy'])->name('blog.privacy');
Route::get('/contact', [\App\Http\Controllers\Client\ContactController::class, 'show'])->name('blog.contact');
Route::post('/contact', [\App\Http\Controllers\Client\ContactController::class, 'store'])->name('blog.contact.store');
Route::get('/search', [BlogController::class, 'search'])->name('blog.search');
Route::get('/posts/{slug}', [BlogController::class, 'show'])->name('posts.show');
Route::get('/category/{category:slug}', [BlogController::class, 'category'])->name('blog.category');
Route::get('/tag/{tag:slug}', [BlogController::class, 'tag'])->name('blog.tag');
Route::get('/sitemap.xml', [\App\Http\Controllers\SitemapController::class, 'index']);
Route::get('/robots.txt', [\App\Http\Controllers\SitemapController::class, 'robots']);
Route::get('/feed', [BlogController::class, 'feed'])->name('blog.feed');

Route::get('/dashboard', [ClientDashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::post('/posts/{post}/like', [\App\Http\Controllers\Client\PostLikeController::class, 'toggle'])->name('posts.like');
});

Route::middleware(['auth', 'admin', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [AdminController::class, 'dashboard'])->name('dashboard');
    Route::get('/analytics', [\App\Http\Controllers\Admin\AnalyticsController::class, 'index'])->name('analytics.index');

    // User CRUD routes
    Route::resource('users', UserController::class);
    Route::patch('/users/{user}/toggle-admin', [UserController::class, 'toggleAdmin'])->name('users.toggle-admin');

    // Category CRUD routes
    Route::resource('categories', CategoryController::class);
    Route::patch('/categories/{category}/toggle-active', [CategoryController::class, 'toggleActive'])->name('categories.toggle-active');

    // Tag CRUD routes
    Route::resource('tags', TagController::class);

    // Post CRUD routes
    Route::resource('posts', PostController::class);

    // Search route
    Route::get('/search', [SearchController::class, 'search'])->name('search');

    // Media routes
    Route::get('/media', [MediaController::class, 'index'])->name('media.index');
    Route::get('/media/fetch', [MediaController::class, 'fetch'])->name('media.fetch');
    Route::post('/media/upload', [MediaController::class, 'upload'])->name('media.upload');
    Route::post('/media/folder', [MediaController::class, 'createFolder'])->name('media.folder');
    Route::post('/media/rename', [MediaController::class, 'rename'])->name('media.rename');
    Route::post('/media/move', [MediaController::class, 'move'])->name('media.move');
    Route::delete('/media/delete', [MediaController::class, 'destroy'])->name('media.destroy');

    // Contact routes
    Route::resource('contacts', \App\Http\Controllers\Admin\ContactController::class)->only(['index', 'show', 'destroy']);

    // Setting routes
    Route::get('/settings', [SettingController::class, 'index'])->name('settings.index');
    Route::patch('/settings', [SettingController::class, 'update'])->name('settings.update');
});

require __DIR__.'/auth.php';
