---
date: 2007-04-19T22:35:00+00:00
title: Trackbacks and URL matching
type: posts
---
I recently noticed a bug in the trackback code on Channel 10, some sites were failing to send us trackbacks, even though we were receiving trackbacks from other sources and those sites were happily trackbacking (I'm just annoying the spell checker today) other blogs.

Turns out the problem appears to be in our RDF block on our blog pages. On a page like [this](http://on10.net/blogs/tina/exclusive-video-first-look-at-the-xbox-elite/), the RDF block contains the following element:

`dc:identifier="http://on10.net/Blogs/tina/exclusive-video-first-look-at-the-xbox-elite/"`

This uses the permalink URL that we provide for this page, but of course there are several other urls that work to get to the same resource including

  * http://on10.net/Blogs/tina/exclusive-video-first-look-at-the-xbox-elite/default.aspx,
  * http://www.on10.net/Blogs/tina/exclusive-video-first-look-at-the-xbox-elite/ and
  * http://www.on10.net/Blogs/tina/exclusive-video-first-look-at-the-xbox-elite/default.aspx

When a client, some other blog or blog posting software, goes to auto-discover our trackback URL they try to match the dc:identifier to whatever url they used in their post. So, if they didn't use the one we've chosen for our dc:identifier, then they don't find our trackback info, they don't send the trackback, and we don't get the trackback.

This sucks, but what is the right way to handle it? Add four distinct RDF blocks? Or is there some way to include all four URLs in the one RDF block?
