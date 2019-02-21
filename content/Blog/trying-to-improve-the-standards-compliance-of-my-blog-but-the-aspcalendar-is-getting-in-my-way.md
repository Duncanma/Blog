---
date: 2005-12-05T07:58:00+00:00
title: Trying to improve the standards compliance of my blog, but the asp:Calendar is getting in my way!
type: posts
---
I've been trying to fix some XHTML issues on my blog, but two pieces of technology are thwarting my plans.... first, there is the text editor in .Text (FreeTextBox) which appears to be making the first anchor or image tag in the post uppercase, even though I have its XHTML support enabled... (so my first link is <A href=....>, instead of <a href=...>) and the second is the ASP.NET Calendar (1.1 framework version).

  * [Page with calendar](http://validator.w3.org/check?uri=http%3A%2F%2Fblogs.duncanmackenzie.net%2Fduncanma%2Fdefault.aspx&charset=%28detect+automatically%29&doctype=Inline) produces 71 errors
  * [Page without calendar](http://validator.w3.org/check?uri=http%3A%2F%2Fblogs.duncanmackenzie.net%2Fduncanma%2Fdefault.aspx%3FCalendar%3DNo&charset=%28detect+automatically%29&doctype=Inline) produces 13, all due to the first tag as uppercase problem I think

There are enough problems for me to solve around producing valid pages with dynamic content, now I have to either find a replacement calendar or move the whole site up to the 2.0 framework 🙂
