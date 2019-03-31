---
date: 2005-01-20T09:28:00+00:00
title: Added support for the rel="nofollow" attribute to my .Text installation...
type: posts
---
[Google and various blog software vendors recently announced a method to deter comment spam](http://www.google.com/googleblog/2005/01/preventing-comment-spam.html) by reducing its benefit to the spammer... it sounds like a pretty good idea, so I updated my installation of .Text to use this new attribute in the comment section by adding just a single line within comments.cs: namelink.Attributes["rel"] = "nofollow"; ... now, let's just hope it works 😉

I think I might enhance this a bit later, adding the idea of approved comments that don't get this attribute for their links, since I see no reason why a non-spammer's comment shouldn't give them google-juice. That feature is likely a ways into the future, but you never know.
