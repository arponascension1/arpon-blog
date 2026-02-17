<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Mail\ContactMessage;
use App\Models\Contact;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    /**
     * Show the contact page.
     */
    public function show(): Response
    {
        return Inertia::render('Blog/Contact');
    }

    /**
     * Store a new contact message.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'nullable|string|max:255',
            'message' => 'required|string',
        ]);

        $contact = Contact::create($validated);

        // Send email to admin if configured
        $adminEmail = Setting::where('key', 'admin_email')->value('value');
        if ($adminEmail) {
            try {
                Mail::to($adminEmail)->send(new ContactMessage($contact));
            } catch (\Exception $e) {
                // Log the error but don't stop the request
                \Illuminate\Support\Facades\Log::error('Mail sending failed: '.$e->getMessage());
            }
        }

        return redirect()->back()->with('success', 'Thank you! Your message has been sent successfully. We will get back to you soon.');
    }
}
