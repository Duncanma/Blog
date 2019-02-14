Man, I&#8217;m getting sick of people&#8217;s attempts to trick me&#8230; mostly because they are just pretty lame, and also because I feel sorry for the number of folks that are quite possibly being hit by these scams. One of the more recent tricks is sending me a notice about my &#8220;insert online service or bank here&#8221; account and providing me a link to go and enter my userid/password&#8230; and the link text is something like &#8220;https://www.paypal.com/trustedlink.php&#8221;, but the actual underlying URL is to &#8220;http://128.234.232.23/fakespammerssite.htm&#8221; &#8230; and it makes me think that some browser plug-ins could be useful here&#8230; especially if they worked for html content in email as well&#8230; how about checking the text against the url and if the text is structured to look like a valid link, but points to a different location then mark it as suspect&#8230; or make the URL visible on every link that isn&#8217;t already using its href value as its text&#8230; so a paragraph like this;

> Click <a href="http://www.duncanmackenzie.net/" target="_blank">here</a> to confirm your banking information! 

Would automatically appear as

> Click <a href="http://www.duncanmackenzie.net/" target="_blank">here [<i>http://www.duncanmackenzie.net/</i>]</a> to confirm your banking information! 

Maybe making the anchor tag disabled in the text appears to be trying to look like a different url would be a selectable option, turning

> Click <a href="http://www.duncanmackenzie.net/" target="_blank">https://www.paypal.com</a> to confirm your banking information! 

into

> Click <font color="red"><u>https://www.paypal.com [Warning misleading link text detected!! Real target is <i>http://www.duncanmackenzie.net/</i>]</u></font> to confirm your banking information! 

For Outlook, this might be doable as an Outlook Add-in, one that scans and edits your HTML and rich formatted emails for you&#8230; you could do this for IE with an add-in &#8230; and I&#8217;m sure some of the recent html insertion tools for Firefox would work for this purpose (but not in Thunderbird, it uses the gecko engine, but I don&#8217;t believe that plug-ins applied to Firefox have any affect on viewing/browsing inside your email&#8230; maybe a thunderbird plug-in would be needed).