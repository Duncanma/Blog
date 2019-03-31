---
date: 2004-07-19T13:18:00+00:00
title: Stuck on a problem opening vbproj or csproj files...
type: posts
---
On my home dev box I couldn't seem to open any of my projects (VB or C#), and whenever I tried I got this useful error;

<blockquote dir="ltr" style="MARGIN-RIGHT: 0px">

    The application for project 'C:\Documents and Settings\Duncanma\My Documents\Visual Studio Projects\ConsoleApplication1\ConsoleApplication1.vbproj' is not installed.



    Make sure the application for the project type (.vbproj) is installed.

</blockquote>

All I could find on the internet was the suggestion that I must have just C# Standard installed and therefore didn't have VB available... but that wasn't it (I have VS.NET Enterprise installed)... I was basically out of luck until I finally found [this newsgroup discussion](http://www.dotnet247.com/247reference/msgs/50/251462.aspx) through .NET 247 ([link](http://www.dotnet247.com/247reference/msgs/50/251462.aspx)). Even though I had completely uninstalled VS.NET and reinstalled, I followed the reinstall instructions from Mark Smith in that newsgroup post and it worked perfectly. It is possible that uninstalling and reinstalling the .NET Framework SDK would have done this for me as well (I wasn't doing that in my normal reinstalls, I was only dealing with VS.NET 2003), but Mark's solution was easy to try out and it worked...

Anyway, if you run into this problem... try following [those steps](http://www.dotnet247.com/247reference/msgs/50/251462.aspx) and see if that helps!! If that fails, I'd considering calling PSS directly.
