<a href="http://www.acmebinary.com/blogs/kent" target="_blank" class="broken_link">Kent</a> pointed me to <a href="http://www.xml.com/pub/a/2005/12/14/putting-rss-to-work-immediate-action-feeds.html" target="_blank">this article on xml.com</a>, talking about the benefits of having direct actions available as links in your feeds. This is a good idea, but it is a good idea for any HTML content. If you are going to have a link at the bottom of a MSDN page saying &#8220;give us feedback&#8221;, it would be best to either make sure that link takes the user directly to a form to enter feedback or instead to let them enter their feedback right there on the page. Good stuff all around, but in the context of feeds I have a problem with the way it is implemented.

The suggestion in the article, and it works just fine, is to just add these immediate action links into the body of your feed item. This will seem like a meaningless distinction to some, but to me that is not the best way to go. The links are about the content of the post; they themselves are not the content, so **they don&#8217;t belong in the content**.

Having them in the markup of the post means that every feed producer will put their &#8216;actions&#8217; wherever they want them, and you can bet it won&#8217;t be in any consistent fashion. Instead, what I would like to see is a list of &#8216;actions&#8217; as a separate part of the feed item. Then the software that is displaying the feed could implement a common method of displaying the list of actions associated with a specific item. In one application this might be a right-click menu option, while in another it could be a sidebar along side the post&#8230;. but because the actions are clearly separated from the content it opens up the possibility of displaying them in whatever fashion the application author believes will be most usable.

So, instead of this

&nbsp;<item>  
&nbsp;&nbsp;&nbsp;&nbsp; <title>New Album out by GreenDay</title>  
&nbsp;&nbsp;&nbsp;&nbsp; <description>  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <p>Cool new album hits stores today&#8230;.<br /><a href=&#8221;&#8230;&#8221;>buy it</a></p>  
&nbsp;&nbsp;&nbsp;&nbsp; </description>  
&nbsp;&nbsp;&nbsp;&nbsp; <link>http://www.musicsite.com/newalbumout.aspx</link>  
&nbsp;&nbsp;&nbsp;&nbsp; <guid isPermaLink=&#8221;true&#8221;>http://www.musicsite.com/newalbumout.aspx</guid>  
&nbsp;&nbsp;&nbsp;&nbsp; <pubDate>Tue, 25 Oct 2005 22:54:16 GMT</pubDate>  
</item>

We would have this&#8230;

&nbsp;<item>  
&nbsp;&nbsp;&nbsp;&nbsp; <title>New Album out by GreenDay</title>  
&nbsp;&nbsp;&nbsp;&nbsp; <description>  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <p>Cool new album hits stores today&#8230;.</p>  
&nbsp;&nbsp;&nbsp;&nbsp; </description>  
&nbsp;&nbsp;&nbsp;&nbsp; <link>http://www.musicsite.com/newalbumout.aspx</link>  
&nbsp;&nbsp;&nbsp;&nbsp; **<ia:actions>  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <ia:action name=&#8221;Buy It&#8221;>  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; http://www.musicsite.com/buy.aspx?id=greenday  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </ia:action>  
&nbsp;&nbsp;&nbsp;&nbsp; </ia:actions>**  
&nbsp;&nbsp;&nbsp;&nbsp; <guid isPermaLink=&#8221;true&#8221;>http://www.musicsite.com/newalbumout.aspx</guid>  
&nbsp;&nbsp;&nbsp;&nbsp; <pubDate>Tue, 25 Oct 2005 22:54:16 GMT</pubDate>  
</item>

Now it is easy to add additional actions without any change to the content

&nbsp;&nbsp;&nbsp;&nbsp; <ia:actions>  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <ia:action name=&#8221;Buy It&#8221;>  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; http://www.musicsite.com/buy.aspx?id=greenday  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </ia:action>  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **<ia:action name=&#8221;Email this Post&#8221;>  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; http://www.musicsite.com/email.aspx?id=greenday  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </ia:action>**  
&nbsp;&nbsp;&nbsp;&nbsp; </ia:actions>