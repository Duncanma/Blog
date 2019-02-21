---
date: 2006-07-27T23:26:00+00:00
title: An interesting web problem, duplicate //s in a url
type: posts
---
Ok, so this is interesting to me, maybe not to everyone. Go to [this page](http://on10.net/blogs/theshow//4181) on on10.net, and notice the lack of CSS...  We are using ASP.NET themes and the CSS for the theme gets inserted as a relative reference (../../../themes etc.) ... well IE does the calculation based off of the URL and doesn't find the CSS because the extra slash confuses it.

I went into our code and added a check, if the absolute path of our request contained a double slash, then replace it with a single and redirect. Doesn't work, the absolute path never seems to contain a double slash, even when the URL I asked for does. I'm guessing IIS or ASP.NET is **fixing** things up for me before my http module gets involved... nice of it, but very annoying in this case.
