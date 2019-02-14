I have been pondering the best approach for ensuring _user supplied_ HTML is XHTML&#8230; and while it actually isn&#8217;t hard to validate whether or not a given block of HTML is valid XHTML, what I really wanted was something that would fix up some of the more basic errors. Well, MSDN Magazine to the rescue&#8230; 

> **<a href="http://msdn.microsoft.com/msdnmag/issues/04/11/WebQA/default.aspx" target="_blank" class="broken_link">Web Q&A: ADO.NET Joins, HTML to XHTML, ASP.NET ViewState, and More</a>**
  
> ADO.NET Joins, HTML to XHTML, ASP.NET ViewState, and More
  
> **Author:** Edited by Nancy Michell

That article showed me a variety of components that would really help in this situation, including <a href="http://msdn.microsoft.com/library/default.asp?url=/library/en-us/ipsdk/html/ipsdkUsingTheHTMLToXHTMLTool.asp" target="_blank">one from the InfoPath SDK</a> and <a href="http://perso.wanadoo.fr/ablavier/TidyCOM/" target="_blank">a COM component</a> that wraps <a href="http://www.w3.org/People/Raggett/tidy/" target="_blank">Tidy</a>&#8230; very cool stuff.