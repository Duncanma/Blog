Nothing amazingly difficult about this task, but it was [an interesting GotDotNet question posted today](http://www.gotdotnet.com/Community/MessageBoard/Thread.aspx?id=164268&Page=1#164357) so I thought I would answer it here;

Glenn Holden asks how to turn this file based function into one for images stored at http addresses...

> <font color="Blue" family="Microsoft Sans Serif">Protected <font color="Blue" family="Microsoft Sans Serif">Shared <font color="Blue" family="Microsoft Sans Serif">Function GetImageFromFile(<font color="Blue" family="Microsoft Sans Serif">ByVal FileName <font color="Blue" family="Microsoft Sans Serif">As <font color="Blue" family="Microsoft Sans Serif">String) <font color="Blue" family="Microsoft Sans Serif">As <font color="Blue" family="Microsoft Sans Serif">Byte()

>     <font color="Blue" family="Microsoft Sans Serif">Dim myFile <font color="Blue" family="Microsoft Sans Serif">As <font color="Blue" family="Microsoft Sans Serif">String = FileName

>     <font color="Blue" family="Microsoft Sans Serif">Dim fs <font color="Blue" family="Microsoft Sans Serif">As FileStream = <font color="Blue" family="Microsoft Sans Serif">New FileStream(myFile, FileMode.Open, FileAccess.Read)

>     <font color="Blue" family="Microsoft Sans Serif">Dim br <font color="Blue" family="Microsoft Sans Serif">As BinaryReader = <font color="Blue" family="Microsoft Sans Serif">New BinaryReader(fs)

>     <font color="Blue" family="Microsoft Sans Serif">Dim bytesize <font color="Blue" family="Microsoft Sans Serif">As <font color="Blue" family="Microsoft Sans Serif">Long = fs.Length

>     <font color="Blue" family="Microsoft Sans Serif">ReDim GetImageFromFile(bytesize)

>     GetImageFromFile = br.ReadBytes(bytesize)

> <font color="Blue" family="Microsoft Sans Serif">End <font color="Blue" family="Microsoft Sans Serif">Function

So, I produced this;

> <font color="Blue" family="Microsoft Sans Serif">Function GetImageFromURL(<font color="Blue" family="Microsoft Sans Serif">ByVal url <font color="Blue" family="Microsoft Sans Serif">As <font color="Blue" family="Microsoft Sans Serif">String) <font color="Blue" family="Microsoft Sans Serif">As <font color="Blue" family="Microsoft Sans Serif">Byte()

>     <font color="Blue" family="Microsoft Sans Serif">Dim wr <font color="Blue" family="Microsoft Sans Serif">As HttpWebRequest = _

>        <font color="Blue" family="Microsoft Sans Serif">DirectCast(WebRequest.Create(url), HttpWebRequest)

>     <font color="Blue" family="Microsoft Sans Serif">Dim wresponse <font color="Blue" family="Microsoft Sans Serif">As HttpWebResponse = _

>        <font color="Blue" family="Microsoft Sans Serif">DirectCast(wr.GetResponse, HttpWebResponse)

>     <font color="Blue" family="Microsoft Sans Serif">Dim responseStream <font color="Blue" family="Microsoft Sans Serif">As Stream = wresponse.GetResponseStream

>     <font color="Blue" family="Microsoft Sans Serif">Dim br <font color="Blue" family="Microsoft Sans Serif">As BinaryReader = <font color="Blue" family="Microsoft Sans Serif">New BinaryReader(responseStream)

>     <font color="Blue" family="Microsoft Sans Serif">Dim bytesize <font color="Blue" family="Microsoft Sans Serif">As <font color="Blue" family="Microsoft Sans Serif">Long = wresponse.ContentLength

>     <font color="Blue" family="Microsoft Sans Serif">Return br.ReadBytes(bytesize)

> <font color="Blue" family="Microsoft Sans Serif">End <font color="Blue" family="Microsoft Sans Serif">Function

with a bit of test code thrown into a button.....

> <font color="Blue" family="Microsoft Sans Serif">Private <font color="Blue" family="Microsoft Sans Serif">Sub Button1_Click(<font color="Blue" family="Microsoft Sans Serif">ByVal sender <font color="Blue" family="Microsoft Sans Serif">As System.<font color="Blue" family="Microsoft Sans Serif">Object, _

>     <font color="Blue" family="Microsoft Sans Serif">ByVal e <font color="Blue" family="Microsoft Sans Serif">As System.EventArgs) <font color="Blue" family="Microsoft Sans Serif">Handles Button1.Click

>     <font color="Blue" family="Microsoft Sans Serif">Dim img <font color="Blue" family="Microsoft Sans Serif">As <font color="Blue" family="Microsoft Sans Serif">New Bitmap( _

>        <font color="Blue" family="Microsoft Sans Serif">New IO.MemoryStream( _

>         GetImageFromURL( _

>         <font color="Red" family="Microsoft Sans Serif">"http://msdn.microsoft.com/longhorn/art/codenameLonghorn.JPG") _

>         ))

>     <font color="Blue" family="Microsoft Sans Serif">Me.BackgroundImage = img

> <font color="Blue" family="Microsoft Sans Serif">End <font color="Blue" family="Microsoft Sans Serif">Sub

A generalized solution that will accept file paths or URIs and automatically determine how to retrieve the stream would likely be useful, but I think this will do for Glenn...

_Markup provided by [Darren Neimke's](http://weblogs.asp.net/dneimke) [cool markup sample from MSDN](http://msdn.microsoft.com/vbasic/default.aspx?pull=/library/en-us/dv_vstechart/html/vbmarkup.asp)_

<div class="media">
  ([Listening To](http://msdn.microsoft.com/library/en-us/dncodefun/html/code4fun04252003.asp): Pets [[Porno For Pyros](http://www.windowsmedia.com/mg/search.asp?srch=Porno+For+Pyros) / Big Shiny 90's])
</div>