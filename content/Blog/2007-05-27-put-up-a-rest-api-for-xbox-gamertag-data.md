<a href="http://www.duncanmackenzie.net/blog/connect-your-xbox-360-gamertag-to-twitter/" target="_blank" class="broken_link">My twitter app</a> uses a web service hosted on my site to get all the necessary Xbox Live info&#8230;. way more than the twitter app actually uses. This is a SOAP API, located here:

<http://duncanmackenzie.net/services/XboxInfo.asmx>{.broken_link}

&nbsp; 

I know that some people prefer a more RESTful API though, so I also have another &#8216;page&#8217; that you can call with a straight GET request and just pass the gamertag in as a query string parameter: 

<http://duncanmackenzie.net/services/GetXboxInfo.aspx?GamerTag=Festive+Turkey> 

&nbsp; 

Enjoy!