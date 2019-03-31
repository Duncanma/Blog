---
date: 2004-05-13T10:46:00+00:00
title: Duncan's VS.NET 2003 wouldn't run... and why that is good for you :)
type: posts
---
<div>
  <span>Something must have changed, but I had no idea what it was... but suddenly, existing applications (the same version of which run fine on other machines) were crashing with IO errors, specifically "System.IO.IOException: The device is not ready.".</span>
</div>

<div>
  <span></span>
</div>

<div>
  <span>At the same time, I could no longer open VB projects in VS.NET, or create new VB or C# project ("path not found" for the C# projects, "Project 'project name' could not be opened because the Microsoft Visual Basic .NET compiler could not be created. Please re-install Visual Studio." for my existing VB projects)</span>
</div>

<div>
  <span></span>
</div>

<div>
  <span>Searching found lots of answers, including a KB article, but it (and all the other posts/sites I found) suggested I renamed my .NET Framework directory.... <a title="http://support.microsoft.com/default.aspx?scid=kb;en-us;821790" href="http://support.microsoft.com/default.aspx?scid=kb;en-us;821790">http://support.microsoft.com/default.aspx?scid=kb;en-us;821790</a> ... which I didn't do 🙂</span>
</div>

<div>
  <span></span>
</div>

<div>
  <span>I didn't try reinstalling **because I really wanted to know what was actually going wrong 'behind-the-scences'**, and here is where you benefit... I found out what was causing it, so if it happens to you, you'll know too 🙂</span>
</div>

<div>
  <span></span>
</div>

<div>
  <span>I had a small flash of insight... everything that was failing relies upon xml serialization, which uses temp files ... so I dug around and found that my TEMP and TMP environment variables were pointing to a secondary hard drive **which was no longer there.** (I popped it out to put in my CD drive.... can't run Halo without it)</span>
</div>

<div>
  <span> </span>
</div>

<div align="left">
  <span>So... no temp folder and you get a whole bunch of errors trying to open config file, and VS.NET fails (with a "please reinstall" error). Problem solved, although I had no luck finding any docs on this issue...</span>
</div>
