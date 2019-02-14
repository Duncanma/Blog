The RSS generator for MSDN, creator of <a href="http://msdn.microsoft.com/rss.xml" target="_blank" class="broken_link">this feed</a>, and many more &#8230; has a small problem. Way upstream, when various people inside the company enter information about an upcoming headline, they have the ability to specify a URL to a download. The intent was for this to be a URL to an actual downloadable file, so when I generate an RSS item from that headline entry, I take that URL and turn it into an enclosure entry in the RSS file.

<pre><p>
  &lt;item&gt;<br />
  <br />      &lt;title&gt;Read about Atlas - Ajax for ASP.NET&lt;/title&gt;<br />
  <br />      &lt;description&gt;ASP.NET "Atlas" is a package of 
  <br />new Web development technologies that integrates an extensive set of 
  <br />client script libraries with the rich, server-based development 
  <br />platform of ASP.NET 2.0. &lt;/description&gt;<br />
  <br />      &lt;link&gt;http://msdn.microsoft.com/asp.net/future/&lt;/link&gt;<br />
  <br />      &lt;dc:creator&gt;Microsoft Corporation&lt;/dc:creator&gt;<br />
  <br />      &lt;category domain="msdndomain:ContentType"&gt;Link&lt;/category&gt;<br />
  <br />      &lt;category domain="msdndomain:Audience"&gt;Developers&lt;/category&gt;<br />
  <br />      &lt;category domain="msdndomain:Hardware"&gt;CPU&lt;/category&gt;<br />
  <br />      &lt;category domain="msdndomain:Operating Systems"&gt;Windows&lt;/category&gt;<br />
  <br />      &lt;category domain="msdndomain:Subject"&gt;Web development&lt;/category&gt;<br />
  <br />      &lt;msdn:headlineImage /&gt;<br />
  <br />      &lt;msdn:headlineIcon&gt;http://msdn.microsoft.com/msdn-<br />online/shared/graphics/icons/offsite.gif&lt;/msdn:headlineIcon&gt;<br />
  <br />      &lt;msdn:contentType&gt;Link&lt;/msdn:contentType&gt;<br />
  <br />      &lt;msdn:simpleDate&gt;Sep 19&lt;/msdn:simpleDate&gt;<br />
  <br />      <span style="background-color: #FFFF00">&lt;enclosure url="<br />
  http://go.microsoft.com/fwlink/?LinkId=52384" <br />length="17437" <br />type="text/html; charset=utf-8" /&gt;</span><br />
  <br />      &lt;guid isPermaLink="false"&gt;Titan_2519&lt;/guid&gt;<br />
  <br />      &lt;pubDate&gt;Mon, 19 Sep 2005 18:20:40 GMT&lt;/pubDate&gt;<br />
  <br />    &lt;/item&gt;<br />
  
</p></pre>

This generally works fine, I make a HEAD request with that URL which gives me back the MIME type and the Content Length, both of which are needed for the enclosure element in the RSS item. Sometimes though, people put in a URL to the download&#8217;s landing page, not the download itself. There are good reasons for this, as the download page often contains useful information and/or multiple localized versions of the download, but it was not what I expected. In this case, I put the enclosure in with the MIME type I get back from that URL, which ends up being &#8216;text/html&#8217; and with a byte size that reflects the size of the landing page.

This wasn&#8217;t really what I wanted to happen, so I need to figure out a solution at my end, but what I noticed today and what has me a little puzzled is that at least two different validators (<a href="http://rss.scripting.com/?url=http%3A%2F%2Fmsdn.microsoft.com%2Frss.xml" target="_blank">here</a> and <a href="http://feedvalidator.org/check.cgi?url=http%3A%2F%2Fmsdn.microsoft.com%2Frss.xml" target="_blank" class="broken_link">here</a>) report these types of entries as validation errors. The error they specify is that text/html is not a valid MIME type&#8230;. but, according to <a href="http://www.ietf.org/rfc/rfc2854.txt" target="_blank">the RFC(s)</a> (see 4.1.2 of <a href="http://www.rfc-editor.org/rfc/rfc2046.txt" target="_blank">this RFC</a>) and other sources, it most certainly **is** a valid type. So, is there a hidden rule in RSS that enclosures have to fall within some special subset of MIME types, or are both of these validators broken? Sure, in this case it wasn&#8217;t really what I wanted, but what if I really did have a text/html document for you to download?