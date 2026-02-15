<?php

namespace Database\Seeders;

use App\Models\Tag;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tags = [
            'Laravel', 'PHP', 'React', 'TypeScript', 'TailwindCSS',
            'OpenAI', 'Next.js', 'InertiaJS', 'Web Design', 'Backend',
        ];

        foreach ($tags as $tag) {
            Tag::create([
                'name' => $tag,
                'slug' => Str::slug($tag),
                'meta_title' => $tag.' | Tags',
                'meta_description' => 'Browse all posts tagged with '.$tag,
            ]);
        }
    }
}
