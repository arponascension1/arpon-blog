<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Post;
use App\Models\Tag;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    /**
     * Generate the sitemap.xml file.
     */
    public function index(): Response
    {
        $posts = Post::where('status', 'published')
            ->where('published_at', '<=', now())
            ->orderBy('updated_at', 'desc')
            ->get();

        $categories = Category::where('is_active', true)->get();
        $tags = Tag::all();

        $content = view('sitemap', [
            'posts' => $posts,
            'categories' => $categories,
            'tags' => $tags,
        ]);

        return response($content, 200)
            ->header('Content-Type', 'text/xml');
    }

    /**
     * Generate the robots.txt file.
     */
    public function robots(): Response
    {
        $content = "User-agent: *\n";
        $content .= "Disallow: /admin\n";
        $content .= "Disallow: /login\n";
        $content .= "Disallow: /register\n";
        $content .= "Disallow: /dashboard\n";
        $content .= "Disallow: /profile\n\n";
        $content .= 'Sitemap: '.url('/sitemap.xml')."\n";

        return response($content, 200)
            ->header('Content-Type', 'text/plain');
    }
}
