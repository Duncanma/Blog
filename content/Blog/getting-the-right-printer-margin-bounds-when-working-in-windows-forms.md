---
date: 2004-07-19T09:25:00+00:00
title: Getting the right Printer Margin Bounds when working in Windows Forms...
type: posts
---
a Code Project link, via [Darth Pedro's blog](http://darthpedro.blogspot.com)...

<blockquote dir="ltr" style="MARGIN-RIGHT: 0px">

    <a id="titleLink" href="http://darthpedro.blogspot.com/2004/07/net-printer-margin-bounds-in-net.html">

    <div class="blogPost">
      <span class="rss:item"><span style="FONT-FAMILY: verdana"><b>.NET: Printer Margin Bounds in .NET</b></span></span>
    </div>


      </a>


    <div class="blogPost">
      <span class="rss:item"><span style="FONT-FAMILY: verdana">There's a very good [<font color="#de7008">Code Project](http://www.codeproject.com/) article by [<font color="#de7008">Philippe Leybaert](http://www.codeproject.com/script/profile/whos_who.asp?id=536673) on [<font color="#de7008">getting the appropriate printer margin bounds ](http://www.codeproject.com/csharp/DotNetprinterbounds.asp)so that what you print from you WinForms application will appear correctly.</span> <span style="FONT-FAMILY: Verdana"></span>  <span style="FONT-FAMILY: Verdana">While **PrintPageEventArgs** has a property **MarginBounds**, this property doesn't account for the hard margins of your printer for left and right margins – although they do appear to have the top and bottom margins right.  However, this article describes how you can get this information from the Windows API **GetDeviceCaps**.</span> <span style="FONT-FAMILY: Verdana"></span>  <span style="FONT-FAMILY: Verdana">It'll be interesting to see if this is fixed in Whidbey.</span> </span><span class="rss:item"></span>
    </div></blockquote>

    <div class="blogPost" dir="ltr">
      <span class="rss:item"> </span>
    </div>

    <p dir="ltr" style="MARGIN-RIGHT: 0px">

