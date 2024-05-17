---
date: 2024-05-17T12:31:10-07:00
title: Adding prefetch and prerender using the Speculation Rules API
type: posts
tags:
 - Web Development
 - Coding
 - Hugo
 - Performance
 - DevTo
images:
 - /images/speculation-rules/loads.png
description: Retrieving a page before the user even requests it can make a fast web experience into an instant one, and Chrome's Speculation Rules API makes that possible with no code.
featured: true
---

We were brainstorming on performance improvements at work the other day, and I remembered I always planned to add some form of prefetch/prerender to my site. Prefetching is making a network request for a specific URL from the current page, with the idea that if the user visits that URL next, it will already be in their local cache and load faster. Prerendering is the same idea, but taken farther, instead of just loading the URL itself, it loads the URL and renders it, which means loading all the required sub-resources (CSS, JS, images), calculating layout, executing JavaScript, etc. Both are spending some of your user's bandwidth and CPU on a *bet* that it will benefit them later. If your pages are small and load fast, like I feel mine do, the benefit is low, but I still wanted to experiment with the concept.

>I often try things out on my personal site to explore the impact or just as a demonstration, and then sometimes look for applications on the big complex sites that I deal with at work.

## Deciding what to prerender or prefetch and how to make it happen

You have a few decisions to make; which of the URLs on the current page are most likely to be visited next and is it worth prefetching or prerendering each of them. If you are prefetching, it's lighter weight, so you could target **more** URLs without negative impact. Prerendering is heavy, so you'd want to be more conservative.

In my case, I had thought about this years ago, and had decided I wanted to prerender only internal links (links within my own site) and only when I was fairly confident the user was going to visit them. My plan was to write some script to prerender links on hover, which could just be a few hundred milliseconds before the click, but it seems a good indicator of intent. It's a script, which I try to avoid, but it is a progressive enhancement in the best way, if there's no script everything just works like normal.

Before I started though, I headed to Google to look for the best way to do the prerendering. Creating an invisible iFrame with the path to the page seemed like a valid idea, but I was curious if there might be a built-in way to ask the browser to do the prerendering for me. Well, I'm extremely glad I looked around, because I discovered a browser feature (Chrome only now, but that's 93% of my page views) I had never heard of, the [Speculation Rules API](https://developer.mozilla.org/en-US/docs/Web/API/Speculation_Rules_API).

This feature lets me add a block of configuration to my page, specifying rules on what should be prefetched and/or prerendered, and the browser will handle it all for me. It even has a setting, [eagerness](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/speculationrules#eagerness) that controls what signals are used to determine if the browser should start fetching/rendering. For example, if I wanted my hover behavior, then `moderate` or `eager` could both work, but `eager` will *also* look at less direct signals such as moving the mouse *towards* a link. You can specify URLs by a pattern such as `/albums/*` or by supplying a list of specific URLs, and you can do all of this for either prefetching or prerendering or both.

## Why is this better than writing the script myself?

- The browser knows things that would be hard for me to figure out. It won't prefetch/prerender if the user has a slow connection or low battery, for example.
- It can track many user signals (scroll position, mouse movement, length of hover) that would involve a great deal of extra code on my part.
- Someone else is working on tuning and optimizing this for the best user experience, I'm just giving them *hints* to help them understand my content.

## Why is this worse?

- It only works in Chrome (and Edge since they share the same underlying engine).
- It's less deterministic because I'm not in control. It is hard for me to know exactly when it will decide to act.

For me, this is an easy decision. Chrome is 93% of my traffic. I get to write/execute less code. And, finally, I see the concept of hinting vs. controlling to be a positive, because I trust the browser to have a better understanding of the user's intent than me.

{{% note %}}**Note:** I already had an older form of prefetching *hints* on my site, code that added a link element with `rel=next` or `rel=prev` to the `<head>` of my pages, if there was a newer or older post in that category. This was a hint to browsers that these pages were part of a series, and some would use it to prefetch. There was also a `rel=prefetch` directive, but I hadn't tried using that.

```go-html-template
{{ if .NextInSection }}
<link rel="next" href="{{ .NextInSection.RelPermalink }}">{{ end }}
{{ if .PrevInSection }}
<link rel="prev" href="{{ .PrevInSection.RelPermalink }}">{{ end }}
```

As part of the updates to my pages to add the new Speculation Rules, I also removed these now defunct `<link>` elements.{{% /note %}}

## Choosing my settings

With this technology decision made, I need to determine how I'll configure it. Which URLs should I prefetch and which should I prerender, and with what "eagerness" in each case.

My initial thought was that I am happy to prefetch (relatively low user impact) anything within my site, but I'd probably want to prerender in a slightly more conservative fashion.
This configuration, seems like it would accomplish that:

```html
<script type="speculationrules">
    {
      "prefetch": [
        {
          "where": { "href_matches": "/*" },
          "eagerness": "eager"
        }],
       "prerender": [
        {
          "where": { "href_matches": "/*" },
          "eagerness": "moderate"
        }]
    }
</script>
```

I added this to the javascript partial that renders at the bottom of my pages and set out to test it. First, I was trying to watch the network panel in developer tools, hoping to see pages and resources being fetched.

**Nothing. Not a single call.**

That confused me for a while, I thought it was because I was on localhost, or not on a secure connection, until I found [Barry Pollard’s post on Debugging speculation rules](https://developer.chrome.com/docs/devtools/application/debugging-speculation-rules), which showed me that these requests do *not* show up in the regular devtools, and that there is a dedicated feature in there that *does* let me debug them.

![Overview page of the Chrome devtools tab for debugging speculation rules](/images/speculation-rules/devtool-feature.png)

Awesome, this is the most amazing feature if you are working with this tech, but all it showed me was that my rules were being ignored “because speculative loading was disabled”. Turns out the feature, preloading, was disabled in Chrome and I had to turn it on.

![Chrome performance setting with preload pages toggle set to off](/images/speculation-rules/chrome-settings.png)

[Step 4 in this support page shows the steps]( https://support.google.com/chrome/answer/1385029), but I was dismayed, if the feature isn’t on by default, it won’t really have any impact to add support for it to my site. I tried to find some information online about the default state of this setting, but had no luck, so [I reached out to Barry Pollard](https://bsky.app/profile/duncanmackenzie.net/post/3ks7ylfuez32j), author of most of the related content I could see on Chrome’s web development site. He reassured me that it should be on by default for most people, which still makes me wonder why it was off for my machine, but it was a positive enough response that I decided to continue with this project.

> As a side note, isn’t the internet amazing, being able to at least try to ask questions of the experts?

Setting turned on (only standard preloading) and new devtool feature open, everything started working exactly as I had hoped. Visiting a blog post, like this one, the tool shows all the matching URLs (everything starting with `/*`) twice, once for prefetching and once for prerendering.

![the detail view of the speculation rules tab in devtools, showing all the valid URLs, with a mix of statuses such as Ready, Success, and Not Triggered](/images/speculation-rules/loads.png)

The prefetch entries snap to “Ready” very quickly, showing they’ve been requested in the background. If I then hover over a link, the prerender happens as well (and the prefetch changes to Success, because the prerender benefited from that earlier fetch).

So that’s all good, but with this code in place and the debugging page open, I ended up hitting [my /blog page](/blog), which lists every post I’ve ever written.

![the speculation rules tab in devtools, showing over 2000 URLs being eligible for prefetching](/images/speculation-rules/so-many-speculations.png)

Oh, that’s a lot of prefetching.

This isn’t a great use of prefetching, for a couple of reasons. First, it could put too much load on the user’s machine, but second, it’s likely that most of these will be wasted requests. So, I need to make some changes. On “list” pages like a tag page, my blog page, and my homepage, I want to make this a bit more restrictive. I could just move to a simpler set of instructions, like this (stolen right from [the documentation]( https://developer.chrome.com/docs/web-platform/prerender-pages#eagerness)):

```html
<script type="speculationrules">
{
  "prerender": [{
    "where": {
      "href_matches": "/*"
    },
    "eagerness": "moderate"
  }]
}
</script>
```

Only prerendering, and only in cases where it is likely the navigation is going to happen (probably after a long hover or on the start of a click). If I had better analytics on my site, I could make better decisions here, but I’m going to just make some assumptions. On list pages, I’m going to predict that my most recent content (if anything) is going to be clicked, and in addition to that prerender rule from above, I’m going to add in a list of 3 (or less) recent posts to be prefetched. My pages are very light, so I’m not worried that this level of prefetching is too heavy. Also remember that Chrome is aware of the user’s device, connection, etc. and will ignore my recommendations in some cases.

```go-html-template
<script type="speculationrules">
{{- if or (eq .Type "tags") (eq .Type "blog")}}
{{- $urls := slice }}
{{- range first 3 .Pages  }}
{{ $urls = $urls | append (printf "\"%s\"" .RelPermalink)  }}
{{- end }}
{{ $urlList := delimit $urls "," }}
<!-- list page -->
    {
        "prefetch": [
            {
                "urls": [ {{ $urlList | safeHTML }} ],
                "eagerness": "eager"
            }
        ],
        "prerender": [{
        "where": {
            "href_matches": "/*"
        },
        "eagerness": "conservative"
        }]
    }
{{- else }}
    {
      "prefetch": [
        {
          "where": { "href_matches": "/*" },
          "eagerness": "eager"
        }],
		"prerender": [
        {
          "where": { "href_matches": "/*" },
          "eagerness": "moderate"
        }]
    }
{{- end }}
</script>
```

I could add a different variation for the homepage, prefetching the top pages in each cateogry or similar, but I think the default page rules work. So for now, this is everything I need, all done and shipped.

## What's left to do?

In my own testing, this all seems to work, but ideally I would add some analytics to track the rate of success for these rules. There are [ways to determine if a page was prerendered using JavaScript](https://developer.chrome.com/docs/web-platform/prerender-pages#detect-prerender-in-javascript) and [headers are also sent with these requests](https://developer.chrome.com/docs/web-platform/prerender-pages#detect-server-side) that would make it possible to track them on the server. I haven't done either of these yet, but I've been considering creating my own analytics tracking and I may add checks for this in at that point. 
