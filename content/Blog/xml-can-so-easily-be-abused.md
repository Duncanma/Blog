---
date: 2003-10-22T11:32:00+00:00
title: XML can so easily be abused...
type: posts
---
I am getting really tired of seeing web services (or RSS feeds, or .NET methods, or anything else) with large blocks of complex, structured data that is exposed as **"String".**

You call the web service, you get back this big string, which you then load into an **XMLDocument** and off you go (or XPath Navigator, etc...) ... but if they had just defined the real structure in the first place, I wouldn't have to do anything... I'd have a nice "weather" structure or "employee" object inside an "employees" collection... now, I can certainly massage/convert/deserialize their XML (well, **I** know it is XML, their wsdl says "String") into a nice object collection, but why should I have to!?! They went to all of the work to produce formatted, structured XML output, why type it is as String?

Ach, maybe I'm missing something here, but I'm starting to get grumpy. I remember trying to show off an easy web service connection when I was at a booth at a convention so I randomly picked a web service listed on [xmethods.com](http://xmethods.com), and I picked [the wrong one](http://www.webservicex.net/globalweather.asmx?WSDL)... now, don't get me wrong... it worked fine, but I had to parse XML to get the temperature which made my simple demo a little more complicated than I wanted!

What I wanted was;

<font face="'Courier New',Courier,monospace">Dim myTemp as GlobalWeather.TemperatureResponse = GlobalWeather.GetTemperature("Redmond","United States") MsgBox(myTemp.Current)

_(note, don't try that, it won't work... I'm just dreaming...)_

There are plenty of web services (on xmethods and elsewhere) that work the **right** way (in my mind at least), but I keep running into ones that don't.... or .NET assemblies that accept a String as a parameter, that is actually a String containing an XML document... instead of a properly defined structure... even though the XML you pass in has to conform to a very exact specification... why would anyone do that? Well some people tell me it is for flexibility, but I doubt it often works out for them.

Tonight I started thinking of adding weather information to my music system (hey, it might seem odd, but it is up on the TV screen... might as well show some useful info) but I didn't want to scrape some web site, possibly breaking their terms of use and/or annoying them, so I went looking for a weather site that offered a feed or a web service and I found [www.rssweather.com](http://www.rssweather.com). Wow, that should just rock, right? Bugger. The weather info is dumped in as a HTML block in the body of each feed item... which probably works great in SharpReader, but why oh why couldn't they have included it in both a HTML format and as structured XML? RSS is extensible, they could have added their own namespace ... bah. Guess I'll keep looking.

_Note that some web services should be string in, string out... like this cool looking [RTF To HTML service](http://www.infoaccelerator.net/rtf2html/) I saw on xmethods..._

<div class="media">
  [Listening to: Clint Eastwood – [Gorillaz](http://www.windowsmedia.com/mg/search.asp?srch=Gorillaz) – Big Shiny Tunes 6 (03:45)]
</div>
