<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
    <title>{{ config('app.name') }}</title>
    <link href="{{ url('/feed') }}" rel="self"/>
    <link href="{{ url('/') }}"/>
    <updated>{{ now()->toAtomString() }}</updated>
    <id>{{ url('/') }}</id>
    <author>
        <name>{{ config('app.name') }}</name>
    </author>

    @foreach ($posts as $post)
        <entry>
            <title>{{ $post->title }}</title>
            <link href="{{ route('posts.show', $post->slug) }}"/>
            <id>{{ route('posts.show', $post->slug) }}</id>
            <author>
                <name>{{ $post->author->name }}</name>
            </author>
            <summary type="html">{{ $post->excerpt }}</summary>
            <content type="html"><![CDATA[{!! $post->content !!}]]></content>
            @if($post->category)
                <category term="{{ $post->category->slug }}" label="{{ $post->category->name }}" />
            @endif
            <updated>{{ $post->updated_at->toAtomString() }}</updated>
        </entry>
    @endforeach
</feed>
