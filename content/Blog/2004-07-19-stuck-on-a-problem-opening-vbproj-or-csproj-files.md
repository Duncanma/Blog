On my home dev box I couldn&#8217;t seem to open any of my projects (VB or C#), and whenever I tried I got this useful error;

<blockquote dir="ltr" style="MARGIN-RIGHT: 0px">
  <p>
    The application for project &#8216;C:\Documents and Settings\Duncanma\My Documents\Visual Studio Projects\ConsoleApplication1\ConsoleApplication1.vbproj&#8217; is not installed.
  </p>
  
  <p>
    Make sure the application for the project type (.vbproj) is installed.
  </p>
</blockquote>

All I could find on the internet was the suggestion that I must have just C# Standard installed and therefore didn&#8217;t have VB available&#8230; but that wasn&#8217;t it (I have VS.NET Enterprise installed)&#8230; I was basically out of luck until I finally found [this newsgroup discussion](http://www.dotnet247.com/247reference/msgs/50/251462.aspx) through .NET 247 ([link](http://www.dotnet247.com/247reference/msgs/50/251462.aspx)). Even though I had completely uninstalled VS.NET and reinstalled, I followed the reinstall instructions from Mark Smith in that newsgroup post and it worked perfectly. It is possible that uninstalling and reinstalling the .NET Framework SDK would have done this for me as well (I wasn&#8217;t doing that in my normal reinstalls, I was only dealing with VS.NET 2003), but Mark&#8217;s solution was easy to try out and it worked&#8230;

Anyway, if you run into this problem&#8230; try following [those steps](http://www.dotnet247.com/247reference/msgs/50/251462.aspx) and see if that helps!! If that fails, I&#8217;d considering calling PSS directly.