</p> 

I&#8217;ve been pondering categories vs. tags in blogs, in my sites (such as <http://on10.net)>{.broken_link} we&#8217;ve completely done away with the concept of categories as distinct entities from tags, which works fine on the site but is causing me a bit of a headache when I look at blog editing and blog editing APIs. 

I&#8217;ve enabled the <a href="http://www.xmlrpc.com/metaWeblogApi" target="_blank" class="broken_link">metaweblogapi</a> on my sites so that standard blog editing tools like performancing, windows live writer, etc&#8230; can be used by our staff to post entries, and I&#8217;ve used the &#8216;categories&#8217; area of that API to represent tags. 

This has caused me two issues: 

First, there are many more tags on most sites than there would be categories, so editing tools don&#8217;t always provide the most useful UI for selecting tags. 

Second, categories are fairly static, but tags are continually being added&#8230; and most blogging software doesn&#8217;t provide a mechanism for adding to your list of categories. 

I&#8217;m looking for thoughts, ideas, arguments&#8230; anything to help me figure out what the best way is to handle this move from categories to tags while still supporting the standard API mechanisms.