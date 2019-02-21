---
date: 2004-11-02T08:16:00+00:00
title: HTML to XHTML
type: posts
---
I have been pondering the best approach for ensuring _user supplied_ HTML is XHTML... and while it actually isn't hard to validate whether or not a given block of HTML is valid XHTML, what I really wanted was something that would fix up some of the more basic errors. Well, MSDN Magazine to the rescue...

> **[Web Q&A: ADO.NET Joins, HTML to XHTML, ASP.NET ViewState, and More](http://msdn.microsoft.com/msdnmag/issues/04/11/WebQA/default.aspx)**

> ADO.NET Joins, HTML to XHTML, ASP.NET ViewState, and More

> **Author:** Edited by Nancy Michell

That article showed me a variety of components that would really help in this situation, including [one from the InfoPath SDK](http://msdn.microsoft.com/library/default.asp?url=/library/en-us/ipsdk/html/ipsdkUsingTheHTMLToXHTMLTool.asp) and [a COM component](http://perso.wanadoo.fr/ablavier/TidyCOM/) that wraps [Tidy](http://www.w3.org/People/Raggett/tidy/)... very cool stuff.
