---
date: 2004-02-10T21:07:00+00:00
title: HTML Agility Pack
type: posts
---
I've seen this around before, and this post was from June 2003, but it is worth mentioning again!

> [<b>.NET Html Agility Pack: How to use malformed HTML just like it was well-formed XML... </b>](http://blogs.msdn.com/smourier/archive/2003/06/04/8265.aspx)

> Here is an agile HTML parser that builds a read/write DOM and supports plain XPATH or XSLT. It is an assembly that allows you to parse "out of the web" HTML files. The parser is very tolerant with "real world" malformed HTML. The object model is very similar to what [is provided by] System.Xml, but for HTML documents (or streams).
>
> **Sample applications:**
>
>   * Page fixing or generation. You can fix a page the way you want, modify the DOM, add nodes, copy nodes, you name it.
>   * Web scanners. You can easily get to img/src or a/hrefs with a bunch XPATH queries.
>   * Web scrapers. You can easily scrap any existing web page into an RSS feed for example, with just an XSLT file serving as the binding. An example of this is provided.
> There is no dependency on anything else than .Net's XPATH implementation. There is no dependency on Internet Explorer's dll or tidy or anything like that. There is also no adherence to XHTML or XML, although you can actually produce XML using the tool.
