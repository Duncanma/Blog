---
date: 2004-10-18T07:26:00+00:00
title: Supporting LiveBookmarks in FireFox 1.0
type: posts
---
When we originally added RSS feeds to the various developer centers on MSDN, we included a line (shown below) in the HTML of those pages that let browsers and other software know that there was a RSS feed available that was related to the content of the page.

	<font face="'Courier New',Courier,monospace"><link rel="alternate" type="application/rss+xml" title="Visual Basic Developer Center" href="rss.xml" />

Later, quite awhile after that initial launch, someone (ok, it was me) decided to create a set of page templates for all of the pages in use in the Developer Centers, and when they did that work, they inadvertently removed this line of HTML from the Developer Center home pages. No one seemed to notice. Auto-discovery in RSS Bandit and a few other programs should have ceased to work against these pages, but this was not a widely used feature. The recent release of FireFox 1.0 has made this omission slightly more visible, as FireFox now includes a feature called ["Live Bookmarks"](http://www.mozilla.org/products/firefox/live-bookmarks.html), which uses this HTML tag (if it finds one in your page) to display items from your RSS feed right in the bookmarks menu.

![](http://www.duncanmackenzie.net/images/livebookmarks.png)

When someone emailed me recently to ask why our pages did not support the "Live Bookmarks" feature, I realized that I had accidently removed support for this feature months ago. I've added it back in now (as a start, just to the [Visual Basic developer center home page](http://msdn.microsoft.com/vbasic) but more will follow) and I hope that will be useful to anyone who is using FireFox as their browser.
