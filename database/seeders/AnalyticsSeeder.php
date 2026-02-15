<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\PostView;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AnalyticsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $posts = Post::all();

        if ($posts->isEmpty()) {
            return;
        }

        // Clear existing views to avoid unique constraint issues
        DB::table('post_views')->truncate();

        $today = now();

        foreach ($posts as $post) {
            // Randomly decide how popular this post is
            $baseViews = rand(10, 500);

            for ($i = 0; $i <= 30; $i++) {
                $date = (clone $today)->subDays($i)->toDateString();

                // Random variance in daily views
                $dailyCount = rand(max(1, $baseViews - 5), $baseViews + 20);

                PostView::create([
                    'post_id' => $post->id,
                    'view_date' => $date,
                    'count' => $dailyCount,
                ]);
            }

            // Update total views on the post model
            $post->update(['views' => PostView::where('post_id', $post->id)->sum('count')]);
        }
    }
}
