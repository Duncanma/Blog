---
date: 2005-09-28T04:39:00+00:00
title: After some discussions with Sam Ruby and others on the FeedValidator mailing list, the MSDN RSS feed validates as is...
type: posts
---
In [an earlier post](http://blogs.duncanmackenzie.net/duncanma/archive/2005/09/26/2940.aspx), I discussed the fact that the MSDN feeds were failing to validate due to a MIME type that included parameters (charset in this case, like 'text/html ;charset=utf-8'), but I also posted a query about this issue into [the listserv for FeedValidator.org](http://sourceforge.net/mailarchive/forum.php?thread_id=8314757&forum_id=37467). Sam mentioned it [on his blog](http://www.intertwingly.net/blog/2005/09/27/Enclosure-type-parameters), and then went ahead and updated the validator to recognize a MIME type with parameter as valid.

In the meantime, I updated the MSDN generator to strip out the parameters :), but I still think they are technically valid so I'm glad the feed [validates](http://www.feedvalidator.org/check.cgi?url=http%3A%2F%2Fmsdn.microsoft.com%2Frss.xml) as it is today (with params) and as it will exist in the near future with the MIME types stripped down to just type/subtype.
