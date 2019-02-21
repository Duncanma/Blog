---
date: 2003-10-06T11:42:00+00:00
title: Feeling the Cache Love
type: posts
---
I've been working on the business and data layers for a web system and, as you might expect, I've been making quite a bit of use of ASP.NET's caching system. Now, to test the business layer, I had gone ahead and set up a non-ASP.NET caching system as well using my standard method for caching in Windows applications, a static hashtable with strongly typed string keys (works well, fairly compatible with the ASP.NET cache so it is easy to move code between the two models) but then I realized that I could just use the ASP.NET cache even when my code was being used from a Windows Forms applications (for my class libraries, where I don't know what type of interface is being used) and it works just fine. 

<font face="'Courier New',Courier,monospace">Shared Function GetValueFromCache( _        ByVal key As String) As Object    Dim myContext As HttpContext    myContext = HttpContext.Current 


      If myContext Is Nothing Then        Return HttpRuntime.Cache.Get(key)    Else        Return myContext.Cache.Get(key)    End IfEnd Function



  Shared Sub PlaceValueIntoCache( _    ByVal key As String, _    ByVal item As Object, _    ByVal cacheDuration As Integer)    Dim myContext As HttpContext    myContext = HttpContext.Current    Dim myCache As Caching.Cache



      If myContext Is Nothing Then        myCache = HttpRuntime.Cache    Else        myCache = myContext.Cache    End If



      myCache.Insert(key, item, Nothing, _    Now.AddSeconds(cacheDuration), _    Caching.Cache.NoSlidingExpiration)End Sub



  This might be common knowledge, but I have been handling my own non-ASP.NET caching all on my own, and this just makes it too easy. In fact, it makes it so easy that I started thinking of ways to perform even more caching in some of my Windows Forms applications... I can see many performance gains in my future!
