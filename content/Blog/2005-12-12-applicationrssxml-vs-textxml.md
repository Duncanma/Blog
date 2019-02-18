I&#8217;ve been working on some feed support in MSDN&#8217;s new online platform (a beta of which is running <a href="http://msdn2.microsoft.com" target="_blank">http://msdn2.microsoft.com</a>) and I had to decide what content-type to use when outputting a RSS feed. I knew this was a contentious issue in the past, but I thought it might have been resolved so I did some browsing of specs and discussions and ended up with the following links:

  * <a href="http://www.intertwingly.net/blog/1766.html" target="_blank">A discussion on Sam Ruby&#8217;s blog around content-type</a> (the comments are the interesting part)
  * <a href="http://blogs.law.harvard.edu/crimson1/2004/05/06#a1519" target="_blank">This post by Dave Winer</a>

I&#8217;m sure I could find more, but it appears this was never really resolved&#8230; using application/xml seems the most &#8216;proper&#8217;, but the concern is that some browsers don&#8217;t know how to handle it &#8230; so the other choice is text/xml (specifically text/xml; charset=utf-8 or else the charset will default to US-ASCII). Hmm&#8230; which to choose? Even our own sites have multiple implementations:

  * The <a href="http://msdn.microsoft.com/rss.xml" target="_blank" class="broken_link">main MSDN feed</a> is application/xml
  * while the <a href="http://msdn.microsoft.com/msdnmag/rss/rss.aspx?Sub=Service Station" target="_blank" class="broken_link">MSDN Magazine&#8217;s</a> (which is dynamically generated using ASP.NET) is output as text/xml; charset=utf-8

Interestingly enough, I found one feed that used application/rss+xml (<a href="http://www.intertwingly.net/blog/index.rss2" target="_blank" class="broken_link">Sam&#8217;s RSS 2.0 feed</a>) which I think is probably not the best choice since that content type was never officially registered, and it was the only feed I hit that IE didn&#8217;t understand (and therefore tried to just download).

I think I will go with &#8220;application/xml&#8221; which has the best features in my opinion.

  * It clearly indicates that this is not just text, so it should avoid issues with proxies messing with the characters,
  * it leaves the character set data in the xml declaration, avoiding a possible conflict if I specify one in the http headers that is different than what the feed specifies,
  * it displays correctly in IE and Firefox, and
  * it is consistent with what we are doing today with the MSDN main feed.

Now, what about those in-page links we have? <link rel=&#8221;alternate&#8221; type=&#8221;application/rss+xml&#8221; title=&#8221;blah&#8221; href=&#8221;rss.xml&#8221; /> &#8230;. perhaps they should be just &#8220;application/xml&#8221; as well?