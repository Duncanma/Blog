Nothing amazingly difficult about this task, but it was <a href="http://www.gotdotnet.com/Community/MessageBoard/Thread.aspx?id=164268&Page=1#164357" target="_blank" class="broken_link">an interesting GotDotNet question posted today</a> so I thought I would answer it here;

Glenn Holden asks how to turn this file based function into one for images stored at http addresses&#8230;

> <font color="Blue" family="Microsoft Sans Serif">Protected</font> <font color="Blue" family="Microsoft Sans Serif">Shared</font> <font color="Blue" family="Microsoft Sans Serif">Function</font> GetImageFromFile(<font color="Blue" family="Microsoft Sans Serif">ByVal</font> FileName <font color="Blue" family="Microsoft Sans Serif">As</font> <font color="Blue" family="Microsoft Sans Serif">String</font>) <font color="Blue" family="Microsoft Sans Serif">As</font> <font color="Blue" family="Microsoft Sans Serif">Byte</font>() 
     
> &nbsp;&nbsp;&nbsp;&nbsp;<font color="Blue" family="Microsoft Sans Serif">Dim</font> myFile <font color="Blue" family="Microsoft Sans Serif">As</font> <font color="Blue" family="Microsoft Sans Serif">String</font> = FileName 
     
> &nbsp;&nbsp;&nbsp;&nbsp;<font color="Blue" family="Microsoft Sans Serif">Dim</font> fs <font color="Blue" family="Microsoft Sans Serif">As</font> FileStream = <font color="Blue" family="Microsoft Sans Serif">New</font> FileStream(myFile, FileMode.Open, FileAccess.Read) 
     
> &nbsp;&nbsp;&nbsp;&nbsp;<font color="Blue" family="Microsoft Sans Serif">Dim</font> br <font color="Blue" family="Microsoft Sans Serif">As</font> BinaryReader = <font color="Blue" family="Microsoft Sans Serif">New</font> BinaryReader(fs) 
     
> &nbsp;&nbsp;&nbsp;&nbsp;<font color="Blue" family="Microsoft Sans Serif">Dim</font> bytesize <font color="Blue" family="Microsoft Sans Serif">As</font> <font color="Blue" family="Microsoft Sans Serif">Long</font> = fs.Length 
     
> &nbsp;&nbsp;&nbsp;&nbsp;<font color="Blue" family="Microsoft Sans Serif">ReDim</font> GetImageFromFile(bytesize) 
     
> &nbsp;&nbsp;&nbsp;&nbsp;GetImageFromFile = br.ReadBytes(bytesize) 
    
> <font color="Blue" family="Microsoft Sans Serif">End</font> <font color="Blue" family="Microsoft Sans Serif">Function</font> 

So, I produced this;

> <font color="Blue" family="Microsoft Sans Serif">Function</font> GetImageFromURL(<font color="Blue" family="Microsoft Sans Serif">ByVal</font> url <font color="Blue" family="Microsoft Sans Serif">As</font> <font color="Blue" family="Microsoft Sans Serif">String</font>) <font color="Blue" family="Microsoft Sans Serif">As</font> <font color="Blue" family="Microsoft Sans Serif">Byte</font>() 
      
> &nbsp;&nbsp;&nbsp;&nbsp;<font color="Blue" family="Microsoft Sans Serif">Dim</font> wr <font color="Blue" family="Microsoft Sans Serif">As</font> HttpWebRequest = _ 
       
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font color="Blue" family="Microsoft Sans Serif">DirectCast</font>(WebRequest.Create(url), HttpWebRequest) 
      
> &nbsp;&nbsp;&nbsp;&nbsp;<font color="Blue" family="Microsoft Sans Serif">Dim</font> wresponse <font color="Blue" family="Microsoft Sans Serif">As</font> HttpWebResponse = _ 
      
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font color="Blue" family="Microsoft Sans Serif">DirectCast</font>(wr.GetResponse, HttpWebResponse) 
      
> &nbsp;&nbsp;&nbsp;&nbsp;<font color="Blue" family="Microsoft Sans Serif">Dim</font> responseStream <font color="Blue" family="Microsoft Sans Serif">As</font> Stream = wresponse.GetResponseStream 
      
> &nbsp;&nbsp;&nbsp;&nbsp;<font color="Blue" family="Microsoft Sans Serif">Dim</font> br <font color="Blue" family="Microsoft Sans Serif">As</font> BinaryReader = <font color="Blue" family="Microsoft Sans Serif">New</font> BinaryReader(responseStream) 
      
> &nbsp;&nbsp;&nbsp;&nbsp;<font color="Blue" family="Microsoft Sans Serif">Dim</font> bytesize <font color="Blue" family="Microsoft Sans Serif">As</font> <font color="Blue" family="Microsoft Sans Serif">Long</font> = wresponse.ContentLength 
      
> &nbsp;&nbsp;&nbsp;&nbsp;<font color="Blue" family="Microsoft Sans Serif">Return</font> br.ReadBytes(bytesize) 
  
> <font color="Blue" family="Microsoft Sans Serif">End</font> <font color="Blue" family="Microsoft Sans Serif">Function</font> 

with a bit of test code thrown into a button&#8230;..

> <font color="Blue" family="Microsoft Sans Serif">Private</font> <font color="Blue" family="Microsoft Sans Serif">Sub</font> Button1_Click(<font color="Blue" family="Microsoft Sans Serif">ByVal</font> sender <font color="Blue" family="Microsoft Sans Serif">As</font> System.<font color="Blue" family="Microsoft Sans Serif">Object</font>, _ 
      
> &nbsp;&nbsp;&nbsp;&nbsp;<font color="Blue" family="Microsoft Sans Serif">ByVal</font> e <font color="Blue" family="Microsoft Sans Serif">As</font> System.EventArgs) <font color="Blue" family="Microsoft Sans Serif">Handles</font> Button1.Click 
      
> &nbsp;&nbsp;&nbsp;&nbsp;<font color="Blue" family="Microsoft Sans Serif">Dim</font> img <font color="Blue" family="Microsoft Sans Serif">As</font> <font color="Blue" family="Microsoft Sans Serif">New</font> Bitmap( _ 
         
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font color="Blue" family="Microsoft Sans Serif">New</font> IO.MemoryStream( _ 
  
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;GetImageFromURL( _ 
  
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font color="Red" family="Microsoft Sans Serif">&#8220;http://msdn.microsoft.com/longhorn/art/codenameLonghorn.JPG&#8221;</font>) _ 
  
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)) 
  
> &nbsp;&nbsp;&nbsp;&nbsp;<font color="Blue" family="Microsoft Sans Serif">Me</font>.BackgroundImage = img 
  
> <font color="Blue" family="Microsoft Sans Serif">End</font> <font color="Blue" family="Microsoft Sans Serif">Sub</font> 

A generalized solution that will accept file paths or URIs and automatically determine how to retrieve the stream would likely be useful, but I think this will do for Glenn&#8230;

_Markup provided by <a href="http://weblogs.asp.net/dneimke" target="_blank">Darren Neimke&#8217;s</a> <a href="http://msdn.microsoft.com/vbasic/default.aspx?pull=/library/en-us/dv_vstechart/html/vbmarkup.asp" target="_blank">cool markup sample from MSDN</a>_

<div class="media">
  (<a href="http://msdn.microsoft.com/library/en-us/dncodefun/html/code4fun04252003.asp" class="broken_link">Listening To</a>: Pets [<a href="http://www.windowsmedia.com/mg/search.asp?srch=Porno+For+Pyros">Porno For Pyros</a> / Big Shiny 90&#8217;s])
</div>