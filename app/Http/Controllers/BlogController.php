<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Post;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;
use Inertia\Inertia;
use Inertia\Response;

class BlogController extends Controller
{
    /**
     * Display the blog home page.
     */
    public function index(Request $request): Response
    {
        $query = Post::with(['author', 'category', 'tags'])
            ->where('status', 'published')
            ->where('published_at', '<=', now())
            ->latest('published_at');

        $featured_posts = (clone $query)->where('is_featured', true)->take(3)->get();
        // Limit to 4 posts for the homepage section
        $posts = $query->take(4)->get();

        return Inertia::render('Blog/Index', [
            'posts' => $posts,
            'featured_posts' => $featured_posts,
            'categories' => Category::where('is_active', true)->withCount('posts')->get(),
            'tags' => Tag::all(),
        ]);
    }

    /**
     * Generate an Atom feed.
     */
    public function feed(): HttpResponse
    {
        $posts = Post::with(['author', 'category'])
            ->where('status', 'published')
            ->where('published_at', '<=', now())
            ->latest('published_at')
            ->take(20)
            ->get();

        $content = view('feed', [
            'posts' => $posts,
        ]);

        return response($content, 200)
            ->header('Content-Type', 'application/xml');
    }

    /**
     * Display all articles with filtering and sorting.
     */
    public function articles(Request $request): Response
    {
        $query = Post::with(['author', 'category', 'tags'])
            ->where('status', 'published')
            ->where('published_at', '<=', now());

        // Category Filter
        if ($request->filled('category')) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        // Tag Filter
        if ($request->filled('tag')) {
            $query->whereHas('tags', function ($q) use ($request) {
                $q->where('slug', $request->tag);
            });
        }

        // Sorting
        $sort = $request->get('sort', 'latest');
        if ($sort === 'oldest') {
            $query->oldest('published_at');
        } elseif ($sort === 'popular') {
            $query->latest('published_at');
        } else {
            $query->latest('published_at');
        }

        // Use pagination for the articles page
        $posts = $query->paginate(12)->withQueryString();

        return Inertia::render('Blog/Articles', [
            'posts' => $posts,
            'categories' => Category::where('is_active', true)->get(),
            'tags' => Tag::all(),
            'filters' => $request->only(['category', 'tag', 'sort']),
        ]);
    }

    /**
     * Display the search results page.
     */
    public function search(Request $request): Response
    {
        $search = $request->get('search');

        $query = Post::with(['author', 'category', 'tags'])
            ->where('status', 'published')
            ->where('published_at', '<=', now());

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('content', 'like', "%{$search}%")
                    ->orWhereHas('category', function ($q) use ($search) {
                        $q->where('name', 'like', "%{$search}%");
                    })
                    ->orWhereHas('tags', function ($q) use ($search) {
                        $q->where('name', 'like', "%{$search}%");
                    });
            });
        }

        $posts = $query->latest('published_at')->paginate(12)->withQueryString();

        return Inertia::render('Blog/Search', [
            'posts' => $posts,
            'search' => $search,
            'categories' => Category::where('is_active', true)->withCount('posts')->get(),
            'popular_tags' => Tag::withCount('posts')->orderBy('posts_count', 'desc')->take(10)->get(),
        ]);
    }

    /**
     * Display a single post.
     */
    public function show(string $slug): Response
    {
        $post = Post::with(['author', 'category', 'tags'])
            ->withCount('likes')
            ->where('slug', $slug)
            ->where('status', 'published')
            ->where('published_at', '<=', now())
            ->firstOrFail();

        // Record reading history for authenticated users (always update timestamp)
        if (auth()->check()) {
            \App\Models\ReadingHistory::updateOrCreate(
                ['user_id' => auth()->id(), 'post_id' => $post->id],
                ['updated_at' => now()]
            );
        }

        // Increment views if not already viewed in this session
        $viewedSessionKey = 'viewed_post_' . $post->id;
        if (!session()->has($viewedSessionKey)) {
            $post->increment('views');
            
            // Track daily views
            \App\Models\PostView::updateOrCreate(
                ['post_id' => $post->id, 'view_date' => now()->toDateString()],
                ['count' => \Illuminate\Support\Facades\DB::raw('count + 1')]
            );

            session()->put($viewedSessionKey, true);
        }

        $related_posts = Post::with('category')
            ->where('category_id', $post->category_id)
            ->where('id', '!=', $post->id)
            ->where('status', 'published')
            ->take(3)
            ->get();

        return Inertia::render('Blog/Show', [
            'post' => $post,
            'related_posts' => $related_posts,
            'is_liked' => auth()->check() ? $post->likes()->where('user_id', auth()->id())->exists() : false,
        ]);
    }

    /**
     * Display posts by category.
     */
    public function category(Category $category): Response
    {
        $posts = Post::with(['author', 'category', 'tags'])
            ->where('category_id', $category->id)
            ->where('status', 'published')
            ->where('published_at', '<=', now())
            ->latest('published_at')
            ->paginate(10);

        return Inertia::render('Blog/Index', [
            'posts' => $posts,
            'category' => $category,
            'categories' => Category::where('is_active', true)->withCount('posts')->get(),
            'tags' => Tag::all(),
        ]);
    }

    /**
     * Display posts by tag.
     */
    public function tag(Tag $tag): Response
    {
        $posts = $tag->posts()
            ->with(['author', 'category', 'tags'])
            ->where('status', 'published')
            ->where('published_at', '<=', now())
            ->latest('published_at')
            ->paginate(10);

        return Inertia::render('Blog/Index', [
            'posts' => $posts,
            'tag' => $tag,
            'categories' => Category::where('is_active', true)->withCount('posts')->get(),
            'tags' => Tag::all(),
        ]);
    }
}
