---
date: 2005-11-02T07:56:00+00:00
title: RSS feed authoring for those without blog software or an enjoyment of typing angle brackets
type: posts
tags:
 - RSS
 - Coding
 - Microsoft
---
Blogs and blogging software seem to be everywhere these days, and RSS has been a top buzzword for quite some time, everyone and their dog wants to take advantage of this new trend and technology. The problem is, it isn't a simple process to create and maintain a valid RSS file. If you aren't willing to run a complete blogging system or if you aren't capable of hand-editing XML, then you don't have a lot of options. For most of the folks that will read this blog entry, you probably don't have this problem, producing RSS 2.0 wouldn't be much of an issue for a developer, but there are times when we want less technical folks to be able to author their own feeds without any assistance. At MSDN we started thinking about this very problem ourselves recently when we decided that, in addition to [all the feeds that come out of our content systems](https://msdn.microsoft.com/aboutmsdn/rss), there was a need to create some small feeds that didn't necessarily fit into our larger content systems. Handing off the task of feed creation to notepad or Front Page wasn't an appealing thought and that path would probably result in a lot of xml editing errors and invalid feeds.

This problem happened to line up with a sample I had been thinking of though, so I wrote a quick app using VC# Express 2005 to try and help out; a Feed Writer that allows you to create new RSS 2.0 feeds, edit existing ones, and even import entries from one feed to another. I stuck to a tried and true UI structure, tree along the left side then entry fields on the right:

![Screenshot of the FeedWriter app using a tree view and form controls](/images/rssapp.png)

This app has been developed **without** the general user in mind, MSDN/TechNet were the targets and because of that there are some fields in this UI that are only relevant to the needs of those groups. For example, the list of attributes you can see on the lower-right is specific to the needs of MSDN and TechNet, who need to markup the feed entries with the appropriate choices. The "Type" and "HeadlineImage" fields are also specific to MSDN feeds, I'm planning to adapt it to work with 'standard' RSS 2.0 items and the category element to make it more general purpose, but for now I thought I'd show you the version I already have running.

In a rather backwards fashion, I'm going to finish up this as a sample and write the article, now that I've finished the actual practical version of the same system... but it will all work out in the end.
