---
date: 2005-12-12T18:03:00+00:00
title: application/rss+xml vs. text/xml
type: posts
---
I've been working on some feed support in MSDN's new online platform (a beta of which is running [http://msdn2.microsoft.com](http://msdn2.microsoft.com)) and I had to decide what content-type to use when outputting a RSS feed. I knew this was a contentious issue in the past, but I thought it might have been resolved so I did some browsing of specs and discussions and ended up with the following links:

  * [A discussion on Sam Ruby's blog around content-type](http://www.intertwingly.net/blog/1766.html) (the comments are the interesting part)
  * [This post by Dave Winer](http://blogs.law.harvard.edu/crimson1/2004/05/06#a1519)

I'm sure I could find more, but it appears this was never really resolved... using application/xml seems the most 'proper', but the concern is that some browsers don't know how to handle it ... so the other choice is text/xml (specifically text/xml; charset=utf-8 or else the charset will default to US-ASCII). Hmm... which to choose? Even our own sites have multiple implementations:

  * The [main MSDN feed](http://msdn.microsoft.com/rss.xml) is application/xml
  * while the [MSDN Magazine's](http://msdn.microsoft.com/msdnmag/rss/rss.aspx?Sub=Service Station) (which is dynamically generated using ASP.NET) is output as text/xml; charset=utf-8

Interestingly enough, I found one feed that used application/rss+xml ([Sam's RSS 2.0 feed](http://www.intertwingly.net/blog/index.rss2)) which I think is probably not the best choice since that content type was never officially registered, and it was the only feed I hit that IE didn't understand (and therefore tried to just download).

I think I will go with "application/xml" which has the best features in my opinion.

  * It clearly indicates that this is not just text, so it should avoid issues with proxies messing with the characters,
  * it leaves the character set data in the xml declaration, avoiding a possible conflict if I specify one in the http headers that is different than what the feed specifies,
  * it displays correctly in IE and Firefox, and
  * it is consistent with what we are doing today with the MSDN main feed.

Now, what about those in-page links we have? <link rel="alternate" type="application/rss+xml" title="blah" href="rss.xml" /> .... perhaps they should be just "application/xml" as well?
