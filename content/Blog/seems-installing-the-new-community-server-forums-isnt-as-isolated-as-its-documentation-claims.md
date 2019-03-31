---
date: 2004-09-01T10:25:00+00:00
title: Seems installing the new Community Server Forums isn't as 'isolated' as its documentation claims...
type: posts
---
Ok, so any action you take against your database is your own responsibility... so this is my fault, but I'm still _miffed_.

I installed the new drop of the [Forums code from Rob Howard and co...](http://www.telligentsystems.com/Solutions/Forums/) and one of the various bits of information I picked up from the support forum and the docs was that I could happily install this onto an existing database because (quoting from the readme here)... "All the objects in the Forums product use the forums_ prefix so there shouldn't be any problem" . Whoops, guess they made a small mistake there, it should have been **most of the objects use the forums_ prefix**... their sql scripts happily drop any existing table named "Vote"... killing [the vote table for my online polls](http://msdn.microsoft.com/vbasic/using/columns/code4fun/default.aspx?pull=/library/en-us/dncodefun/html/code4fun08032004.asp)... including all of the votes that had occured since my last export... ouch.

Now, as I said earlier, this is all my fault... I looked at a bit of the sql script and decided to trust the docs... which is a bit silly when it involves my own data... but perhaps learning about my folly will remind you to read any installation sql scripts carefully, even when they've been documented as safe...
