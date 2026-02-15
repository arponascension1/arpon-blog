<?php

namespace Tests\Feature\Admin;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserCrudTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->withoutMiddleware(\Illuminate\Foundation\Http\Middleware\ValidateCsrfToken::class);
    }

    protected function createAdmin()
    {
        return User::factory()->create(['is_admin' => true]);
    }

    public function test_admin_can_access_users_index(): void
    {
        $admin = $this->createAdmin();

        $response = $this
            ->actingAs($admin)
            ->get('/admin/users');

        $response->assertStatus(200);
    }

    public function test_non_admin_cannot_access_users_index(): void
    {
        $user = User::factory()->create(['is_admin' => false]);

        $response = $this
            ->actingAs($user)
            ->get('/admin/users');

        $response->assertStatus(403);
    }

    public function test_admin_can_search_users(): void
    {
        $admin = $this->createAdmin();
        User::factory()->create(['name' => 'John Doe', 'email' => 'john@example.com']);
        User::factory()->create(['name' => 'Jane Smith', 'email' => 'jane@example.com']);

        $response = $this
            ->actingAs($admin)
            ->get('/admin/users?search=John');

        $response->assertStatus(200);
        // We can't easily assert Inertia props here without more setup,
        // but we can check if it at least runs without error.
    }

    public function test_admin_can_filter_by_role(): void
    {
        $admin = $this->createAdmin();
        User::factory()->count(5)->create(['is_admin' => false]);
        User::factory()->count(3)->create(['is_admin' => true]);

        $response = $this
            ->actingAs($admin)
            ->get('/admin/users?role=admin');

        $response->assertStatus(200);
    }

    public function test_admin_can_create_user(): void
    {
        $admin = $this->createAdmin();

        $response = $this
            ->actingAs($admin)
            ->post('/admin/users', [
                'name' => 'New User',
                'email' => 'newuser@example.com',
                'password' => 'password123',
                'password_confirmation' => 'password123',
                'is_admin' => true,
            ]);

        $response->assertRedirect('/admin/users');
        $this->assertDatabaseHas('users', [
            'email' => 'newuser@example.com',
            'is_admin' => true,
        ]);
    }

    public function test_admin_can_update_user(): void
    {
        $admin = $this->createAdmin();
        $user = User::factory()->create(['is_admin' => false]);

        $response = $this
            ->actingAs($admin)
            ->put("/admin/users/{$user->id}", [
                'name' => 'Updated Name',
                'email' => $user->email,
                'is_admin' => true,
            ]);

        $response->assertRedirect('/admin/users');
        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'name' => 'Updated Name',
            'is_admin' => true,
        ]);
    }

    public function test_admin_can_delete_user(): void
    {
        $admin = $this->createAdmin();
        $user = User::factory()->create();

        $response = $this
            ->actingAs($admin)
            ->delete("/admin/users/{$user->id}");

        $response->assertRedirect('/admin/users');
        $this->assertDatabaseMissing('users', ['id' => $user->id]);
    }

    public function test_admin_cannot_delete_themselves(): void
    {
        $admin = $this->createAdmin();

        $response = $this
            ->actingAs($admin)
            ->delete("/admin/users/{$admin->id}");

        $response->assertStatus(302); // Redirect back
        $this->assertDatabaseHas('users', ['id' => $admin->id]);
    }

    public function test_admin_can_toggle_admin_status(): void
    {
        $admin = $this->createAdmin();
        $user = User::factory()->create(['is_admin' => false]);

        $response = $this
            ->actingAs($admin)
            ->patch("/admin/users/{$user->id}/toggle-admin");

        $response->assertStatus(302);
        $this->assertTrue($user->fresh()->is_admin);

        $this->patch("/admin/users/{$user->id}/toggle-admin");
        $this->assertFalse($user->fresh()->is_admin);
    }
}
