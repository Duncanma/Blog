---
date: 2004-06-05T10:47:00+00:00
title: Early & Adopter fill you in on "Application Level Events"
type: posts
---
The [3 Leaf](http://www.3leaf.com/) guys, (well probably just one of them... but who knows which one), talk about ["Application Level Events" in Whidbey](http://ea.3leaf.com/2004/06/application_lev.html)

Here's a code snippet to illustrate what they are talking about... something that I like to think of as "Global.asa" (I haven't done a lot of web work since ASP) for Windows applications...

```vb
Namespace My
    Partial Friend Class MyApplication
        Private Sub MyApplication_Shutdown(ByVal Sender As Object, _
            ByVal e As System.Windows.Forms.ShutdownEventArgs) _
            Handles Me.Shutdown
        End Sub
        Private Sub MyApplication_StartUp(ByVal sender As Object, _
            ByVal e As System.Windows.Forms.StartupEventArgs) _
            Handles Me.Startup
        End Sub
        Private Sub MyApplication_StartupNextInstance(ByVal Sender As Object, _
            ByVal e As System.Windows.Forms.StartupNextInstanceEventArgs) _
            Handles Me.StartupNextInstance
        End Sub
        Private Sub MyApplication_UnhandledException(ByVal sender As Object, _
            ByVal e As System.Threading.ThreadExceptionEventArgs) _
            Handles Me.UnhandledException
        End Sub
    End Class
End Namespace
```

Make sure you check out [the whole post](http://ea.3leaf.com/2004/06/application_lev.html) for a pretty screenshot 🙂
