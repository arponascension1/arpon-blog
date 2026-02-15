<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the client dashboard.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();

        $likes = $user->likes()
            ->with('post.category')
            ->latest()
            ->limit(5)
            ->get()
            ->map(function ($like) {
                return [
                    'id' => 'like_'.$like->id,
                    'type' => 'like',
                    'post' => [
                        'title' => $like->post->title,
                        'slug' => $like->post->slug,
                        'category' => $like->post->category ? $like->post->category->name : 'Uncategorized',
                    ],
                    'created_at' => $like->created_at->diffForHumans(),
                    'raw_date' => $like->created_at,
                ];
            });

        $reads = $user->readingHistories()
            ->with('post.category')
            ->latest('updated_at')
            ->limit(5)
            ->get()
            ->map(function ($read) {
                return [
                    'id' => 'read_'.$read->id,
                    'type' => 'read',
                    'post' => [
                        'title' => $read->post->title,
                        'slug' => $read->post->slug,
                        'category' => $read->post->category ? $read->post->category->name : 'Uncategorized',
                    ],
                    'created_at' => $read->updated_at->diffForHumans(),
                    'raw_date' => $read->updated_at,
                ];
            });

        $activities = $likes->concat($reads)
            ->sortByDesc('raw_date')
            ->take(8)
            ->values();

        return Inertia::render('Client/Dashboard', [
            'user' => [
                'name' => $user->name,
                'email' => $user->email,
                'avatar' => $user->avatar,
                'joined_at' => $user->created_at->format('M d, Y'),
            ],
            'stats' => [
                'member_since' => $user->created_at->diffForHumans(),
                'likes_count' => $user->likes()->count(),
                'reads_count' => $user->readingHistories()->count(),
            ],
            'activities' => $activities,
        ]);
    }
}
