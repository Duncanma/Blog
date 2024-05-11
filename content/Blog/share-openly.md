---
date: 2024-05-11T13:25:44-07:00
title: Adding sharing to my posts via ShareOpenly
type: posts
tags:
 - Web Development
 - Coding
 - Hugo
 - ShareOpenly
images:
 - /images/shareopenly-pick-destination.png
description: I just learned about Ben Werdmuller's ShareOpenly tool today, and I've already added it to my site.
---

Just a quick post introducing Ben Werdmuller's ShareOpenly tool, and showing how I added it to my site. I saw [Ben post about this on Bluesky](https://bsky.app/profile/werd.io/post/3ks5cng4bwz2z), read [his great intro article about it](https://werd.io/2024/share-openly), and decided I wanted to add it to my site.

I'm planning to use it in a few places, so I started by making a partial that takes the current page as a param.

```go-html-template
{{- $description := .Site.Params.description -}}
{{- if .IsHome -}}
{{-    $description = .Site.Params.homeSubtitle -}}
{{- else if .Description -}}
{{-    $description = .Description -}}
{{- else if .IsPage -}}
{{-    $description = .Summary | plainify -}}
{{- end -}}
<span class="share">
    <a href="https://shareopenly.org/share/?url={{ .Permalink }}
        &amp;text={{ $description | truncate 180 }}">
<svg ... >(the share openly logo)</svg>Share</a></span></p>
```

The mess of `if` statements at the start is just to grab a reasonable description from any page I might use it on. This is definitely overkill for my *current* use, which is just on blog posts. After that, it's just a link with the URL and some text, around a SVG of ShareOpenly's logo.

That's it... I added this to the top and bottom sections of my post layout, giving me these little links (you can see it on this page by just looking up by the title).

![Share link with the logo next to it](/images/shareopenly-link.png)

Clicking the link takes you to a destination selection page, where you can pick from a variety of the new social media sites out there.

![Pick your destination, showing Mastadon, BlueSky and other sites](/images/shareopenly-pick-destination.png)

Of course, people can always grab the link from the address bar, or using the browser's sharing features. This may act as a little hint to share something you enjoy though, maybe try it right now just for the thrill of it! ;)
