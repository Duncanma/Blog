---
date: 2004-10-06T06:56:00+00:00
title: New MSDN RSS feeds are live...
type: posts
tags:
 - RSS
 - Coding
 - Microsoft
---
In [an earlier post](http://blogs.duncanmackenzie.net/duncanma/archive/2004/09/26/708.aspx), I mentioned that I had written a new system for producing [MSDN's RSS feeds](http://msdn.microsoft.com/aboutmsdn/rss), and those feeds are now live at the same URLs as the previous versions. You might get some duplicates in your aggregators, (since these are new feeds but with some overlap of items from the old feeds) but that should be temporary. Anyway, check them out ([here is the one for VB](http://msdn.microsoft.com/vbasic/rss.xml)) and let me know what you think.

_Some people have asked why I haven't gone into a lot of detail about **how** we generate these feeds. Basically, I haven't talked about it because it isn't all that difficult to write out a RSS file... the trick is usually how you obtain the data that you wish to write out and that part of the system isn't interesting (IMHO) to the general public as it is just SQL queries against our database full of content... the process that generates these feeds runs daily, and then static xml is posted to the site... all in all, not that exciting 🙂_
