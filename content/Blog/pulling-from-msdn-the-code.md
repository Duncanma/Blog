---
date: 2005-03-22T08:26:00+00:00
title: Pulling from MSDN... the code...
type: posts
---
(see [this post](http://blogs.duncanmackenzie.net/duncanma/archive/2005/03/19/1243.aspx) for an introduction to this topic...)

I've wrapped my code up into a user control that you place anywhere on your page... it handles the load of data and then you can access its properties to output the html headers and body of the pulled content. I've just been using Output Caching on the host page, but if you decided to cache the body/headers that would certainly work as well...

Here is an example of using the control on a bare bones page...

<pre>&lt;%@ Page Language=<font color="red" family="Microsoft Sans Serif">"VB" Debug=<font color="red" family="Microsoft Sans Serif">"true" %&gt;&lt;%@ OutputCache Duration=<font color="red" family="Microsoft Sans Serif">"360" VaryByParam=<font color="red" family="Microsoft Sans Serif">"*" %&gt;&lt;%@ Register TagPrefix=<font color="red" family="Microsoft Sans Serif">"dm" TagName=<font color="red" family="Microsoft Sans Serif">"Pull" Src=<font color="red" family="Microsoft Sans Serif">"Pull.ascx" %&gt;&lt;dm:Pull id=pagePull runat=<font color="red" family="Microsoft Sans Serif">"server"  QueryParam=<font color="red" family="Microsoft Sans Serif">"pullURL"  DefaultURL=<font color="red" family="Microsoft Sans Serif">"http://msdn.microsoft.com"/&gt;&lt;html&gt; &lt;head&gt; &lt;%=pagePull.PageHeaders%&gt; &lt;/head&gt; &lt;body&gt; &lt;%=pagePull.PageBody%&gt; &lt;/body&gt;&lt;/html&gt; </pre>

This simple page and the ascx are bundled up into a .zip file available [here](http://www.duncanmackenzie.net/Samples/#pull)
