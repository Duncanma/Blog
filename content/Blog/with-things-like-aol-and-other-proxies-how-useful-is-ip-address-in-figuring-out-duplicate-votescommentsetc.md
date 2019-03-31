---
date: 2004-07-28T03:38:00+00:00
title: With things like AOL and other proxies... how useful is IP Address in figuring out duplicate votes/comments/etc... ?
type: posts
---
I'm playing around with my voting control and I was thinking of (in addition to a cookie based check) querying to see how recently this IP address had tried voting and if it was within 'x' seconds, rejecting the vote...

Something more extreme, like rejecting any second vote from the same IP seems wrong, since multiple people could be coming in through the same IP.. in fact, you have to assume that is likely over time...

What do you folks think? Is a time-limit per IP address reasonable, or will that produce 'odd' behaviour for corporate and large ISP users?
