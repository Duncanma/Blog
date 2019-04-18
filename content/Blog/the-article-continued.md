---
date: 2003-07-31T10:37:00+00:00
title: The article continued...
type: posts
tags:
 - RSS
 - Coding
---
Continuing along with the rest of the article, I start to layout the basic design of what I am about to build...

* * *

### Designing our New Feature

As a fairly low-priority item, the request wasn't described in any more detail than that one line, but I had a pretty good idea about what folks around MSDN were looking for so I started with a rough design.

The RSS Viewer window will support the viewing of an RSS feed and the dragging of links from the feed into the rest of the system. The user will be able to select from a 'master list' of feeds that are exposed to all of the system users or from their own personal list, and they will have the option to enter a feed URL directly (adding it to their personal list if desired).

I couldn't think of a really simple way to display a feed (with variable size content, XHTML support, etc.) inside a DataGrid control, not without a bit of custom code, so I decided to display the feed using the Web Browser control (hosting IE on my Windows Form) instead. Using an XSL transform, I can convert the RSS information into HTML and then pass that HTML into the browser control for display.

**Note**  A nice side-effect of this implementation decision is that I get the drag-and-drop functionality for free; the Web Browser control supports dragging links out of it and into other applications without any additional code.

The master list of links will be stored into some form of central repository, but the user's personal set of links will be stored locally and updated as needed. With some local preference editing needed, the final list of functionality is as follows:

  * Retrieve Master list of feeds from a central store
  * Retrieve Personal list of feeds from a local store
  * Retrieve and Transform a RSS feed into HTML
  * Display HTML in a Web Browser
  * Allow the user to enter in the URL for an RSS feed
  * Allow the user to add/edit/delete from their personal store of feeds
  * Allow the user to add/edit/delete from the Master list of feeds (note that this is certainly not suitable in all situations)

In my particular case, I am going to store the Master feed list into the same shared database being used by the main Page Planner system and then use the SqlClient classes to retrieve/edit it, but you might need a different implementation (Web Service based, file based central storage, etc.). To make it easy to swap out my particular method of storing the master and personal feed lists, I've designed those aspects of the program to be slightly abstracted through an IFeedStore interface that you can implement to create your own method of storing and retrieving the list of feeds.

### Displaying the Feed

Of course, storing and updating feed lists is truly secondary to the purpose of this little project, the main functionality is to retrieve and display an RSS feed so it is best if I start by showing you that piece of the system.

To load the feed itself, I use the Load method of an XMLDocument. I then load up the XSL from another URL (or file location) into an XSLTransform instance. Finally, I use the Transform method of the XSLTransform class to take the XMLDocument and transform it using the XSL. The output from the transform is written into a stream, so I created a String based stream (an instance of IO.StringWriter) to accept the results.

```vb
Dim myDoc As New XmlDocument
myDoc.Load(rssURL.Text)

Dim result As New System.Text.StringBuilder
Dim resultStream = New IO.StringWriter(result)

Dim xslt As New XslTransform
xslt.Load(xsltURL.Text)
xslt.Transform(myDoc, New Xsl.XsltArgumentList, resultStream)
```

So far, this is really straightforward code, as the real work is being done in the XSL file itself. This XSL isn't capable of handling any RSS feed, as consistency isn't one of the strong-points of RSS implementations, but it has worked on the feeds from weblogs.asp.net, MSDN and GotDotNet so it should be sufficient for now.

```xsl
<?xml version="1.0" encoding="UTF-8" ?>
<xsl:stylesheet version='1.0' xmlns:xsl='http://www.w3.org/1999/XSL/Transform' xmlns:content='http://purl.org/rss/1.0/modules/content/'
 xmlns:msxsl="urn:schemas-microsoft-com:xslt" xmlns:utility="urn:myScripts" xmlns:xhtml='http://www.w3.org/1999/xhtml'
 xmlns:slash='http://purl.org/rss/1.0/modules/slash/'>
 <msxsl:script language="vb" implements-prefix="utility">
function GetDate(pubDate As String)
  Dim myDate as Date = CDate(pubDate)
  Return myDate.ToString("yyyyMMddHHmmss")
end function
</msxsl:script>
 <xsl:output method="xml" version="1.0" encoding="UTF-8" indent="yes" />
 <xsl:template match="/rss/channel">
  <xsl:for-each select="./item">
   <xsl:sort order="descending" select="utility:GetDate(./pubDate)" />
   <xsl:apply-templates select="." />
  </xsl:for-each>
 </xsl:template>
 <xsl:template match="item">
  <h3>
   <a href='{link}'>
    <xsl:value-of select="title" />
   </a>
  </h3>
  Posted on: <xsl:value-of select="pubDate" />
  <div><xsl:attribute name="id"><xsl:value-of select="title" /></xsl:attribute>
  <ul>
   <xsl:choose>
    <xsl:when test='xhtml:body'>
     <xsl:copy-of select='xhtml:body'/>
    </xsl:when>
    <xsl:when test='content:encoded'>
     <xsl:value-of  disable-output-escaping='yes' select='content:encoded'/>
    </xsl:when>
    <xsl:otherwise>
     <xsl:value-of disable-output-escaping='yes' select='description'/>
    </xsl:otherwise>
            </xsl:choose>
  </ul>
  </div>
 </xsl:template>
</xsl:stylesheet>
```

Before I can continue with the article I really need to finish up the code, which I haven't had quite enough time for yet... so far I ended up creating a little 'test' application (see the pic below) that will eventually be scrapped in favour of the real system, and the same goes for that code I've pasted in above... but it is a start. The XSLT will likely be improved a bit more as well, it can't handle

[Chris Sells's feed](http://www.sellsbrothers.com/news/rss.aspx) at the moment among others (due to [the wonders of RSS](http://weblogs.asp.net/ksharkey/posts/21875.aspx) and my own lack of knowledge about all of the different possible elements).

![RSS Viewer Screenshot](/images/rssviewer.jpg)

The current version of the XSL file is sitting at <http://www.duncanmackenzie.net/rss2html2.zip> if you are interested....
