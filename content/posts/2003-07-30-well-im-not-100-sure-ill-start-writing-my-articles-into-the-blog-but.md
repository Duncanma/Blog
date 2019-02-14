Here is a teaser for the article I am currently working on&#8230;

* * *

## Keeping Work Fun
  


Duncan Mackenzie
  
Microsoft Developer Network

August 8, 2003
  
**Summary:** Duncan Mackenzie describes how the &#8216;coolness&#8217; of a feature can increase its chance of being finished early on in a development project.

### People Keep Making me Work
  


If you&#8217;ve been following my columns, you probably think that I spend all my time writing up fun and cool code samples without having to work on anything boring. Well, that was certainly the plan, but it doesn&#8217;t always work out that way. Lately, I&#8217;ve been so busy working on a relatively &#8216;boring&#8217; system that I don&#8217;t really have time to write anything &#8216;fun&#8217;. Recently though I was handed a list of new requirements for an internal system arranged in priority order, which I suppose is an indication of the order in which I was supposed to work on each feature. I quickly noticed that the really cool stuff was hidden down at the end of the list, marked as &#8216;Nice to Have&#8217; which is PM-speak for &#8216;We will never build this… but we are putting it on the list to humor you&#8217;. Using the very flimsy pretense that I was confused about the list&#8217;s sorting order, I decided to tackle the cool features first and save those boring &#8220;Priority 1 / Must Have&#8221; features for some day after I&#8217;ve tidied my desktop and defrag&#8217;ed my hard drive.

### Planning Pages at MSDN
  


Before I can get into the &#8216;cool&#8217; feature, I should really give you some context about the system that the system is intended for. A few months ago, I built an internal system called &#8220;Page Planner&#8221; that is used to design and build the pages that make up the MSDN Developer Centers (including the Visual Basic site that I plan content for). This system (as shown in Figure 1) allows us to update all of the individual pages on the site, including all of the technology specific article pages like <http://msdn.microsoft.com/vbasic/using/building/windows>{.broken_link}. 

<img src="http://www.duncanmackenzie.net/ppscreenshot.jpg" border="0" />
  
**Figure 1
  
** 

The main day-to-day work of maintaining these sites involves updating the appropriate technical information pages when new articles become available. This is normally done by manually entering URLs, or by dragging links in from the browser window. The recent release of the [MSDN RSS](http://msdn.microsoft.com/aboutmsdn/rss.asp){.broken_link} feeds (which contain the up-to-date list of new content) and similar [feeds for sites like 4GuysFromRolla.com](http://www.4GuysFromRolla.com) produced the &#8216;nice to have&#8217; request for &#8220;Drag and Drop Links from an RSS feed&#8221;. </ul> 

* * *That is usually how I start&#8230; I write up some little blurb explaining why I picked the topic that I did and then I move onto writing the code&#8230; or, more often than not, I write the code to about 80-90% of the way first, before I ever start writing the article. In this case, I had already created a simple app that hosts the web browser control, successfully loads and transforms the MSDN RSS feeds and then sticks that HTML into the web browser. There is a lot more to write though, I&#8217;ve been working on getting the XSLT to sort the feeds correctly, dealing with the various types of body content (xhtml:body, content:encoded, etc.), and setting up a system to keep track of feed lists. Turns out that there are a few additional issues that will be worth discussing as I continue&#8230;