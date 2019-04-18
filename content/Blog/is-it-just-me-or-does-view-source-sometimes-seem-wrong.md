---
date: 2004-09-07T05:32:00+00:00
title: is it just me, or does "View Source" sometimes seem wrong?
type: posts
tags:
 - Coding
 - Web
---
I noticed the cool ads rotating on the side of the developer centers ([VB](http://msdn.microsoft.com/vbasic) and [C#](http://msdn.microsoft.com/vcsharp)) so I “Viewed Source” and grabbed the relevant HTML... voila, I'm now showing MSN Ads on my site... totally inappropriate? Perhaps, but very easy...

```html
<div class="mnpAds" style="width: 181px; height: 100%; padding-bottom: 20px;
background: #F1F1F1; border-style: solid; border-color: #999999; border-width:
0px 1px 0px 0px">
    <center>
        <div style="height: 20px; background:
inherit"></div>

        <iframe frameborder="0"
scrolling="no" marginheight="0px" marginwidth="0px" allowtransparency="true"

style="background:#F1F1F1" width="120" height="240" id="rad_CMSVB1F3"
            src="http://rad.microsoft.com/ADSAdClient31.dll?GetAd=&amp;PG=CMSVB1&amp;SC=F3&amp;AP=1164">
        </iframe>
        <br>
    </center>
</div>
```

Note that the MSDN ads may not be there by the time you visit the site... I don't really want them there, I'm just playing 🙂
