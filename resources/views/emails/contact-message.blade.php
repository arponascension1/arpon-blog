<x-mail::message>
# New Message from Contact Form

**Name:** {{ $contact->name }}  
**Email:** {{ $contact->email }}  
**Subject:** {{ $contact->subject ?? 'N/A' }}

**Message:**  
{{ $contact->message }}

<x-mail::button :url="route('admin.contacts.show', $contact->id)">
View Message in Admin Panel
</x-mail::button>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
