I&#8217;ve seen this around before, and this post was from June 2003, but it is worth mentioning again!

> <a href="http://blogs.msdn.com/smourier/archive/2003/06/04/8265.aspx" target="_blank" class="broken_link"><b>.NET Html Agility Pack: How to use malformed HTML just like it was well-formed XML&#8230; </b></a>
  
> Here is an agile HTML parser that builds a read/write DOM and supports plain XPATH or XSLT. It is an assembly that allows you to parse &#8220;out of the web&#8221; HTML files. The parser is very tolerant with &#8220;real world&#8221; malformed HTML. The object model is very similar to what [is provided by] System.Xml, but for HTML documents (or streams).
> 
> **Sample applications:**
> 
>   * Page fixing or generation. You can fix a page the way you want, modify the DOM, add nodes, copy nodes, you name it.
>   * Web scanners. You can easily get to img/src or a/hrefs with a bunch XPATH queries.
>   * Web scrapers. You can easily scrap any existing web page into an RSS feed for example, with just an XSLT file serving as the binding. An example of this is provided.
> There is no dependency on anything else than .Net&#8217;s XPATH implementation. There is no dependency on Internet Explorer&#8217;s dll or tidy or anything like that. There is also no adherence to XHTML or XML, although you can actually produce XML using the tool.