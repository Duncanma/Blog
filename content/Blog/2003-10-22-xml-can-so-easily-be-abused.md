I am getting really tired of seeing web services (or RSS feeds, or .NET methods, or anything else) with large blocks of complex, structured data that is exposed as **&#8220;String&#8221;.**

You call the web service, you get back this big string, which you then load into an **XMLDocument** and off you go (or XPath Navigator, etc&#8230;) &#8230; but if they had just defined the real structure in the first place, I wouldn&#8217;t have to do anything&#8230; I&#8217;d have a nice &#8220;weather&#8221; structure or &#8220;employee&#8221; object inside an &#8220;employees&#8221; collection&#8230; now, I can certainly massage/convert/deserialize their XML (well, **I** know it is XML, their wsdl says &#8220;String&#8221;) into a nice object collection, but why should I have to!?! They went to all of the work to produce formatted, structured XML output, why type it is as String?

Ach, maybe I&#8217;m missing something here, but I&#8217;m starting to get grumpy. I remember trying to show off an easy web service connection when I was at a booth at a convention so I randomly picked a web service listed on [xmethods.com](http://xmethods.com){.broken_link}, and I picked [the wrong one](http://www.webservicex.net/globalweather.asmx?WSDL)&#8230; now, don&#8217;t get me wrong&#8230; it worked fine, but I had to parse XML to get the temperature which made my simple demo a little more complicated than I wanted!

What I wanted was;

<font face="'Courier New',Courier,monospace">Dim myTemp as GlobalWeather.TemperatureResponse = GlobalWeather.GetTemperature(&#8220;Redmond&#8221;,&#8221;United States&#8221;)<br /> MsgBox(myTemp.Current)<br /></font>

_(note, don&#8217;t try that, it won&#8217;t work&#8230; I&#8217;m just dreaming&#8230;)_

There are plenty of web services (on xmethods and elsewhere) that work the **right** way (in my mind at least), but I keep running into ones that don&#8217;t&#8230;. or .NET assemblies that accept a String as a parameter, that is actually a String containing an XML document&#8230; instead of a properly defined structure&#8230; even though the XML you pass in has to conform to a very exact specification&#8230; why would anyone do that? Well some people tell me it is for flexibility, but I doubt it often works out for them.

Tonight I started thinking of adding weather information to my music system (hey, it might seem odd, but it is up on the TV screen&#8230; might as well show some useful info) but I didn&#8217;t want to scrape some web site, possibly breaking their terms of use and/or annoying them, so I went looking for a weather site that offered a feed or a web service and I found [www.rssweather.com](http://www.rssweather.com). Wow, that should just rock, right? Bugger. The weather info is dumped in as a HTML block in the body of each feed item&#8230; which probably works great in SharpReader, but why oh why couldn&#8217;t they have included it in both a HTML format and as structured XML? RSS is extensible, they could have added their own namespace &#8230; bah. Guess I&#8217;ll keep looking.

_Note that some web services should be string in, string out&#8230; like this cool looking [RTF To HTML service](http://www.infoaccelerator.net/rtf2html/){.broken_link} I saw on xmethods&#8230;_ 

<div class="media">
  [Listening to: Clint Eastwood &#8211; <a href="http://www.windowsmedia.com/mg/search.asp?srch=Gorillaz">Gorillaz</a> &#8211; Big Shiny Tunes 6 (03:45)]
</div>