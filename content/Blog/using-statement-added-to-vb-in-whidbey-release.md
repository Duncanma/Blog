---
date: 2004-06-13T04:40:00+00:00
title: 'Using statement added to VB in Whidbey release...'
type: posts
---
Scott Watermasysk blogs about the new 'Using' statement in VB.NET 2005...

> **[Using in VB.NET](http://scottwater.com/blog/archive/2004/06/08/12091.aspx)**
> _I have not touched VB.NET since early in .NET Beta 1, so I am a bit rusty. One thing I was happy to find is support for using statements in VB.NET 2005. It took me a try or two to figure out the syntax, so I figured I would post it here for future reference._
>
> _Public Class Class1_
>
>     Public Sub Go()
>         Using sw As StreamWriter = New StreamWriter("C:\hey.txt")
>             sw.Write("HEY")
>         End Using
>     End Sub_
>
> _End Class_
>
> _via_ [_MSDN_](http://msdn.microsoft.com/library/default.asp?url=/library/en-us/csspec/html/vclrfcsharpspec_8_13.asp)_: "The using statement obtains one or more resources, executes a statement, and then disposes of the resource."_
>
> _For those unfamiliar with a using statement, you can use for classes which implement IDisposable. As soon as the variable defined in the using section goes out of scope, Dispose is called._
>

In VB.NET 2003 or 2002, you can get the same effect with this style of code

```vb
Dim sw as New StreamWriter("C:\hey.txt")
Try
    sw.Write("HEY")
Finally
    sw.Dispose()
End Try
```
