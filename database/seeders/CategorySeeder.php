<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Technology', 'description' => 'Latest tech news and trends'],
            ['name' => 'Lifestyle', 'description' => 'Living your best life'],
            ['name' => 'Travel', 'description' => 'Explore the world'],
            ['name' => 'Food', 'description' => 'Delicious recipes and restaurant reviews'],
        ];

        foreach ($categories as $cat) {
            Category::create([
                'name' => $cat['name'],
                'slug' => Str::slug($cat['name']),
                'description' => $cat['description'],
                'is_active' => true,
                'is_featured' => rand(0, 1),
                'meta_title' => $cat['name'].' | Blog',
                'meta_description' => $cat['description'],
            ]);
        }
    }
}
