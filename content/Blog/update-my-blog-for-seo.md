---
date: 2021-03-14T09:31:30-07:00
title: Updating my blog for SEO
type: posts
tags:
 - SEO
 - Web Development
 - Coding
 - Hugo
description: A few small fixes to my blog template to clean up how Google and other crawlers see my content.
---
In [my recent article on assessing your site for SEO (Search Engine
Optimization)](/blog/assessing-your-site-for-seo/), I mentioned a few
issues I found with my **own** site as I was going along. Nothing
critical that would block Google from indexing my pages (the search
engine crawler being able to read my content and put it into its catalog
of content), but still a couple of improvements for me to make.

## Adding noindex to my non-content pages

The first issue was that my 'list' pages, which is my general name for
pages that exist to help you navigate to content instead of **being**
content themselves, were showing up in searches. On my site, this
included the "blog" page ([Blogs :: Duncan
Mackenzie](https://www.duncanmackenzie.net/blog/)), the tag pages (such
as [Web Development :: Duncan
Mackenzie](https://www.duncanmackenzie.net/tags/web-development)), and
the tag listing page ([Tags :: Duncan
Mackenzie](https://www.duncanmackenzie.net/tags/)). These are important
pages, as they allow someone to browse around the site and find related
posts, but they tend to be full of keywords from all the post titles and
end up competing with the actual content. If you remember from the SEO
post, you have two instructions you can give to Google and other search
engines, you can ask them to follow or not follow the links on a page
(`FOLLOW` or `NOFOLLOW`) and you can ask them to index or not index (`INDEX`
or `NOINDEX`). You can combine these two values as well, but the default
is `FOLLOW, INDEX` so you can skip them if that is the desired behavior.

In this case, what I want is to avoid the pages showing up in search,
but I want the search engine to follow the links. Following the links on
these listing pages will help it find more of my content pages and
understand the relationship between all my posts. Putting either

```html
<meta name="robots" content="noindex" />
```

Or

```html
<meta name="robots" content="noindex,follow" />
```

Would work, but `follow` is the default, so just `noindex` is best.

To add this line using [Hugo](https://gohugo.io/), the site generation
software I'm using, I [updated my
theme](https://github.com/DuncanmaMSFT/hugo-theme-hello-friend-ng/commit/4bd6450c75431bf2fe6245a1f7bb8e0c56de49ef):

```go-html-template
{{ if or (eq .Type "tags") (eq .Type "blog")}}<meta name="robots"
content="noindex" />{{ end }}
```

In my case, there are only two page-types where I want to make this
change, so a simple `if` statement works. If you had a more complex
setup, you could put a collection of page-types into your theme
settings.

## Removing these same pages from my sitemap

Within a couple of days of making the change above, Google added a bunch
of warning statements about my site to the search console. The issue was
that I had submitted pages for indexing (by having them in my sitemap)
that I had marked as `noindex`. This seems like a mistake, but I had mixed
feelings. As I mentioned above, I do want these pages to be crawled and
their links to be followed, so submitting them to Google seemed fine.
On the other hand, there are links to the blog on every page and tag
links at the bottom of each post, so those pages are going to be found
either way. I decided it would be best to have a clean report from the
search console, so I needed to remove these list pages from my sitemap.
In Hugo, the sitemap is a built-in template, so you can't edit it, but
you can override by [adding your
own](https://github.com/DuncanmaMSFT/hugo-theme-hello-friend-ng/commit/4fcb5078b92b419ed8728ce3948d90caa93fd9b3).

```go-html-template
{{ printf "<?xml version=\"1.0\" encoding=\"utf-8\" standalone=\"yes\" ?>" | safeHTML }}
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
  {{ range where .Data.Pages "Type" "not in" "[\"blog\", \"tags\"]" }}
  <url>
    <loc>{{ .Permalink }}</loc>{{ if not .Lastmod.IsZero }}
    <lastmod>{{ safeHTML ( .Lastmod.Format "2006-01-02T15:04:05-07:00" ) }}</lastmod>{{ end }}{{ with .Sitemap.ChangeFreq }}
    <changefreq>{{ . }}</changefreq>{{ end }}{{ if ge .Sitemap.Priority 0.0 }}
    <priority>{{ .Sitemap.Priority }}</priority>{{ end }}{{ if .IsTranslated }}{{ range .Translations }}
    <xhtml:link
                rel="alternate"
                hreflang="{{ .Lang }}"
                href="{{ .Permalink }}"
                />{{ end }}
    <xhtml:link
                rel="alternate"
                hreflang="{{ .Lang }}"
                href="{{ .Permalink }}"
                />{{ end }}
  </url>
  {{ end }}
</urlset>
```

Similar to the earlier change, adding a where clause to the loop skips
these list pages

```go-html-template
{{ range where .Data.Pages "Type" "not in" "[\"blog\",\"tags\"]" }}
```

A few days later (most changes to your site are going to take Google a
while to react to), the warnings went away, and I took pride in my clean
search console report.

## Getting Google to use my page descriptions

This one was just a complete mistake on my part. I have been setting the
description metadata on all my posts, in the YAML block at the top of
the markdown file, and I was just **assuming** it was turning into the
meta description in the HTML output. As I was making the earlier noindex
change, I replaced a robots value of `noodp` which is [no longer
supported](https://www.seroundtable.com/google-stops-noodp-robots-directive-23942.html)
but used to indicate that Google should use your page's description
instead of one from a public directory. That led to me wondering how my
descriptions were showing up on Google and doing some test searches. In
every case, Google had inferred a description from the first paragraph
or so of content instead of using the description I supplied in my
posts. Turns out that my theme was happily auto-generating this
`summary` snippet, because the template had

```go-html-template
<meta name="description" content="{{ if .IsHome }}{{
.Site.Params.homeSubtitle }}{{ else }}{{ .Summary | plainify }}{{ end
}}\" />
```

The `.Summary` variable can be supplied in the YAML at the top of your
posts, but if it is not provided then Hugo will take the first 70 words.
This is an excellent feature, but I had gone ahead and provided a
\`description\` value on each page, so I changed the template to use
that first if it is available. I left `.Summary` in there as a fallback.

```go-html-template
<meta name="description" content="{{ if .IsHome }}{{
.Site.Params.homeSubtitle }}{{ else }}{{ with .Description }}{{ . }}{{
else }}{{if .IsPage}}{{ .Summary | plainify }}{{ else }}{{ with
.Site.Params.description }}{{ . }}{{ end }}{{ end }}{{ end }}{{ end }}"
/>
```

Google can ignore your suggestion for a description, especially if it is
short, and generate one from the page content instead but I still prefer
to provide my own as a starting point.

## Practicing what I preach

Part of my motivation in fixing these issues was just to ensure I was
doing the same best practices that I would advise other folks to do.
Google, and other search engines, is remarkably capable of pulling all
your content into its index even when you make a few mistakes, but it is
still better to do some tests and fix up any issues you see. I'm sure
there are a few more issues that I haven't noticed yet, feel free to let
me know if anything jumps out at you!