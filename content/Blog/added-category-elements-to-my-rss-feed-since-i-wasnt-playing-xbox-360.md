---
date: 2005-11-26T11:03:00+00:00
title: Added category elements to my RSS feed, since I wasn't playing Xbox 360
type: posts
tags:
 - Blogging
 - Web Development
 - RSS
 - CMS
---
About a year or so back I added `<category>` elements to the MSDN RSS feeds, which seemed like an obvious addition, but it wasn't until recently that I noticed that my own feeds (coming out of my .Text 0.95 based blogging engine) didn't have categories specified in them at all. Not in [the main feed](http://blogs.duncanmackenzie.net/MainFeed.aspx) or in the [per-blog feeds](http://blogs.duncanmackenzie.net/duncanma/rss.aspx)...

This seemed really odd to me, since much of the UI of the .Text posting page, editing page, and even the blog skins themselves is dedicated to the listing and selecting of categories. Obviously, categories are seen as important information about blog entries, so why not include them in the RSS feeds? Oh well, there is little point in wondering about these sorts of things, not when you have the source, so I added category elements to my main and individual feeds. I haven't added them to the per-category feeds yet, or to the ATOM feeds, but I'll get to those in the near future.

If you haven't looked at the .Text source yourself, you might be wondering why adding these elements to one feed wouldn't have added them to all of the feeds, because all RSS feeds are probably running through the same code path. While this is mostly true, they are running through the same ASP.NET handler and through the same feed generation code, the category-based feeds use a different stored procedure to retrieve their entries than the feeds that I have updated, and I had to make a change to the database query to return the list of categories along with each item. What I ended up doing, (and I'm not sure about the performance of this code but it is so highly cached that I'm not particularly worried about it for this use), was using a Function to retrieve the list of categories as a semi-colon delimited string given a PostID (note that if you host multiple blogs on your .Text instance that this function should take both a BlogID **and** a PostID... I'll have to update this for the multi-blog case).

```sql
 CREATE FUNCTION blog_GetCategoryTitles (@PostID int) RETURNS nvarchar(4000)
 BEGIN
 DECLARE @CategoryList nvarchar(4000)
 SELECT @CategoryList = COALESCE
(@CategoryList + ';', '') +
 blog_LinkCategories.Title
 FROM blog_Content
 LEFT OUTER JOIN blog_Links
 on blog_Links.PostID = blog_Content.ID
 LEFT OUTER JOIN blog_LinkCategories
 on blog_Links.CategoryID = blog_LinkCategories.CategoryID
 WHERE blog_Content.ID=@PostID AND
 blog_Content.BlogID = blog_Links.BlogID AND
 blog_LinkCategories.Title != ''
 RETURN @CategoryList
 END
```

_thanks to [Garth's 2001 article from SQLTeam.com for showing me COALESCE being used for this purpose...](http://www.sqlteam.com/item.asp?ItemID=2368)_

and then modifying the queries that retrieved entries to also return blog_GetCategoryTitles(<PostID>), and then modify the RSS writer to output the categories if any were returned.

Interesting note, I figured the omission of category data from the feeds in .Text was a simple error and that it would have been added along the way to Community Server, but I noticed that the feeds on [blogs.msdn.com](http://blogs.msdn.com/alexbarn/rss.aspx) don't appear to have category data either... is category information not considered useful in feeds?
