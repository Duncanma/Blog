The RSS generator for MSDN, creator of [this feed](http://msdn.microsoft.com/rss.xml" target="_blank), and many more ... has a small problem. Way upstream, when various people inside the company enter information about an upcoming headline, they have the ability to specify a URL to a download. The intent was for this to be a URL to an actual downloadable file, so when I generate an RSS item from that headline entry, I take that URL and turn it into an enclosure entry in the RSS file.

<pre>
  &lt;item&gt;
        &lt;title&gt;Read about Atlas - Ajax for ASP.NET&lt;/title&gt;
        &lt;description&gt;ASP.NET "Atlas" is a package of
  new Web development technologies that integrates an extensive set of
  client script libraries with the rich, server-based development
  platform of ASP.NET 2.0. &lt;/description&gt;
        &lt;link&gt;http://msdn.microsoft.com/asp.net/future/&lt;/link&gt;
        &lt;dc:creator&gt;Microsoft Corporation&lt;/dc:creator&gt;
        &lt;category domain="msdndomain:ContentType"&gt;Link&lt;/category&gt;
        &lt;category domain="msdndomain:Audience"&gt;Developers&lt;/category&gt;
        &lt;category domain="msdndomain:Hardware"&gt;CPU&lt;/category&gt;
        &lt;category domain="msdndomain:Operating Systems"&gt;Windows&lt;/category&gt;
        &lt;category domain="msdndomain:Subject"&gt;Web development&lt;/category&gt;
        &lt;msdn:headlineImage /&gt;
        &lt;msdn:headlineIcon&gt;http://msdn.microsoft.com/msdn-online/shared/graphics/icons/offsite.gif&lt;/msdn:headlineIcon&gt;
        &lt;msdn:contentType&gt;Link&lt;/msdn:contentType&gt;
        &lt;msdn:simpleDate&gt;Sep 19&lt;/msdn:simpleDate&gt;
        <span style="background-color: #FFFF00">&lt;enclosure url="
  http://go.microsoft.com/fwlink/?LinkId=52384" length="17437" type="text/html; charset=utf-8" /&gt;</span>
        &lt;guid isPermaLink="false"&gt;Titan_2519&lt;/guid&gt;
        &lt;pubDate&gt;Mon, 19 Sep 2005 18:20:40 GMT&lt;/pubDate&gt;
      &lt;/item&gt;

</pre>

This generally works fine, I make a HEAD request with that URL which gives me back the MIME type and the Content Length, both of which are needed for the enclosure element in the RSS item. Sometimes though, people put in a URL to the download's landing page, not the download itself. There are good reasons for this, as the download page often contains useful information and/or multiple localized versions of the download, but it was not what I expected. In this case, I put the enclosure in with the MIME type I get back from that URL, which ends up being &#8216;text/html' and with a byte size that reflects the size of the landing page.

This wasn't really what I wanted to happen, so I need to figure out a solution at my end, but what I noticed today and what has me a little puzzled is that at least two different validators ([here](http://rss.scripting.com/?url=http%3A%2F%2Fmsdn.microsoft.com%2Frss.xml" target="_blank) and [here](http://feedvalidator.org/check.cgi?url=http%3A%2F%2Fmsdn.microsoft.com%2Frss.xml" target="_blank)) report these types of entries as validation errors. The error they specify is that text/html is not a valid MIME type.... but, according to [the RFC(s)](http://www.ietf.org/rfc/rfc2854.txt" target="_blank) (see 4.1.2 of [this RFC](http://www.rfc-editor.org/rfc/rfc2046.txt" target="_blank)) and other sources, it most certainly **is** a valid type. So, is there a hidden rule in RSS that enclosures have to fall within some special subset of MIME types, or are both of these validators broken? Sure, in this case it wasn't really what I wanted, but what if I really did have a text/html document for you to download?