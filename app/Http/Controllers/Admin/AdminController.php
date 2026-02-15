<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Like;
use App\Models\Post;
use App\Models\ReadingHistory;
use App\Models\Tag;
use App\Models\User;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function dashboard()
    {
        $stats = [
            'total_users' => User::count(),
            'total_posts' => Post::count(),
            'total_views' => Post::sum('views'),
            'total_categories' => Category::count(),
            'total_tags' => Tag::count(),
            'admin_users' => User::where('is_admin', true)->count(),
            'published_posts' => Post::where('status', 'published')->count(),
            'draft_posts' => Post::where('status', 'draft')->count(),
        ];

        $recent_posts = Post::with('category', 'author')
            ->latest()
            ->limit(5)
            ->get();

        $popular_posts = Post::with('category')
            ->orderBy('views', 'desc')
            ->limit(5)
            ->get();

        $recent_users = User::latest()
            ->limit(5)
            ->get();

        $category_stats = Category::withCount('posts')
            ->get()
            ->map(function ($category) {
                return [
                    'name' => $category->name,
                    'posts_count' => $category->posts_count,
                    'total_views' => Post::where('category_id', $category->id)->sum('views'),
                ];
            })
            ->sortByDesc('total_views')
            ->values()
            ->take(5);

        // Global Recent Activity
        $likes = Like::with(['user', 'post'])
            ->latest()
            ->limit(10)
            ->get()
            ->map(function ($like) {
                return [
                    'id' => 'like_'.$like->id,
                    'type' => 'like',
                    'user' => $like->user->name,
                    'post' => $like->post->title,
                    'created_at' => $like->created_at->diffForHumans(),
                    'raw_date' => $like->created_at,
                ];
            });

        $reads = ReadingHistory::with(['user', 'post'])
            ->latest('updated_at')
            ->limit(10)
            ->get()
            ->map(function ($read) {
                return [
                    'id' => 'read_'.$read->id,
                    'type' => 'read',
                    'user' => $read->user->name,
                    'post' => $read->post->title,
                    'created_at' => $read->updated_at->diffForHumans(),
                    'raw_date' => $read->updated_at,
                ];
            });

        $recent_activity = $likes->concat($reads)
            ->sortByDesc('raw_date')
            ->take(10)
            ->values();

        // Chart data for last 14 days
        $days = collect(range(13, 0))->map(function ($i) {
            return now()->subDays($i)->toDateString();
        });

        $views_by_day = \App\Models\PostView::where('view_date', '>=', now()->subDays(13)->toDateString())
            ->groupBy('view_date')
            ->selectRaw('view_date, sum(count) as total')
            ->pluck('total', 'view_date');

        $users_by_day = User::where('created_at', '>=', now()->subDays(13)->startOfDay())
            ->groupBy(\Illuminate\Support\Facades\DB::raw('DATE(created_at)'))
            ->selectRaw('DATE(created_at) as date, count(*) as total')
            ->pluck('total', 'date');

        $chart_data = $days->map(function ($date) use ($views_by_day, $users_by_day) {
            return [
                'date' => \Carbon\Carbon::parse($date)->format('M d'),
                'views' => (int) $views_by_day->get($date, 0),
                'users' => (int) $users_by_day->get($date, 0),
            ];
        });

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recent_posts' => $recent_posts,
            'popular_posts' => $popular_posts,
            'recent_users' => $recent_users,
            'category_stats' => $category_stats,
            'recent_activity' => $recent_activity,
            'chart_data' => $chart_data,
        ]);
    }
}
