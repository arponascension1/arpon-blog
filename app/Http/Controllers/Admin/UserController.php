<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $users = User::query()
            ->select(['id', 'name', 'email', 'avatar', 'is_admin', 'email_verified_at', 'created_at', 'updated_at'])
            ->when($request->search, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                });
            })
            ->when($request->role, function ($query, $role) {
                if ($role === 'admin') {
                    $query->where('is_admin', true);
                } elseif ($role === 'user') {
                    $query->where('is_admin', false);
                }
            })
            ->when($request->sort, function ($query, $sort) use ($request) {
                $direction = $request->direction === 'asc' ? 'asc' : 'desc';
                $query->orderBy($sort, $direction);
            }, function ($query) {
                $query->orderBy('created_at', 'desc');
            })
            ->paginate(5)
            ->withQueryString();

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
            'filters' => $request->only(['search', 'role']),
            'sort' => $request->only(['sort', 'direction']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): \Inertia\Response
    {
        return Inertia::render('Admin/Users/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'is_admin' => ['boolean'],
            'avatar' => ['nullable', 'string'],
        ]);

        $validated['password'] = Hash::make($validated['password']);
        $validated['email_verified_at'] = now();

        User::create($validated);

        return redirect()
            ->route('admin.users.index')
            ->with('success', 'User created successfully.');
    }

    public function show(User $user)
    {
        $likes = $user->likes()
            ->with('post')
            ->latest()
            ->limit(10)
            ->get()
            ->map(function ($like) {
                return [
                    'id' => 'like_'.$like->id,
                    'type' => 'like',
                    'description' => "Liked post: {$like->post->title}",
                    'created_at' => $like->created_at->format('M d, Y H:i'),
                    'raw_date' => $like->created_at,
                ];
            });

        $reads = $user->readingHistories()
            ->with('post')
            ->latest('updated_at')
            ->limit(10)
            ->get()
            ->map(function ($read) {
                return [
                    'id' => 'read_'.$read->id,
                    'type' => 'read',
                    'description' => "Read post: {$read->post->title}",
                    'created_at' => $read->updated_at->format('M d, Y H:i'),
                    'raw_date' => $read->updated_at,
                ];
            });

        $activities = $likes->concat($reads)
            ->sortByDesc('raw_date')
            ->take(15)
            ->values();

        return Inertia::render('Admin/Users/Show', [
            'user' => $user,
            'activities' => $activities,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return Inertia::render('Admin/Users/Edit', [
            'user' => $user,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users')->ignore($user->id),
            ],
            'password' => ['nullable', 'string', 'min:8', 'confirmed'],
            'avatar' => ['nullable', 'string'],
        ]);

        $validated['is_admin'] = $request->boolean('is_admin');

        if (empty($validated['password'])) {
            unset($validated['password']);
        } else {
            $validated['password'] = Hash::make($validated['password']);
        }

        $user->update($validated);

        return redirect()
            ->route('admin.users.index')
            ->with('success', 'User updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        if ($user->id === auth()->id()) {
            return back()->with('error', 'You cannot delete your own account.');
        }

        $user->delete();

        return redirect()
            ->route('admin.users.index')
            ->with('success', 'User deleted successfully.');
    }

    /**
     * Toggle admin status for the specified user.
     */
    public function toggleAdmin(User $user)
    {
        if ($user->id === auth()->id()) {
            return back()->with('error', 'You cannot change your own admin status.');
        }

        $user->is_admin = ! $user->is_admin;
        $user->save();

        $action = $user->is_admin ? 'granted' : 'revoked';

        return back()
            ->with('success', "Admin privileges {$action} for {$user->name}.");
    }
}
