---
date: 2006-09-27T17:48:00+00:00
title: Categories vs. Tags in Blogs and Blog Editors
type: posts
---


I've been pondering categories vs. tags in blogs, in my sites (such as <http://on10.net)> we've completely done away with the concept of categories as distinct entities from tags, which works fine on the site but is causing me a bit of a headache when I look at blog editing and blog editing APIs.

I've enabled the [metaweblogapi](http://www.xmlrpc.com/metaWeblogApi) on my sites so that standard blog editing tools like performancing, windows live writer, etc... can be used by our staff to post entries, and I've used the 'categories' area of that API to represent tags.

This has caused me two issues:

First, there are many more tags on most sites than there would be categories, so editing tools don't always provide the most useful UI for selecting tags.

Second, categories are fairly static, but tags are continually being added... and most blogging software doesn't provide a mechanism for adding to your list of categories.

I'm looking for thoughts, ideas, arguments... anything to help me figure out what the best way is to handle this move from categories to tags while still supporting the standard API mechanisms.
