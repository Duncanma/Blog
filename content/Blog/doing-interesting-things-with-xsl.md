---
date: 2005-05-06T16:12:00+00:00
title: Doing interesting things with XSL
type: posts
tags:
 - RSS
 - Coding
 - Microsoft
---
I've been messing around with using XSL to display RSS on MSDN, as a simpler alternative to a custom ASP.NET control, and while it works perfectly in the core case (display all the items in a feed in a format), there are two additional requirements that were very easy to handle in a .NET class, but trickier (for me) in XSL.

  * Display the top _n_ items
  * Out of the full list, display _n_ randomly picked items

For the first, it was pretty easy... `<xsl:if test="position < 6">` could be used to only output the top 5 items, for example... For the second though, I was stumped for a bit... then I came up with an idea. I would write a script function that would pick _n_ items out of the total count, put those choices into an array, then use another function that tests the current position against that list of choices... sound good? Well, I'm still working on implementing this one... I have it working, but I'm not 100% sure of my solution.

If you are interested, you can see the code running [here](http://www.duncanmackenzie.net/xsltest.aspx), and pull down the xsl from [here](http://www.duncanmackenzie.net/rsspretty.xsl), and the backing rss file from [here](http://www.duncanmackenzie.net/msdnall.xml). [Code for the page](http://www.duncanmackenzie.net/xsltest.aspx.txt) ... [Code for the control it references](http://www.duncanmackenzie.net/xmlView.ascx.txt)...
