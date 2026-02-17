<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class MediaController extends Controller
{
    protected string $disk = 'media';

    public function index(Request $request): Response
    {
        $path = $request->query('path', '');
        $disk = Storage::disk($this->disk);
        $search = $request->query('search');
        $sortBy = $request->query('sort_by', 'name'); // name, size, last_modified
        $sortOrder = $request->query('sort_order', 'asc');
        $perPage = 30;
        $page = $request->query('page', 1);

        // Ensure the path doesn't go above the root and is clean
        $path = str_replace('..', '', ltrim($path, '/'));

        $directories = collect($disk->directories($path))->map(function ($dir) {
            return [
                'name' => basename($dir),
                'path' => $dir,
                'type' => 'folder',
                'size' => 0,
                'last_modified' => Storage::disk($this->disk)->lastModified($dir),
            ];
        });

        $files = collect($disk->files($path))->map(function ($file) use ($disk) {
            $mime = $disk->mimeType($file);

            return [
                'name' => basename($file),
                'path' => $file,
                'type' => 'file',
                'size' => $disk->size($file),
                'mime' => $mime ?: 'application/octet-stream',
                'url' => $disk->url($file),
                'last_modified' => $disk->lastModified($file),
            ];
        });

        $items = $directories->concat($files);

        // Filter out hidden files (starting with dot)
        $items = $items->filter(function ($item) {
            return ! str_starts_with($item['name'], '.');
        });

        // Filter by search
        if ($search) {
            $items = $items->filter(function ($item) use ($search) {
                return str_contains(strtolower($item['name']), strtolower($search));
            });
        }

        // Sort items (Mixed types, Letters before Numbers)
        $items = $items->sort(function ($a, $b) use ($sortBy, $sortOrder) {
            $valA = $a[$sortBy] ?? '';
            $valB = $b[$sortBy] ?? '';

            if ($sortBy === 'name') {
                $charA = substr($valA, 0, 1);
                $charB = substr($valB, 0, 1);

                $isAlphaA = ctype_alpha($charA);
                $isAlphaB = ctype_alpha($charB);

                if ($isAlphaA && ! $isAlphaB) {
                    $result = -1; // Letters come before numbers/symbols
                } elseif (! $isAlphaA && $isAlphaB) {
                    $result = 1; // Numbers/symbols come after letters
                } else {
                    $result = strnatcasecmp($valA, $valB);
                }

                return $sortOrder === 'asc' ? $result : -$result;
            }

            if ($valA == $valB) {
                return 0;
            }

            if ($sortOrder === 'asc') {
                return $valA < $valB ? -1 : 1;
            }

            return $valA > $valB ? -1 : 1;
        });

        $total = $items->count();
        $pagedItems = $items->forPage($page, $perPage)->values();

        $paginator = new LengthAwarePaginator(
            $pagedItems,
            $total,
            $perPage,
            $page,
            ['path' => $request->url(), 'query' => $request->query()]
        );

        return Inertia::render('Admin/Media/Index', [
            'items' => Inertia::scroll($paginator, wrapper: 'items'),
            'currentPath' => $path,
            'breadcrumbs' => $this->getBreadcrumbs($path),
            'allDirectories' => $this->allDirectories(),
            'filters' => [
                'search' => $search,
                'sort_by' => $sortBy,
                'sort_order' => $sortOrder,
            ],
        ]);
    }

    private function getBreadcrumbs(string $path): array
    {
        $breadcrumbs = [['name' => 'Root', 'path' => '']];
        if (empty($path)) {
            return $breadcrumbs;
        }

        $parts = array_filter(explode('/', $path));
        $current = '';

        foreach ($parts as $part) {
            $current .= ($current ? '/' : '').$part;
            $breadcrumbs[] = [
                'name' => $part,
                'path' => $current,
            ];
        }

        return $breadcrumbs;
    }

    public function upload(Request $request): RedirectResponse
    {
        $request->validate([
            'files.*' => 'required|file|max:10240', // 10MB limit
            'path' => 'nullable|string',
        ]);

        $path = $request->input('path', '');
        $path = str_replace('..', '', ltrim($path, '/'));
        $files = $request->file('files');

        foreach ($files as $file) {
            $file->storeAs($path, $file->getClientOriginalName(), $this->disk);
        }

        return back();
    }

    public function createFolder(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'path' => 'nullable|string',
        ]);

        $path = $request->input('path', '');
        $path = str_replace('..', '', ltrim($path, '/'));
        $folderName = $request->input('name');

        $fullPath = $path ? $path.'/'.$folderName : $folderName;

        Storage::disk($this->disk)->makeDirectory($fullPath);

        return back();
    }

    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'items' => 'required|array',
            'items.*.path' => 'required|string',
            'items.*.type' => 'required|in:file,folder',
        ]);

        $disk = Storage::disk($this->disk);

        foreach ($request->input('items') as $item) {
            $itemPath = str_replace('..', '', $item['path']);
            if ($item['type'] === 'file') {
                $disk->delete($itemPath);
            } else {
                $disk->deleteDirectory($itemPath);
            }
        }

        return back();
    }

    public function rename(Request $request): RedirectResponse
    {
        $request->validate([
            'path' => 'required|string',
            'new_name' => 'required|string|max:255',
            'type' => 'required|in:file,folder',
        ]);

        $oldPath = str_replace('..', '', $request->input('path'));
        $newName = $request->input('new_name');

        $directory = dirname($oldPath);
        $directory = $directory === '.' ? '' : $directory;
        $newPath = $directory ? $directory.'/'.$newName : $newName;

        if (Storage::disk($this->disk)->exists($newPath)) {
            return back()->withErrors(['new_name' => 'A file or folder with this name already exists.']);
        }

        Storage::disk($this->disk)->move($oldPath, $newPath);

        return back();
    }

    public function move(Request $request): RedirectResponse
    {
        $request->validate([
            'items' => 'required|array',
            'items.*.path' => 'required|string',
            'destination' => 'required|string',
        ]);

        $destination = str_replace('..', '', ltrim($request->input('destination'), '/'));
        $disk = Storage::disk($this->disk);

        foreach ($request->input('items') as $item) {
            $oldPath = str_replace('..', '', $item['path']);
            $filename = basename($oldPath);
            $newPath = $destination ? $destination.'/'.$filename : $filename;

            if ($oldPath !== $newPath) {
                $disk->move($oldPath, $newPath);
            }
        }

        return back();
    }

    public function allDirectories(): array
    {
        $disk = Storage::disk($this->disk);
        $allDirectories = $disk->allDirectories();

        return array_merge(['Root'], $allDirectories);
    }

    public function fetch(Request $request): JsonResponse
    {
        $path = $request->query('path', '');
        $disk = Storage::disk($this->disk);
        $search = $request->query('search');
        $sortBy = $request->query('sort_by', 'name');
        $sortOrder = $request->query('sort_order', 'asc');
        $perPage = 30;
        $page = $request->query('page', 1);

        $path = str_replace('..', '', ltrim($path, '/'));

        $directories = collect($disk->directories($path))->map(function ($dir) {
            return [
                'name' => basename($dir),
                'path' => $dir,
                'type' => 'folder',
                'size' => 0,
                'last_modified' => Storage::disk($this->disk)->lastModified($dir),
            ];
        });

        $files = collect($disk->files($path))->map(function ($file) use ($disk) {
            $mime = $disk->mimeType($file);

            return [
                'name' => basename($file),
                'path' => $file,
                'type' => 'file',
                'size' => $disk->size($file),
                'mime' => $mime ?: 'application/octet-stream',
                'url' => $disk->url($file),
                'last_modified' => $disk->lastModified($file),
            ];
        });

        $items = $directories->concat($files);

        // Filter out hidden files (starting with dot)
        $items = $items->filter(function ($item) {
            return ! str_starts_with($item['name'], '.');
        });

        if ($search) {
            $items = $items->filter(function ($item) use ($search) {
                return str_contains(strtolower($item['name']), strtolower($search));
            });
        }

        $items = $items->sort(function ($a, $b) use ($sortBy, $sortOrder) {
            $valA = $a[$sortBy] ?? '';
            $valB = $b[$sortBy] ?? '';

            if ($sortBy === 'name') {
                $charA = substr($valA, 0, 1);
                $charB = substr($valB, 0, 1);

                $isAlphaA = ctype_alpha($charA);
                $isAlphaB = ctype_alpha($charB);

                if ($isAlphaA && ! $isAlphaB) {
                    $result = -1;
                } elseif (! $isAlphaA && $isAlphaB) {
                    $result = 1;
                } else {
                    $result = strnatcasecmp($valA, $valB);
                }

                return $sortOrder === 'asc' ? $result : -$result;
            }

            if ($valA == $valB) {
                return 0;
            }

            if ($sortOrder === 'asc') {
                return $valA < $valB ? -1 : 1;
            }

            return $valA > $valB ? -1 : 1;
        });

        $total = $items->count();
        $pagedItems = $items->forPage($page, $perPage)->values();

        return response()->json([
            'items' => $pagedItems,
            'total' => $total,
            'next_page' => ($page * $perPage < $total) ? $page + 1 : null,
            'breadcrumbs' => $this->getBreadcrumbs($path),
        ]);
    }
}
