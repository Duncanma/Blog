---
date: 2023-12-09T10:44:59-08:00
title: You probably don't need nofollow
type: posts
tags:
- SEO
- Web Development
description: Web pages often add noindex,nofollow when they just meant noindex. Using nofollow incorrectly could prevent proper discovery of your pages by crawlers.
---

The quick summary of this guidance is, don’t use `noindex,nofollow` when you just mean `noindex`.

## Some context

HTML pages can have a meta tag on them, giving hints to Google and other search engines about how to crawl them. This tag, called `robots`, is a page level version of the robots.txt file and can tell search engines not to include a page in their index (by including the value `noindex`) and/or not to follow any links on the page to discover and crawl them (by including `nofollow`).

```html
<meta name="robots" content="noindex">
<meta name="robots" content="noindex,nofollow">
<meta name="robots" content="nofollow">
```

There are other supported values for this tag, and Google provides [the full list of instructions it understands](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag#directives), but `noindex` and `nofollow` are the ones that get the most use.

## Why are we doing this at all?

When looking at any piece of code, we should think about the underlying reason, and in this case the reason is generally “we don’t want this page coming up in Google search results”. Cool, that makes sense.

> By the way, it's worth noting that asking search engines not to index your content is a request, that they could ignore, and that it doesn't block content from being accessed. **This is not a security mechanism**, it is a way to avoid cluttering search indexes with certain pages.

I often use this tag on a list, or navigation page, like this [‘Posts tagged with SEO’](https://www.duncanmackenzie.net/tags/seo). It has a lot of text on it, but we don’t want people ending up here when they search, we want them to land on the individual posts. So, we specify `noindex`.

I have seen many cases where people add both `noindex` **&** `nofollow` in this situation. Having `nofollow` as well says “don’t follow the links on this page”, and that is almost never what we want. In the tag page example, if Google ends up crawling that page, I **want** it to then go crawl the posts.

## Why do people use them both?

I think it is an example of ‘copy and paste programming’, copying something without knowing exactly what it means. Many examples on the web of the robots tag show `noindex,nofollow`, even on Google’s own site. This page on [JavaScript SEO issues](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics#use-meta-robots-tags-carefully) includes the following content:

>For example, adding the following meta tag to the top of your page blocks Google from indexing the page:
>
>```html
><!--Google won't index this page or follow links on this page-->
><meta name="robots" content="noindex, nofollow">
>```

The comment over the meta tag points out that it *also* prevents following links, but it is easy to skim and read “blocks Google from indexing the page” and then copy that code snippet.

## When *would* we want to use nofollow?

I’ve only found one situation where I wanted to use `nofollow`, and that was on the user profile pages of [Channel 9](https://en.wikipedia.org/wiki/Channel_9_(Microsoft)).

We allowed users to add a bio and some links, but spammers appeared quickly. They would create profiles with links to their sketchy websites in the hope that Google would boost the rank of their pages. Being linked to from a high-rank site, like Channel 9, would pass along some credibility to their links. By putting `nofollow` on those pages, we could tell Google to ignore these links for crawling, while still leaving them there for users to click on.

That’s it. In many years of building web pages, that’s the only example I can think of where `nofollow` was the *right* solution for the page. For other similar cases, spam in forum posts for example, you can add `rel=nofollow` to individual links. Since I last worked on that type of content though, a new option `rel=ugc` has been added for exactly that case.

Summing up:

- If you want to tell search engines not to crawl your page, `noindex`.
- If you want to hint that the links on the page are not trusted or verified, `nofollow`.
