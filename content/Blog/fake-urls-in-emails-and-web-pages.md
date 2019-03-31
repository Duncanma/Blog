---
date: 2005-06-13T07:07:00+00:00
title: Fake URLs in emails and web pages...
type: posts
---
Man, I'm getting sick of people's attempts to trick me... mostly because they are just pretty lame, and also because I feel sorry for the number of folks that are quite possibly being hit by these scams. One of the more recent tricks is sending me a notice about my "insert online service or bank here" account and providing me a link to go and enter my userid/password... and the link text is something like "https://www.paypal.com/trustedlink.php", but the actual underlying URL is to "http://128.234.232.23/fakespammerssite.htm" ... and it makes me think that some browser plug-ins could be useful here... especially if they worked for html content in email as well... how about checking the text against the url and if the text is structured to look like a valid link, but points to a different location then mark it as suspect... or make the URL visible on every link that isn't already using its href value as its text... so a paragraph like this;

> Click [here](http://www.duncanmackenzie.net/) to confirm your banking information!

Would automatically appear as

> Click [here [<i>http://www.duncanmackenzie.net/</i>]](http://www.duncanmackenzie.net/) to confirm your banking information!

Maybe making the anchor tag disabled in the text appears to be trying to look like a different url would be a selectable option, turning

> Click [https://www.paypal.com](http://www.duncanmackenzie.net/) to confirm your banking information!

into

> Click <font color="red"><u>https://www.paypal.com [Warning misleading link text detected!! Real target is <i>http://www.duncanmackenzie.net/</i>]</u> to confirm your banking information!

For Outlook, this might be doable as an Outlook Add-in, one that scans and edits your HTML and rich formatted emails for you... you could do this for IE with an add-in ... and I'm sure some of the recent html insertion tools for Firefox would work for this purpose (but not in Thunderbird, it uses the gecko engine, but I don't believe that plug-ins applied to Firefox have any affect on viewing/browsing inside your email... maybe a thunderbird plug-in would be needed).
