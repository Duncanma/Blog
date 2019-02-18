<div>
  <span>Something must have changed, but I had no idea what it was&#8230; but suddenly, existing applications (the same version of which run fine on other machines) were crashing with IO errors, specifically &#8220;System.IO.IOException: The device is not ready.&#8221;.</span>
</div>

<div>
  <span></span>&nbsp;
</div>

<div>
  <span>At the same time, I could no longer open VB projects in VS.NET, or create new VB or C# project (&#8220;path not found&#8221; for the C# projects, &#8220;Project &#8216;project name&#8217; could not be opened because the Microsoft Visual Basic .NET compiler could not be created. Please re-install Visual Studio.&#8221; for my existing VB projects)</span>
</div>

<div>
  <span></span>&nbsp;
</div>

<div>
  <span>Searching found lots of answers, including a KB article, but it (and all the other posts/sites I found) suggested I renamed my .NET Framework directory&#8230;. <a title="http://support.microsoft.com/default.aspx?scid=kb;en-us;821790" href="http://support.microsoft.com/default.aspx?scid=kb;en-us;821790">http://support.microsoft.com/default.aspx?scid=kb;en-us;821790</a>&nbsp;&#8230; which I didn&#8217;t do 🙂</span>
</div>

<div>
  <span></span>&nbsp;
</div>

<div>
  <span>I didn&#8217;t try reinstalling <strong>because I really wanted to know what&nbsp;was actually going wrong &#8216;behind-the-scences&#8217;</strong>,&nbsp;and here is where you benefit&#8230; I found out what was causing it, so if it&nbsp;happens to you, you&#8217;ll know too 🙂</span>
</div>

<div>
  <span></span>&nbsp;
</div>

<div>
  <span>I had a small flash of insight&#8230; everything that was failing relies upon xml serialization, which uses temp files &#8230; so I dug around and found that my TEMP and TMP environment variables were pointing to a secondary hard drive <strong>which was no longer there.</strong> (I popped it out to put in my CD drive&#8230;. can&#8217;t run Halo without it)</span>
</div>

<div>
  <span>&nbsp;</span>
</div>

<div align="left">
  <span>So&#8230; no temp folder and you get a whole bunch of errors trying to open config file, and VS.NET fails (with a &#8220;please reinstall&#8221; error). Problem solved, although&nbsp;I had no luck finding any docs on this issue&#8230;</span>&nbsp;
</div>