---
date: 2007-05-27T09:37:00+00:00
title: Put up a REST API for Xbox Gamertag Data
type: posts
---
[My twitter app](http://www.duncanmackenzie.net/blog/connect-your-xbox-360-gamertag-to-twitter/) uses a web service hosted on my site to get all the necessary Xbox Live info.... way more than the twitter app actually uses. This is a SOAP API, located here:

<http://duncanmackenzie.net/services/XboxInfo.asmx>



I know that some people prefer a more RESTful API though, so I also have another 'page' that you can call with a straight GET request and just pass the gamertag in as a query string parameter:

<http://duncanmackenzie.net/services/GetXboxInfo.aspx?GamerTag=Festive+Turkey>



Enjoy!
