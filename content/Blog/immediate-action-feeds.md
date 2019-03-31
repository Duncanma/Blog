---
date: 2005-12-17T10:27:00+00:00
title: Immediate Action Feeds
type: posts
---
[Kent](http://www.acmebinary.com/blogs/kent) pointed me to [this article on xml.com](http://www.xml.com/pub/a/2005/12/14/putting-rss-to-work-immediate-action-feeds.html), talking about the benefits of having direct actions available as links in your feeds. This is a good idea, but it is a good idea for any HTML content. If you are going to have a link at the bottom of a MSDN page saying "give us feedback", it would be best to either make sure that link takes the user directly to a form to enter feedback or instead to let them enter their feedback right there on the page. Good stuff all around, but in the context of feeds I have a problem with the way it is implemented.

The suggestion in the article, and it works just fine, is to just add these immediate action links into the body of your feed item. This will seem like a meaningless distinction to some, but to me that is not the best way to go. The links are about the content of the post; they themselves are not the content, so **they don't belong in the content**.

Having them in the markup of the post means that every feed producer will put their 'actions' wherever they want them, and you can bet it won't be in any consistent fashion. Instead, what I would like to see is a list of 'actions' as a separate part of the feed item. Then the software that is displaying the feed could implement a common method of displaying the list of actions associated with a specific item. In one application this might be a right-click menu option, while in another it could be a sidebar along side the post.... but because the actions are clearly separated from the content it opens up the possibility of displaying them in whatever fashion the application author believes will be most usable.

So, instead of this

 <item>
     <title>New Album out by GreenDay</title>
     <description>
          Cool new album hits stores today....[buy it](...)
     </description>
     <link>http://www.musicsite.com/newalbumout.aspx</link>
     <guid isPermaLink="true">http://www.musicsite.com/newalbumout.aspx</guid>
     <pubDate>Tue, 25 Oct 2005 22:54:16 GMT</pubDate>
</item>

We would have this...

 <item>
     <title>New Album out by GreenDay</title>
     <description>
          Cool new album hits stores today....
     </description>
     <link>http://www.musicsite.com/newalbumout.aspx</link>
     **<ia:actions>
          <ia:action name="Buy It">
               http://www.musicsite.com/buy.aspx?id=greenday
           </ia:action>
     </ia:actions>**
     <guid isPermaLink="true">http://www.musicsite.com/newalbumout.aspx</guid>
     <pubDate>Tue, 25 Oct 2005 22:54:16 GMT</pubDate>
</item>

Now it is easy to add additional actions without any change to the content

     <ia:actions>
          <ia:action name="Buy It">
               http://www.musicsite.com/buy.aspx?id=greenday
           </ia:action>
          **<ia:action name="Email this Post">
               http://www.musicsite.com/email.aspx?id=greenday
           </ia:action>**
     </ia:actions>
