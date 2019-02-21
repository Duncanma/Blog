---
date: 2004-05-01T23:16:00+00:00
title: RSS Aggregator add-in for Visual Studio .NET
type: posts
---
Very cool article from [Code Project](http://www.codeproject.com); this is something I have wanted for awhile..... from the moment we started outputing [RSS from MSDN](http://msdn.microsoft.com/aboutmsdn/rss), it seemed to me that you'd want to view them **inside** of VS... I'm downloading this right to try it out, but the article is well written and covers a lot of good topics (like Isolated Storage, async delegates and more), so I'm pretty confident the add-in will work well 🙂

> [Blog Reader Add-In for Visual Studio .NET](http://www.codeproject.com/dotnet/BlogReaderArticle.asp)
> By jconwell
>
> A blog reader, integrated into Visual Studio. Shows a list of blogs, blog entries, and which entries you haven’t read yet

**Update:** I have it up and running on my machine now, it appears to be working well.... I've only tried it with the MSDN feeds so far, but so far so good. Just one hint, there is a .msi file in the Release directory under the Setup project... that is what you want to run if you want to just set this up (instead of rebuilding the setup file yourself using the solution provided).
