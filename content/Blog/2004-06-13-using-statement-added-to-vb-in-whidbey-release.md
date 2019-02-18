Scott Watermasysk blogs about the new &#8216;Using&#8217; statement in VB.NET 2005&#8230; 

> **[Using in VB.NET](http://scottwater.com/blog/archive/2004/06/08/12091.aspx)**  
> _I have not touched VB.NET since early in .NET Beta 1, so I am a bit rusty. One thing I was happy to find is support for using statements in VB.NET 2005. It took me a try or two to figure out the syntax, so I figured I would post it here for future reference._
> 
> _Public Class Class1_
> 
> _&nbsp;&nbsp;&nbsp; Public Sub Go()  
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Using sw As StreamWriter = New StreamWriter(&#8220;C:\hey.txt&#8221;)  
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; sw.Write(&#8220;HEY&#8221;)  
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; End Using  
> &nbsp;&nbsp;&nbsp; End Sub_
> 
> _End Class_
> 
> _via_ [_MSDN_](http://msdn.microsoft.com/library/default.asp?url=/library/en-us/csspec/html/vclrfcsharpspec_8_13.asp)_: &#8220;The using statement obtains one or more resources, executes a statement, and then disposes of the resource.&#8221;_ 
> 
> _For those unfamailar with a using statement, you can use for classes which implement IDisposable. As soon as the variable defined in the using section goes out of scope, Dispose is called._ 
> 
> <div>
>
> </div></p> 

In VB.NET 2003 or 2002, you can get the same effect with this style of code 

<pre><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="FONT-WEIGHT: 400; FONT-SIZE: 12px; COLOR: #0000ff; FONT-FAMILY: Courier New">Dim</span><span> sw </span><span style="FONT-WEIGHT: 400; FONT-SIZE: 12px; COLOR: #0000ff; FONT-FAMILY: Courier New">as</span><span> </span><span style="FONT-WEIGHT: 400; FONT-SIZE: 12px; COLOR: #0000ff; FONT-FAMILY: Courier New">New</span><span> StreamWriter(</span><span style="FONT-WEIGHT: 400; FONT-SIZE: 12px; COLOR: #ff0000; FONT-FAMILY: Courier New">"C:\hey.txt"</span><span>)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="FONT-WEIGHT: 400; FONT-SIZE: 12px; COLOR: #0000ff; FONT-FAMILY: Courier New">Try</span><span>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; sw.</span><span style="FONT-WEIGHT: 400; FONT-SIZE: 12px; COLOR: #0000ff; FONT-FAMILY: Courier New">Write</span><span>(</span><span style="FONT-WEIGHT: 400; FONT-SIZE: 12px; COLOR: #ff0000; FONT-FAMILY: Courier New">"HEY"</span><span>)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="FONT-WEIGHT: 400; FONT-SIZE: 12px; COLOR: #0000ff; FONT-FAMILY: Courier New">Finally</span><span>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; sw.Dispose()
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="FONT-WEIGHT: 400; FONT-SIZE: 12px; COLOR: #0000ff; FONT-FAMILY: Courier New">End</span><span> </span><span style="FONT-WEIGHT: 400; FONT-SIZE: 12px; COLOR: #0000ff; FONT-FAMILY: Courier New">Try</span><span>
</span>
</pre>