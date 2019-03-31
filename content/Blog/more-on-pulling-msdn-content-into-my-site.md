---
date: 2005-03-21T21:48:00+00:00
title: More on "pulling" MSDN content into my site...
type: posts
---
In [my last post](http://blogs.duncanmackenzie.net/duncanma/archive/2005/03/19/1243.aspx), I was talking about pulling my articles from MSDN into the chrome of my site. This type of system could be created using a frameset, but frames are evil, so that isn't the approach I took. Instead, knowing a bit about the files on MSDN's web servers, I took advantage of a special xml file that exists for most of our articles. This file is created as part of our publishing process and exists so that we can pull articles into the chrome of our developer centers (like [this](http://msdn.microsoft.com/vbasic/using/columns/code4fun/default.aspx?pull=/library/en-us/dncodefun/html/code4fun12102003.asp)). It isn't a straight xhtml file, but it is almost identical to the html content of the article itself. Knowing that this file exists, my pull code just munges the original (MSDN) URL of the requested article to figure out the underlying xml file name, then loads up that xml. Once I have the xml content, I do a bit of work to the elements, to make all the relative links correctly point back to MSDN (for the images, related articles, links into the SDK, etc...) and then output html into a placeholder on my own page.

Given a URL like [this](http://msdn.microsoft.com/vbasic/using/columns/code4fun/default.aspx?pull=/library/en-us/dncodefun/html/code4fun12102003.asp), you can remove the pull syntax (used by our developer centers) to come up with the library URL of this article, [/library/en-us/dncodefun/html/code4fun12102003.asp](http://msdn.microsoft.com/library/en-us/dncodefun/html/code4fun12102003.asp), then apply a complex transform to produce the likely URL of the 'behind-the-scenes' XML file: [/library/en-us/dncodefun/html/code4fun12102003.xml](http://msdn.microsoft.com/library/en-us/dncodefun/html/code4fun12102003.xml).

It is possible that this XML file doesn't exist, so it is important to handle that possibility in your code. In my case, if I can't find the XML I just redirect to the original MSDN url. If the original URL doesn't appear to be well formed, I just give up completely and redirect to the home page of my own site.

_more details and code to follow...._

<div class="media">
  [Listening to: Last Chance – Jet – Get Born (01:52)]
</div>
