Very cool article from <a href="http://www.codeproject.com" target="_blank">Code Project</a>; this is something I have wanted for awhile&#8230;.. from the moment we started outputing <a href="http://msdn.microsoft.com/aboutmsdn/rss" target="_blank">RSS from MSDN</a>, it seemed to me that you&#8217;d want to view them **inside** of VS&#8230; I&#8217;m downloading this right to try it out, but the article is well written and covers a lot of good topics (like Isolated Storage, async delegates and more), so I&#8217;m pretty confident the add-in will work well 🙂 

> <a href="http://www.codeproject.com/dotnet/BlogReaderArticle.asp" target="_blank" class="broken_link">Blog Reader Add-In for Visual Studio .NET</a>  
> By jconwell 
> 
> A blog reader, integrated into Visual Studio. Shows a list of blogs, blog entries, and which entries you haven’t read yet 

**Update:** I have it up and running on my machine now, it appears to be working well&#8230;. I&#8217;ve only tried it with the MSDN feeds so far, but so far so good. Just one hint, there is a .msi file in the Release directory under the Setup project&#8230; that is what you want to run if you want to just set this up (instead of rebuilding the setup file yourself using the solution provided).