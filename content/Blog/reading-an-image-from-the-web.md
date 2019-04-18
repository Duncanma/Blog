---
date: 2003-11-17T10:57:00+00:00
title: Reading An Image from the web...
type: posts
---
Nothing amazingly difficult about this task, but it was [an interesting GotDotNet question posted today](http://www.gotdotnet.com/Community/MessageBoard/Thread.aspx?id=164268&Page=1#164357) so I thought I would answer it here;

Glenn Holden asks how to turn this file based function into one for images stored at http addresses...

> Protected Shared Function GetImageFromFile(ByVal FileName As String) As Byte()

>     Dim myFile As String = FileName

>     Dim fs As FileStream = New FileStream(myFile, FileMode.Open, FileAccess.Read)

>     Dim br As BinaryReader = New BinaryReader(fs)

>     Dim bytesize As Long = fs.Length

>     ReDim GetImageFromFile(bytesize)

>     GetImageFromFile = br.ReadBytes(bytesize)

> End Function

So, I produced this;

> Function GetImageFromURL(ByVal url As String) As Byte()

>     Dim wr As HttpWebRequest = _

>        DirectCast(WebRequest.Create(url), HttpWebRequest)

>     Dim wresponse As HttpWebResponse = _

>        DirectCast(wr.GetResponse, HttpWebResponse)

>     Dim responseStream As Stream = wresponse.GetResponseStream

>     Dim br As BinaryReader = New BinaryReader(responseStream)

>     Dim bytesize As Long = wresponse.ContentLength

>     Return br.ReadBytes(bytesize)

> End Function

with a bit of test code thrown into a button.....

> Private Sub Button1_Click(ByVal sender As System.Object, _

>     ByVal e As System.EventArgs) Handles Button1.Click

>     Dim img As New Bitmap( _

>        New IO.MemoryStream( _

>         GetImageFromURL( _

>         <font color="Red" family="Microsoft Sans Serif">"http://msdn.microsoft.com/longhorn/art/codenameLonghorn.JPG") _

>         ))

>     Me.BackgroundImage = img

> End Sub

A generalized solution that will accept file paths or URIs and automatically determine how to retrieve the stream would likely be useful, but I think this will do for Glenn...

_Markup provided by [Darren Neimke's](http://weblogs.asp.net/dneimke) [cool markup sample from MSDN](http://msdn.microsoft.com/vbasic/default.aspx?pull=/library/en-us/dv_vstechart/html/vbmarkup.asp)_

<div class="media">
  ([Listening To](http://msdn.microsoft.com/library/en-us/dncodefun/html/code4fun04252003.asp): Pets [[Porno For Pyros](http://www.windowsmedia.com/mg/search.asp?srch=Porno+For+Pyros) / Big Shiny 90's])
</div>
