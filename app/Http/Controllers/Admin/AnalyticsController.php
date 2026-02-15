<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Post;
use App\Models\PostView;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AnalyticsController extends Controller
{
    public function index()
    {
        // Daily views for the last 30 days
        $days = 30;
        $daily_views = PostView::select('view_date', DB::raw('SUM(count) as total_views'))
            ->where('view_date', '>=', now()->subDays($days)->toDateString())
            ->groupBy('view_date')
            ->orderBy('view_date', 'asc')
            ->get()
            ->map(function ($item) {
                return [
                    'date' => date('M d', strtotime($item->view_date)),
                    'views' => (int) $item->total_views,
                ];
            });

        // If no data, provide empty structure for the graph
        if ($daily_views->isEmpty()) {
            for ($i = $days; $i >= 0; $i--) {
                $daily_views->push([
                    'date' => now()->subDays($i)->format('M d'),
                    'views' => 0,
                ]);
            }
        }

        // Top 10 categories by views
        $category_views = Category::select('categories.name', DB::raw('SUM(posts.views) as total_views'))
            ->leftJoin('posts', 'categories.id', '=', 'posts.category_id')
            ->groupBy('categories.id', 'categories.name')
            ->orderBy('total_views', 'desc')
            ->limit(10)
            ->get()
            ->map(function ($item) {
                return [
                    'name' => $item->name,
                    'views' => (int) $item->total_views,
                ];
            });

        // Top 10 posts by views
        $top_posts = Post::select('title', 'views', 'slug')
            ->where('status', 'published')
            ->orderBy('views', 'desc')
            ->limit(10)
            ->get();

        // Summary stats
        $stats = [
            'total_views' => (int) Post::sum('views'),
            'views_today' => (int) PostView::where('view_date', now()->toDateString())->sum('count'),
            'avg_views_per_post' => (float) (Post::count() > 0 ? Post::sum('views') / Post::count() : 0),
            'most_active_category' => $category_views->first()['name'] ?? 'N/A',
        ];

        return Inertia::render('Admin/Analytics/Index', [
            'daily_views' => $daily_views,
            'category_views' => $category_views,
            'top_posts' => $top_posts,
            'stats' => $stats,
        ]);
    }
}
