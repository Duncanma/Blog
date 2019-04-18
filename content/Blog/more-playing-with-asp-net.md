---
date: 2004-06-12T10:58:00+00:00
title: More playing with ASP.NET
type: posts
tags:
 - Coding
---
As with my earlier messing around with a poll, I took a concept from the [www.asp.net](http://www.asp.net/) site today and made my own "CheckDotNet.aspx" page. The one on [www.asp.net](http://www.asp.net/) only checks for the .NET Framework 1.0 or better, so I modified the logic to detect 1.1 and 1.0 as two distinct cases... recommending an upgrade for no framework or 1.0, and returning "Framework Found" if you have 1.1 already.

<http://www.duncanmackenzie.net/tools/checkdotnet.aspx>

Difficult? Nope... nothing too impressive...

Useful? I have no idea, but I thought it was worth putting up. The page has only one bit of code, the load event handler (and yes, I know I could have overriden OnLoad... but the code I started with was using Page_Load, so I just went with it)...

```vb
     Sub Page_Load(sender as Object, e as EventArgs)
        Dim clrVersion as Version = Request.Browser.ClrVersion
        If clrVersion.Major > 0 Then
         If clrVersion.Minor > 0 Then
             aOkPanel11.Visible = True
         Else
             aOkPanel1.Visible = True
         End If
        Else
            downloadPanel.Visible = True
        End If
     End Sub
```

`aOkPanel11` on my page contains the text to show if the user has the 1.1 version of the Framework... `aOkPanel1` is shown if they have 1.0 only, and `downloadPanel` appears if they have no Framework at all.

_Ouch... I guess I was porting/modifying that code way too quickly... goofed up the logic in a bunch of ways (thanks for the comments folks!)... at the risk of trying again and **still** screwing it up... here is another try at that routine;_

```vb
    Sub Page_Load(sender as Object, e as EventArgs)
        Dim clrVersion as Version = Request.Browser.ClrVersion
        if clrVersion.Major = 1 Then
         if clrVersion.Minor > = 1 Then
             '1.1 or better, but less than 2.0
             aOkPanel11.Visible = true
         ElseIf clrVersion.Minor = 0 Then
             'only 1.0
             aOkPanel1.Visible = true
         end if
        elseif clrVersion.Major > 1 Then
            '2.x or greater... could have its own panel
            'but showing the 1.1 panel is probably the next
            'best thing...
            aOkPanel11.Visible = true
        else
            'anything else... should display for
            '< 1.0 or nothing...
            downloadPanel.Visible = true
        end if

    end sub
```

Also, in the html of the aOkPanel11, which can appear for the .NET Framework 1.1 or greater... I changed the text to reflect this possibility and added `<%Response.Write(Request.Browser.ClrVersion)%>`

_hopefully, this 'release' works better than the last one 🙂_

