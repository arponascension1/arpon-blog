<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Post;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->input('query');

        if (empty($query)) {
            return response()->json([
                'posts' => [],
                'users' => [],
                'categories' => [],
                'tags' => [],
            ]);
        }

        $posts = Post::where('title', 'like', "%{$query}%")
            ->orWhere('content', 'like', "%{$query}%")
            ->limit(5)
            ->get(['id', 'title', 'slug']);

        $users = User::where('name', 'like', "%{$query}%")
            ->orWhere('email', 'like', "%{$query}%")
            ->limit(5)
            ->get(['id', 'name', 'email']);

        $categories = Category::where('name', 'like', "%{$query}%")
            ->limit(5)
            ->get(['id', 'name', 'slug']);

        $tags = Tag::where('name', 'like', "%{$query}%")
            ->limit(5)
            ->get(['id', 'name', 'slug']);

        return response()->json([
            'posts' => $posts,
            'users' => $users,
            'categories' => $categories,
            'tags' => $tags,
        ]);
    }
}
