I&#8217;ve been working on the business and data layers for a web system and, as you might expect, I&#8217;ve been making quite a bit of use of ASP.NET&#8217;s caching system. Now, to test the business layer, I had gone ahead and set up a non-ASP.NET caching system as well using my standard method for caching in Windows applications, a static hashtable with strongly typed string keys (works well, fairly compatible with the ASP.NET cache so it is easy to move code between the two models) but then I realized that I could just use the ASP.NET cache even when my code was being used from a Windows Forms applications (for my class libraries, where I don&#8217;t know what type of interface is being used) and it works just fine. 

<font face="'Courier New',Courier,monospace">Shared Function GetValueFromCache( _<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ByVal key As String) As Object<br />&nbsp;&nbsp;&nbsp;&nbsp;Dim myContext As HttpContext<br />&nbsp;&nbsp;&nbsp;&nbsp;myContext = HttpContext.Current</p> 

<p>
  &nbsp;&nbsp;&nbsp;&nbsp;If myContext Is Nothing Then<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Return HttpRuntime.Cache.Get(key)<br />&nbsp;&nbsp;&nbsp;&nbsp;Else<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Return myContext.Cache.Get(key)<br />&nbsp;&nbsp;&nbsp;&nbsp;End If<br />End Function
</p>

<p>
  Shared Sub PlaceValueIntoCache( _<br />&nbsp;&nbsp;&nbsp;&nbsp;ByVal key As String, _<br />&nbsp;&nbsp;&nbsp;&nbsp;ByVal item As Object, _<br />&nbsp;&nbsp;&nbsp;&nbsp;ByVal cacheDuration As Integer)<br />&nbsp;&nbsp;&nbsp;&nbsp;Dim myContext As HttpContext<br />&nbsp;&nbsp;&nbsp;&nbsp;myContext = HttpContext.Current<br />&nbsp;&nbsp;&nbsp;&nbsp;Dim myCache As Caching.Cache
</p>

<p>
  &nbsp;&nbsp;&nbsp;&nbsp;If myContext Is Nothing Then<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;myCache = HttpRuntime.Cache<br />&nbsp;&nbsp;&nbsp;&nbsp;Else<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;myCache = myContext.Cache<br />&nbsp;&nbsp;&nbsp;&nbsp;End If
</p>

<p>
  &nbsp;&nbsp;&nbsp;&nbsp;myCache.Insert(key, item, Nothing, _<br />&nbsp;&nbsp;&nbsp;&nbsp;Now.AddSeconds(cacheDuration), _<br />&nbsp;&nbsp;&nbsp;&nbsp;Caching.Cache.NoSlidingExpiration)<br />End Sub<br /></font>
</p>

<p>
  This might be common knowledge, but I have been handling my own non-ASP.NET caching all on my own, and this just makes it too easy. In fact, it makes it so easy that I started thinking of ways to perform even more caching in some of my Windows Forms applications&#8230; I can see many performance gains in my future!
</p>