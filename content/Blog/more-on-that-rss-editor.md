---
date: 2005-12-08T07:28:00+00:00
title: More on that RSS editor...
type: posts
---
In the end, MSDN didn't end up needing [the RSS editor I wrote](http://blogs.duncanmackenzie.net/duncanma/archive/2005/11/01/3184.aspx), so I've stripped out the features and content specific to their needs and started turning it into a more generic RSS creation tool. If you'd like to see it, as it is, you can run it from [a ClickOnce install point here on my site](http://www.duncanmackenzie.net/FeedWriter/default.aspx). There are more features coming, and I'm revamping the style and behavior of the category system.... but you can try it out against copies of your own feeds or click File | New Feed to make new ones. Check out the Validate option on the menu, it will send whatever feed you have open to a web service enabled version of the [feedvalidator.org](http://www.feedvalidator.org) system (coded up by [Kent Sharkey](http://www.acmebinary.com/blogs/kent/default.aspx)), allowing you to check the validatity of your RSS **without** having to publish the file anywhere.

Note: If you have Beta 2 of the .NET Framework installed, the Click Once application will not install or run correctly. In this case, you need to run the VS remove tool (available from [here](http://msdn.microsoft.com/vstudio/support/uninstall/default.aspx))
