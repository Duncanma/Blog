I noticed the cool ads rotating on the side of&nbsp;the developer centers ([VB](http://msdn.microsoft.com/vbasic) and [C#](http://msdn.microsoft.com/vcsharp)) so I “Viewed Source” and grabbed the relevant HTML&#8230; voila, I&#8217;m now showing MSN Ads on my site&#8230; totally inappropriate? Perhaps, but very easy&#8230;

> <pre><p>
  &lt;div class="mnpAds" style="width: 181px; height: 100%; padding-bottom: 20px; 
  background: #F1F1F1; border-style: solid; border-color: #999999; border-width: 
  0px 1px 0px 0px"&gt;
  &nbsp;&nbsp;&nbsp; &lt;center&gt;
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;div style="height: 20px; background: 
  inherit"&gt;&lt;/div&gt;<br />
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;iframe frameborder="0" 
  scrolling="no" marginheight="0px" marginwidth="0px" allowtransparency="true"
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
  style="background:#F1F1F1" width="120" height="240" id="rad_CMSVB1F3"
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; src="http://rad.microsoft.com/ADSAdClient31.dll?GetAd=&amp;PG=CMSVB1&amp;SC=F3&amp;AP=1164"&gt;
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;/iframe&gt;
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;br&gt;
  &nbsp;&nbsp;&nbsp; &lt;/center&gt;
  &lt;/div&gt;
</p>
</pre>

Note that the MSDN ads may not be there by the time you visit the site&#8230; I don&#8217;t really want them there, I&#8217;m just playing 🙂