<font face="Trebuchet MS" color="teal">I didn&#8217;t write it<br /> (Peter Hallam did), but I was just using it and thought &#8220;wow, this is cool, it<br /> needs to be found by more people!&#8221;</font> 

<font face="Trebuchet MS" color="teal">If you build console apps that take<br /> multiple arguments (generate.exe /vroot:vbasic /target:c:\files\ &#8230; etc.) then<br /> </font>[<font face="Trebuchet MS" color="teal">this</font>](http://www.gotdotnet.com/Community/UserSamples/Details.aspx?SampleGuid=62a0f27e-274e-4228-ba7f-bc0118ecc41e){.broken_link} <font face="Trebuchet MS" color="teal">makes it very easy. To use it, just compile the provided code into a<br /> library and reference from your own C#, VB.NET, etc. application.</font>

<font face="Trebuchet MS" color="teal">From the readme;</font>

<blockquote dir="ltr" style="MARGIN-RIGHT: 0px">
  <p>
    <font face="Courier New"><a href="http://www.gotdotnet.com/Community/UserSamples/Details.aspx?SampleGuid=62a0f27e-274e-4228-ba7f-bc0118ecc41e" class="broken_link">Command<br /> Line Argument Parser</a><br />&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;-</font>
  </p>
  
  <p>
    <font face="Courier New">Author: </font><a href="mailto:peterhal@microsoft.com"><font face="Courier New">peterhal@microsoft.com</font></a>
  </p>
  
  <p>
    <font face="Courier New">Parsing command line arguments to a console<br /> application is a common problem. <br />This library handles the common task of<br /> reading arguments from a command line <br />and filling in the values in a<br /> type.</font>
  </p>
  
  <p>
    <font face="Courier New">To use this library, define a class whose fields<br /> represent the data that your <br />application wants to receive from arguments<br /> on the command line. Then call<br /> <br />Utilities.Utility.ParseCommandLineArguments() to fill the object with the<br /> data <br />from the command line. Each field in the class defines a command line<br /> argument. <br />The type of the field is used to validate the data read from the<br /> command line. <br />The name of the field defines the name of the command line<br /> option.</font>
  </p>
  
  <p>
    <font face="Courier New">The parser can handle fields of the following<br /> types:</font>
  </p>
  
  <p>
    <font face="Courier New">&#8211; string<br />&#8211; int<br />&#8211; uint<br />&#8211; bool<br />&#8211;<br /> enum<br />&#8211; array of the above type</font>
  </p>
</blockquote>

&nbsp;