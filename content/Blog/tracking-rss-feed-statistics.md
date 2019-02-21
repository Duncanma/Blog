---
date: 2007-09-05T09:58:00+00:00
title: Tracking RSS Feed Statistics
type: posts
---
A few of my friends and co-workers have jumped on the FeedBurner bandwagon, and I've been pretty impressed with [the stats they've been gathering](http://duncanmackenzie.net/blog/cool-gadget-using-sparklines-to-show-your-rss-stats-from-feedburner/). I'm not willing to send my readers off to someone else's service though (even though [there are some reasonably safe ways to do that](http://www.burningdoor.com/eric/archives/001284.html)), so I started to think about how best to gather similar info myself. One idea would be to ship the IIS logs from my site back to my PC on a regular basis and run them through a LogParser script that would figure out all the stats for me... but that seems like a rather manual (or difficult to automate) and data transfer intensive method.

Instead, what I decided to do was to log every feed requests into a table on my SQL Server (actual SQL updates occur at regular intervals, not on every feed request). I log the feed URL being requested, the user agent of the requester, the IP Address of the requester, [the number of subscribers represented by the user agent string (Google's feed reader, amongst others, indicates the # of subscribers in the user agent string)](http://factory-h.com/articles/View.aspx?articleId=27) and the date/time they made the request.

[<img style="border-top-width: 0px; border-left-width: 0px; border-bottom-width: 0px; border-right-width: 0px" height="83" alt="Feed Reader Stats" src="http://www.duncanmackenzie.net/images/96de7c4d-f772-4143-91b3-ac049a5fdcb0.png" width="350" border="0" />](http://www.duncanmackenzie.net/images/4d36def4-6ccb-423d-b2d8-8a551b85fb4a.png" atomicselection="true" rel="lightbox[519]" title="Feed Reader Stats)

What happens next is currently a manual process, but I'm working on making it automatic...

For a given 24-hour period:

  * I sum up the number of requests by user agent/IP address combo
      * I filter down to user agent/IP address combos that made more than one request to the same feed during that time period... this is intended to distinguish between a manual user visit and an RSS aggregator. (of course, if an RSS aggregator is set to be very polite and only hit my site once per day, then this will cut those #s out of the list)
          * I sum up the average subscriber # for all useragent/IP address combos ... to avoid counting any single aggregator user more than once and also to accommodate any fluctuation in web aggregator subscriber counts throughout the day.</ul>
        This produces a final # that I believe is roughly accurate... 792 (for the past 24 hours) across all of my feeds (mostly either the main feed or [the Visual Basic feed](http://duncanmackenzie.net/blog/tags/visual+basic/)).

        _About half of the requests (244 total) filtered out because they made only one request in 24 hours do appear to be aggregators (looking at user agent strings) so that would add 120 or so to this #, but in the interest of not inflating the numbers, I think I'll stick with the calculations I've worked out so far. My other worry is that some of the web-based aggregators might be producing some duplicate values due to multiple source IP addresses, probably as a result of having aggregation code running on multiple nodes of a web farm._

        Has anyone else tried to implement their own FeedBurner-style stats? Any thoughts on my logic so far?
