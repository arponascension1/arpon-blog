<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    /**
     * Display a listing of the contact messages.
     */
    public function index(): Response
    {
        return Inertia::render('Admin/Contacts/Index', [
            'contacts' => Contact::latest()->paginate(10),
        ]);
    }

    /**
     * Display the specified contact message.
     */
    public function show(Contact $contact): Response
    {
        if (! $contact->is_read) {
            $contact->update(['is_read' => true]);
        }

        return Inertia::render('Admin/Contacts/Show', [
            'contact' => $contact,
        ]);
    }

    /**
     * Remove the specified contact message from storage.
     */
    public function destroy(Contact $contact)
    {
        $contact->delete();

        return redirect()->route('admin.contacts.index')->with('success', 'Message deleted successfully.');
    }
}
