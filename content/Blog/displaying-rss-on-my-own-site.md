---
date: 2003-09-28T13:18:00+00:00
title: Displaying RSS on my own site
type: posts
---
Kent recently wrote an ASP.NET control (ascx) to display the contents of an RSS feed onto a web page (for use on MSDN) so I decided to slap it on my own web site to display blogs entries at <http://www.duncanmackenzie.net/blog/default.aspx>, and I think it looks pretty good!

 <dc:rssview id="rssDuncan" runat="server" rssurl="http://weblogs.asp.net/duncanma/rss.aspx" count="4" enableviewstate="False"></dc:rssview>
