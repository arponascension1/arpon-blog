<?php

namespace Tests\Feature\Admin;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class MediaTest extends TestCase
{
    use RefreshDatabase;

    protected User $admin;

    protected function setUp(): void
    {
        parent::setUp();
        $this->admin = User::factory()->create(['is_admin' => true]);
        Storage::fake('public');
        $this->withoutMiddleware(\Illuminate\Foundation\Http\Middleware\ValidateCsrfToken::class);
    }

    public function test_admin_can_view_media_index(): void
    {
        $response = $this->actingAs($this->admin)->get(route('admin.media.index'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Admin/Media/Index')
            ->has('items')
            ->has('currentPath')
            ->has('breadcrumbs')
        );
    }

    public function test_admin_can_upload_files(): void
    {
        $file = UploadedFile::fake()->create('test.txt', 100);

        $response = $this->actingAs($this->admin)->postJson(route('admin.media.upload'), [
            'files' => [$file],
            'path' => '',
        ]);

        $response->assertStatus(302);
        Storage::disk('public')->assertExists('test.txt');
    }

    public function test_admin_can_create_folder(): void
    {
        $response = $this->actingAs($this->admin)->postJson(route('admin.media.folder'), [
            'name' => 'test-folder',
            'path' => '',
        ]);

        $response->assertStatus(302);
        Storage::disk('public')->assertExists('test-folder');
    }

    public function test_admin_can_delete_files(): void
    {
        Storage::disk('public')->put('test.txt', 'hello');

        $response = $this->actingAs($this->admin)->deleteJson(route('admin.media.destroy'), [
            'items' => [
                ['path' => 'test.txt', 'type' => 'file'],
            ],
        ]);

        $response->assertStatus(302);
        Storage::disk('public')->assertMissing('test.txt');
    }

    public function test_admin_can_delete_folders(): void
    {
        Storage::disk('public')->makeDirectory('test-folder');
        Storage::disk('public')->put('test-folder/test.txt', 'hello');

        $response = $this->actingAs($this->admin)->deleteJson(route('admin.media.destroy'), [
            'items' => [
                ['path' => 'test-folder', 'type' => 'folder'],
            ],
        ]);

        $response->assertStatus(302);
        Storage::disk('public')->assertMissing('test-folder');
    }

    public function test_non_admin_cannot_access_media(): void
    {
        $user = User::factory()->create(['is_admin' => false]);

        $response = $this->actingAs($user)->get(route('admin.media.index'));

        $response->assertStatus(403);
    }
}
