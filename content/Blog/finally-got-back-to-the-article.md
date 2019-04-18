---
date: 2003-08-12T11:20:00+00:00
title: Finally got back to the article
type: posts
---
Thanks to everyone who emailed me and offered to help... but the problem was time, not technical... despite my joke about working on the cool stuff first, a ton of high-priority stuff has made me weeks late on my article!

Although I did hit some snags with odd unsorted feeds (MSDN's!), I managed to get everything working the way I wanted. I'm still a little unhappy with the system because I don't strip out potentially bad tags from any HTML content included in the RSS (as per [http://diveintomark.org/archives/2003/06/12/how\_to\_consume\_rss\_safely](http://diveintomark.org/archives/2003/06/12/how_to_consume_rss_safely)) , but it has certainly progressed far enough in code for me to finish up the article.

* * *

I wrote all of the code you've seen so far, and tested the various bits of XSL code, using a small sample application (see Figure 2). I ended up throwing that sample away as I continued on, but for now it is a good way to test my code against various RSS feeds.



<img src="http://www.duncanmackenzie.net/rssviewer.jpg" border="0" />

**Figure 2**

### Making Sure Everything is in Order

The first problem I ran into was that some feeds were not displaying in descending date order (most recent item first), which was fairly confusing. It turns out that, while most RSS feeds are already sorted in descending order by date, the MSDN feeds are a notable exception. For consistency I decided to add sorting code to the XSL through the xsl:sort element. My failure to get sorting to work directly against the pubDate value resulted in one of the more interesting aspects of that transform, as I needed to include a user-defined function (written using Visual Basic .NET), to convert the string-based date value into a new format that can be sorted.

```xsl
<msxsl:script language="vb" implements-prefix="utility">
function GetDate(pubDate As String)
  Try
      Dim myDate as Date = CDate(pubDate)
      Return myDate.ToString("yyyyMMddHHmmss")
  Catch

  End Try
end function
</msxsl:script>
```

The function itself is pretty straightforward, I just try to convert from string to date and then I output back to a string in a format that will allow for easy sorting. Using the xsl:sort function, I use the results of that function to perform the actual sort.

```xsl
<xsl:template match="/rss/channel">
    <xsl:for-each select="./item">
        <xsl:sort order="descending"
         select="utility:GetDate(./pubDate)" />
        <xsl:apply-templates select="." />
    </xsl:for-each>
</xsl:template>
```

The Try…Catch block around the GetDate function doesn't handle the error, but it allows the XSL to still function, even if the code is unable to parse the date string.

### Variety is the Spice of Life, unless it is in your RSS

The specification for RSS is flexible in many ways, including the proper handling of HTML content and how dates should be specified, which is to say that it allows for multiple methods. This flexibility is great when you are writing a system to output RSS, but it makes life a little difficult when you are trying to read it in. This flexibility caused me a problem with the date first, most feeds I was testing were using a "pubDate" element, but a few were using a "dc:date" element instead. I dealt with the issue by adding an xsl:choose function to use and display whichever date attribute was available.

```xsl
<xsl:choose>
    <xsl:when test='pubDate'>
        <p>Posted on:
            <xsl:value-of select="pubDate" /></p>
    </xsl:when>
    <xsl:when test='dc:date'>
        <p>Posted on:
            <xsl:value-of select="dc:date" /></p>
    </xsl:when>
    <xsl:otherwise>
    <p>Couldn't Retrieve Date</p>
    </xsl:otherwise>
</xsl:choose>
```

I had to use a similar method for handling any HTML content inside of the downloaded RSS feed, using an xsl:choose to determine between the three main methods of handling HTML content inside an RSS feed. The three more common methods are:

* Flag the HTML block with a content:encoding tag and HTML encode all of the tags,
* Place the HTML into an xhtml:body element, and leave the HTML tags intact, or
* Just leave it unmarked and inline just like plain text.

To make sure I could handle each of these three cases, I used another xsl:choose function (in the XSLT) to pick the right implementation for each specific format, and to just assume un-encoded content if I cannot determine the exact method being employed.

```xsl
<xsl:choose>
    <xsl:when test='xhtml:body'>
        <xsl:copy-of select='xhtml:body'/>
    </xsl:when>
    <xsl:when test='content:encoded'>
        <xsl:value-of
            disable-output-escaping='yes'
            select='content:encoded'/>
    </xsl:when>
    <xsl:otherwise>
        <xsl:value-of
            disable-output-escaping='yes'
            select='description'/>
    </xsl:otherwise>
</xsl:choose>
```

The end result should work for any feed that is using one of these three methods for exposing their content as a RSS feed (xhtml:body, description, or content:encoding), producing a final display similar to what is shown in Figure 3.

<img src="http://www.duncanmackenzie.net/Figure3.png" border="0" />

**Figure 3**

Now, it is very important to note that whenever you are going to display HTML content that someone else has provided (such as the content inside of an RSS feed), you need to be aware of the possible risks, especially when you are using my method of replacing the contents of the "about:blank" page. When HTML is displayed in the embedded browser, it is running within the local zone, which will likely have much lower security restrictions than the Internet zone. Although there are ways in which you can clean up HTML before displaying it, it takes quite a bit of work to guarantee that it is completely safe. Check out [this useful blog post](http://diveintomark.org/archives/2003/06/12/how_to_consume_rss_safely) that describes some of the issues caused by HTML in RSS, and gives some suggestions on avoiding them.

More to come soon... I've updated the XSLT at

<http://www.duncanmackenzie.net/rss2html2.zip> for your viewing pleasure...
