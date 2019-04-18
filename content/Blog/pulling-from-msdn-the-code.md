---
date: 2005-03-22T08:26:00+00:00
title: Pulling from MSDN... the code...
type: posts
---
(see [this post](http://blogs.duncanmackenzie.net/duncanma/archive/2005/03/19/1243.aspx) for an introduction to this topic...)

I've wrapped my code up into a user control that you place anywhere on your page... it handles the load of data and then you can access its properties to output the html headers and body of the pulled content. I've just been using Output Caching on the host page, but if you decided to cache the body/headers that would certainly work as well...

Here is an example of using the control on a bare bones page...

```aspx
<%@ Page Language="VB" Debug="true" %>
<%@ OutputCache Duration="360" VaryByParam="*" %>
<%@ Register TagPrefix="dm" TagName="Pull" Src="Pull.ascx" %>
<dm:Pull id=pagePull runat="server"
 QueryParam="pullURL"
 DefaultURL="http://msdn.microsoft.com"/>
<html>
 <head>
 <%=pagePull.PageHeaders%>
 </head>
 <body>
 <%=pagePull.PageBody%>
 </body>
</html>
```

This simple page and the ascx are bundled up into a .zip file available [here](http://www.duncanmackenzie.net/Samples/#pull)
