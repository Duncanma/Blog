---
date: 2021-07-10T12:25:00-08:00
title: Don't depend on Referrer info
type: posts
tags:
- Web Development
description: Determining the source of traffic to your pages is often done via the referral information passed in the request, but this information is often unavailable or inaccurate. 
techfeatured: true
---

Over the years, many people have asked me to give them data on, or act
based on, the site that a user is coming from when they hit our pages.

* Can we find out exactly how many people came to this page from that tweet?
* If someone comes to the site after searching Google for X, can we redirect them to <Y>?
* Can we show a message to anyone who ends up on the site after a redirect from the old site?

There is a common misconception that we can **always** determine that
information through the referrer (the HTTP_Referer header). In reality, this is often not available, and there is
nothing that can be done to change that fact. I'll suggest some alternative paths at the end of this article, but depending on the situation there might not be any real options.

## A quick overview of the HTTP_Referer header

Imagine a user is visiting a random web page out in the world, say
http://www.example.com/foo.html, and clicks a link on that page to visit
my site at https://www.duncanmackenzie.net. The source of that traffic
to my site is useful to you as a site owner, it can help you understand the impact of
various marketing activities for example, so a header was defined to
allow browsers to pass that source link along. At the most basic level,
when a user clicks a link to page B on page A, the request for that new
page (B) will contain a header (HTTP_Referer, and yes that is a spelling
mistake on the word referrer) telling the new page that the user was
coming from page A. One common use of this header, was to look for
referrals from Google or another search engine, and then extract the
search term from the URL. If I go to Google.com and search for \`Duncan
Mackenzie Microsoft\`, then the URL of my page of results is:

```
https://www.google.com/search?q=Duncan+Mackenzie+Microsoft&source=hp&ei=X-rkYJHyOeKc0PEPrO6hsAE&iflsig=AINFCbYAAAAAYOT4b4Cz7MUaxenq5zP_Ktnl9jqHwrhp&oq=Duncan+Mackenzie+Microsoft&gs_lcp=Cgdnd3Mtd2l6EAMyBggAEBYQHjoOCC4QsQMQxwEQowIQkwI6CAgAELEDEIMBOgIIADoFCAAQsQM6CwguELEDEMcBEKMCOggILhDHARCjAjoFCC4QsQM6BQgAEMkDOgUIABCSAzoCCC46CAguEMcBEK8BOggILhCxAxCTAjoICC4QsQMQgwE6BwgAELEDEAo6BQguEJMCOgcILhAKEJMCOgQIABAKOgQILhAKOggIABAWEAoQHlC9E1iiNWCBN2gEcAB4AIABdogBsQ-SAQQyNy4xmAEAoAEBqgEHZ3dzLXdpeg&sclient=gws-wiz&ved=0ahUKEwjRnZrKz8_xAhViDjQIHSx3CBYQ4dUDCAo&uact=5
```

In the olden days, it was common for analytics software to extract the
`q=Duncan+Mackenzie+Microsoft` bit out of that URL. Now you know what
search terms led the user to your site and by the **absence** of a
`start=10` query in there, you can also determine the user found this
link on the first page of their search results. Great info and very
helpful to the site owner, but it is also a gaping security/privacy
hole for the user.

## Security and Privacy implications of referral information

The privacy issues inherent in a referral URL might not be immediately
obvious when we are looking at random queries on Google, but it doesn't
take long to construct a more concerning scenario. Imagine I'm on a
forum focused on LBTQIA+ topics, and for whatever reason (based on where
I live or even just personal preference) I wouldn't want people to know
that I frequent that particular site. Now, as part of some discussion on
that forum, someone suggests a great product over on Amazon.com and
provides a link... by clicking that link, I'm giving Amazon some
information I probably didn't intend to share. Should that matter and
would Amazon do anything with that info? It honestly doesn't matter, the
key here is: **some information, private to you, is being shared without
you intending it to be**.

The security side of this is a bit harder to find an easy example, but
it is not uncommon for sites to put some type of identifying information
about you or your session into the URL (I've seen `?display_name=Duncan`
or `?uid=<guid>` in URLs on various sites before) and now that
information is being sent out to some random untrusted site just because
you clicked on a link. Once again, you have no way of knowing if that
information on its own is a real security issue, but it is being
transmitted and that's an issue.

The types of issues I've described were spotted pretty quickly by
security/privacy experts and by the browser teams themselves, and the
end result is that (with modern browsers) full referral information is rarely transmitted from
one site to another. This is due to something known as the [referral
policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy),
and more specifically by the **default** policy browsers have
implemented. I'm not going to go into a full explanation of this topic
and how to use it on your pages, my focus in this article is what this
means for you if you are interested in looking at referral information.

Going back to our Google search example, one of the links on that search
result page was to a post on my blog. If you open up the network tab of
your browser dev tools and then click on the link, you can see exactly
what Referer header is being passed. In any modern browser, this header
will be:

```
referer: https://www.google.com/
```

Just the origin is being passed, even though that is not the URL I was
on before clicking the link, and this is missing all the useful info
like the query terms that brought me to this results page. This is 'by
design', as Google has set a meta tag on the search result pages of :

```
<meta content="origin" name="referrer"\>
```

The value of "origin" for the referrer meta tag (note that the meta tag
is correctly spelled, even though the HTTP header is not) tells the
browser to only pass along the root URL for the site when navigating. I
mentioned this would be the case in any **modern** browser, and that's
because support for referral policy was only added to browsers starting
back in 2016. If I jump over to Internet Explorer and try the same
steps, the referer header has a lot more info:

```
Referer:
https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&ved=2ahUKEwiq76HJ1s_xAhWIup4KHcInCfUQFjAFegQIFxAD&url=https%3A%2F%2Fwww.duncanmackenzie.net%2Fblog%2Fdocs-overview%2F&usg=AOvVaw3CauyB6Ji_GOgSFFQDqfoC
```

IE ignores the meta tag telling it to only include the origin, but if
you look at that URL you will see it is **still** missing all the
interesting query parameters such as my search terms. This is a special
bit of coding done by Google, they know the URL is going to get sent in
this case, so when an IE user clicks on a search result, they go through
a redirect to clear some of that useful info out of the URL.

## Default referral policy

In most browsers, the default policy if the page doesn't specify one, is
`strict-origin-when-cross-origin`. This means that if the link is to
another origin (so from a page on mycoolwebforum.com to amazon.com, for
example) then only the origin of the source site is sent. That is still
information and (depending on the site the user is on) it could be
sensitive, but it is exposing a lot less than the full URL might. The
'strict' part of that policy also covers the specific case where the
user is on a secure page (a https link) and navigates to a non-secure
page (a http url) in which case **no referrer value is passed at all**.

## Ok, so what does this all mean?

I'd call this the "TL;DR" (too long; didn't read), except that I put it
at the end.

If you are running a site and you want to be the most privacy conscious
you can be, add a referrer meta tag value of no-referrer or
strict-origin. In the first case, link clicks will **never** include the
source URL, and in the second, links that go outside of the current
domain will not include the source. Essentially, doing the second means
that **you** can still use this data to understand user journeys on
**your** site.

As a web developer though, what the main takeaway from all of this is
that **in most cases you cannot determine the page a user is coming from when they visit your site**. You can, in some cases, determine the
origin (so you can tell this is traffic from Google, Bing, Twitter, etc.), but not in every
case depending on the way the source site is configured. 

If you are building a feature that requires you know the source of some incoming
traffic, then **you should change the incoming URL**. Adding a query
param of `?traffic_source=<foo.com>` would work or you can use campaign
IDs (details depend on your analytics, but you'll have seen examples like WT.mc_id in URLs all over the web) that have the advantage of already being supported by many types of
analytics software. 

If you have no control over the source page/link, then honestly, you are out of luck. You might pick up some referrer
information, from older browsers, but you **cannot depend on this** to work in most cases.

