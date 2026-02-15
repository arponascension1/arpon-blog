<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Post;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::where('is_admin', true)->first();
        $categories = Category::all();
        $tags = Tag::all();

        if (! $admin || $categories->isEmpty()) {
            return;
        }

        for ($i = 1; $i <= 10; $i++) {
            $title = "Sample Blog Post {$i}";
            $post = Post::create([
                'user_id' => $admin->id,
                'category_id' => $categories->random()->id,
                'title' => $title,
                'slug' => Str::slug($title),
                'content' => "This is the content for blog post {$i}. ".Str::random(500),
                'excerpt' => "Short excerpt for post {$i}.",
                'status' => 'published',
                'published_at' => now()->subDays(rand(1, 30)),
                'is_featured' => rand(0, 1),
                'meta_title' => "{$title} | Blog",
                'meta_description' => "SEO description for post {$i}",
            ]);

            $post->tags()->attach($tags->random(rand(1, 3))->pluck('id'));
        }
    }
}
