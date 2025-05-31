---
date: 2025-05-30T17:16:39-07:00
title: Adding Bluesky likes to my Hugo based blog posts
type: posts
tags:
 - Web Development
 - Bluesky
 - Hugo
description: Using Salma Alam-Naylor's code, I add a feature onto my Hugo site to display Bluesky 'likes' on my blog posts.
featured: true
blueskyPostID: 3lqgifp5sj22s
---

I read [Salma Alam-Naylor’s post about how she added a cool feature to her blog posts]( https://whitep4nth3r.com/blog/show-bluesky-likes-on-blog-posts/) and decided to replicate it exactly onto my Hugo site. This feature displays a list of Bluesky accounts that liked a specific post (her public post linking to the article), right on the page.
![a long list of accounts that liked Salma’s blog post](/images/blueskylikes.png)
There isn’t much for me to explain about the code, you should read her post first to understand what it is and how it works, but I’ll go through the basics. You need to associate the Bluesky Post ID with a given post on your site. In my system, I added this as a custom frontmatter field in my markdown.


```markdown
---
date: 2024-05-17T12:31:10-07:00
title: Adding prefetch and prerender using the Speculation Rules API
featured: true
blueskyPostID: 3l74i6nhjwc2f
---
```

Then at runtime, because you want the list of likes to be up-to-date, JavaScript is used to call a public Bluesky API and pull the list of likes for that specific post ID.

To implement this in Hugo, I added post IDs to my pages and added my Bluesky handle into my site config. Then I created a ‘bluesky.html’ partial and added it to the bottom of my post layout.

```go-html-template
{{ $handle := .Site.Params.bluesky.handle }}
{{ $postID := .Params.blueskyPostID }}

{{ if $handle }}
    {{ if $postID }}
<meta data-bsky-post-id="{{ $postID }}"/>
<section class="post__likes hidden" data-bsky-container>
  <p class="post__likesTitle">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
      viewBox="0 0 16 16" fill="none" stroke="currentColor"
      stroke-width="1"><title>Bluesky</title>
      <path d="…" /></svg>
      <span data-bsky-likes-count></span> likes on Bluesky
  </p>
  <ul data-bsky-likes class="post__likesList"></ul>
</section>
<p><a class="post__likesCta"
  href="https://bsky.app/profile/{{ $handle }}/post/{{ $postID }}">
  Like this post on Bluesky to see your face on this page
   or comment with your thoughts!
  </a>
</p>
{{ $blueskyScript := resources.Get "js/bluesky.js"}}
{{ $secureBluesky := $blueskyScript | resources.Fingerprint "sha512"}}
<script type="text/javascript" src="{{ $secureBluesky.RelPermalink }}"
 integrity="{{ $secureBluesky.Data.Integrity }}" defer></script>
    {{ else }}
            <p>Thoughts on this post?
            <a href="https://bsky.app/profile/{{ $handle }}">
            Feel free to reach out on Bluesky!</a></p>
    {{ end }}
{{ end }}
```

This provides a placeholder for the likes to be added, loads the post ID & my Bluesky handle ([duncanmackenzie.net](https://bsky.app/profile/duncanmackenzie.net)) onto the page to be accessible to JavaScript, and in my implementation, I also include the script reference itself.

Then, in my `single.html` for posts, I have:
```go-html-template
        <div class="feedback">
            {{ partial "bluesky.html" . }}
        </div>
```

That’s it, you can see all the parts in [this git commit]( https://github.com/Duncanma/Blog/commit/91060dc05b49452305c2ea86e930aca42f50f9a7) if you want to get into the details or go back and read Salma’s post again. I’m far away from hitting four full rows of avatars like Salma’s post has, but the code is ready for that if it happens!