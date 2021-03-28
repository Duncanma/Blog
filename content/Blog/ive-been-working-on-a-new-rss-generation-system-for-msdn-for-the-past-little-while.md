---
date: 2004-09-27T06:19:00+00:00
title: I've been working on a new RSS generation system for MSDN for the past little while
type: posts
tags:
 - RSS
 - Coding
 - Microsoft
---
... and it is almost ready to ship....

The new system will result in a few changes to [the MSDN feeds](http://msdn.microsoft.com/aboutmsdn/rss), the most notable of which is that our feeds will no longer reflect a certain time span (they currently contain all of the appropiately attributed items from the past 30 days), but will instead contain a certain # of items. They also have a bit more data in them, including the author of the article (in the dc:creator element) and a collection of category elements containing all of the attribution that we have applied to that article in our back end system.

If you check out a sample feed, [available here](http://www.duncanmackenzie.net/vbrss.xml), you'll see the changes described above along with one other new 'feature'. We will have a stylesheet added to the top of the feeds, which is primarily targetted at folks who do not already use RSS feeds. When people in the past have seen our RSS buttons on the various MSDN sites, clicking on that button showed them the raw XML... with no real context or explanation of what they were being shown. This new format, using the style sheet, should help improve the experience for those customers.

**Please let me know what you think about these changes (feel free to post your thoughts in the feedback section of this post), they aren't released yet so this is the time when I need to hear any and all feedback you have!!**

<font color="red"><b>Update:</b> Luc Cluitmans noticed that the feed was not displaying correctly in Firefox... but I believe I've fixed that problem now, please let me know if you still notice problems with the display. I get only text in Opera, but I think that is due to the fact that XSLT is not supported by Opera... let me know if I'm wrong on that one...
