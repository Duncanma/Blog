Continuing along with the rest of the article, I start to layout the basic design of what I am about to build&#8230; 

* * *

### Designing our New Feature

As a fairly low-priority item, the request wasn&#8217;t described in any more detail than that one line, but I had a pretty good idea about what folks around MSDN were looking for so I started with a rough design.

The RSS Viewer window will support the viewing of an RSS feed and the dragging of links from the feed into the rest of the system. The user will be able to select from a &#8216;master list&#8217; of feeds that are exposed to all of the system users or from their own personal list, and they will have the option to enter a feed URL directly (adding it to their personal list if desired).

I couldn&#8217;t think of a really simple way to display a feed (with variable size content, XHTML support, etc.) inside a DataGrid control, not without a bit of custom code, so I decided to display the feed using the Web Browser control (hosting IE on my Windows Form) instead. Using an XSL transform, I can convert the RSS information into HTML and then pass that HTML into the browser control for display.

**Note**  A nice side-effect of this implementation decision is that I get the drag-and-drop functionality for free; the Web Browser control supports dragging links out of it and into other applications without any additional code. 

The master list of links will be stored into some form of central repository, but the user&#8217;s personal set of links will be stored locally and updated as needed. With some local preference editing needed, the final list of functionality is as follows:

  * Retrieve Master list of feeds from a central store 
  * Retrieve Personal list of feeds from a local store 
  * Retrieve and Transform a RSS feed into HTML 
  * Display HTML in a Web Browser 
  * Allow the user to enter in the URL for an RSS feed 
  * Allow the user to add/edit/delete from their personal store of feeds 
  * Allow the user to add/edit/delete from the Master list of feeds (note that this is certainly not suitable in all situations) 

In my particular case, I am going to store the Master feed list into the same shared database being used by the main Page Planner system and then use the SqlClient classes to retrieve/edit it, but you might need a different implementation (Web Service based, file based central storage, etc.). To make it easy to swap out my particular method of storing the master and personal feed lists, I&#8217;ve designed those aspects of the program to be slightly abstracted through an IFeedStore interface that you can implement to create your own method of storing and retrieving the list of feeds.

### Displaying the Feed

Of course, storing and updating feed lists is truly secondary to the purpose of this little project, the main functionality is to retrieve and display an RSS feed so it is best if I start by showing you that piece of the system.

To load the feed itself, I use the Load method of an XMLDocument. I then load up the XSL from another URL (or file location) into an XSLTransform instance. Finally, I use the Transform method of the XSLTransform class to take the XMLDocument and transform it using the XSL. The output from the transform is written into a stream, so I created a String based stream (an instance of IO.StringWriter) to accept the results.

<pre>Dim myDoc As New XmlDocument
            myDoc.Load(rssURL.Text)

            Dim result As New System.Text.StringBuilder
            Dim resultStream = New IO.StringWriter(result)

            Dim xslt As New XslTransform
            xslt.Load(xsltURL.Text)
            xslt.Transform(myDoc, New Xsl.XsltArgumentList, resultStream)
</pre>

So far, this is really straightforward code, as the real work is being done in the XSL file itself. This XSL isn&#8217;t capable of handling any RSS feed, as consistency isn&#8217;t one of the strong-points of RSS implementations, but it has worked on the feeds from weblogs.asp.net, MSDN and GotDotNet so it should be sufficient for now. </ul> 

<?xml version=&#8221;1.0&#8243; encoding=&#8221;UTF-8&#8243; ?>  
<xsl:stylesheet version=&#8217;1.0&#8242; xmlns:xsl=&#8217;http://www.w3.org/1999/XSL/Transform&#8217; xmlns:content=&#8217;http://purl.org/rss/1.0/modules/content/&#8217;  
 xmlns:msxsl=&#8221;urn:schemas-microsoft-com:xslt&#8221; xmlns:utility=&#8221;urn:myScripts&#8221; xmlns:xhtml=&#8217;http://www.w3.org/1999/xhtml&#8217;  
 xmlns:slash=&#8217;http://purl.org/rss/1.0/modules/slash/&#8217;>  
 <msxsl:script language=&#8221;vb&#8221; implements-prefix=&#8221;utility&#8221;>  
function GetDate(pubDate As String)  
  Dim myDate as Date = CDate(pubDate)  
  Return myDate.ToString(&#8220;yyyyMMddHHmmss&#8221;)  
end function  
</msxsl:script>  
 <xsl:output method=&#8221;xml&#8221; version=&#8221;1.0&#8243; encoding=&#8221;UTF-8&#8243; indent=&#8221;yes&#8221; />  
 <xsl:template match=&#8221;/rss/channel&#8221;>  
  <xsl:for-each select=&#8221;./item&#8221;>  
   <xsl:sort order=&#8221;descending&#8221; select=&#8221;utility:GetDate(./pubDate)&#8221; />  
   <xsl:apply-templates select=&#8221;.&#8221; />  
  </xsl:for-each>  
 </xsl:template>  
 <xsl:template match=&#8221;item&#8221;>  
  <h3>  
   <a href='{link}&#8217;>  
    <xsl:value-of select=&#8221;title&#8221; />  
   </a>  
  </h3>  
  <p>Posted on: <xsl:value-of select=&#8221;pubDate&#8221; /></p>  
  <div><xsl:attribute name=&#8221;id&#8221;><xsl:value-of select=&#8221;title&#8221; /></xsl:attribute>  
  <ul>  
   <xsl:choose>  
    <xsl:when test=&#8217;xhtml:body&#8217;>  
     <xsl:copy-of select=&#8217;xhtml:body&#8217;/>  
    </xsl:when>  
    <xsl:when test=&#8217;content:encoded&#8217;>  
     <xsl:value-of  disable-output-escaping=&#8217;yes&#8217; select=&#8217;content:encoded&#8217;/>  
    </xsl:when>  
    <xsl:otherwise>  
     <xsl:value-of disable-output-escaping=&#8217;yes&#8217; select=&#8217;description&#8217;/>  
    </xsl:otherwise>  
            </xsl:choose>  
  </ul>  
  </div>  
 </xsl:template>  
</xsl:stylesheet></p> 

* * *Before I can continue with the article I really need to finish up the code, which I haven&#8217;t had quite enough time for yet&#8230; so far I ended up creating a little &#8216;test&#8217; application (see the pic below) that will eventually be scrapped in favour of the real system, and the same goes for that code I&#8217;ve pasted in above&#8230; but it is a start. The XSLT will likely be improved a bit more as well, it can&#8217;t handle 

[<font color="#0000ff">Chris Sells&#8217;s feed</font>](http://www.sellsbrothers.com/news/rss.aspx){.broken_link} at at the moment among others (due to [the wonders of RSS](http://weblogs.asp.net/ksharkey/posts/21875.aspx){.broken_link} and my own lack of knowledge about all of the different possible elements).</p> 

<img src="http://www.duncanmackenzie.net/rssviewer.jpg" border="0" />

The current version of the XSL file is sitting at <http://www.duncanmackenzie.net/rss2html2.zip>{.broken_link} if you are interested&#8230;.

###