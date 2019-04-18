---
date: 2004-07-22T09:27:00+00:00
title: Thanks Bill... Vaughn that is, not that other guy...
type: posts
tags:
 - Coding
---
I noticed yesterday that my poll wasn't showing the question on the top of the list of choices, or the list of results. Viewing the source made it pretty obvious the `<asp:label>` was rendering, but that it was empty. Checking my code everything seemed fine, but when I retrieved the poll details through a Stored Proc I was using an Output param for the question text and it was always blank. Well, I knew there was an entire article on MSDN on this exact topic... and a quick search on “Vaughn” on MSDN took me right to the article I knew would show me exactly what I needed to do.

[Retrieving the Gazoutas: Understanding SQL Server Return Codes and Output Parameters](http://msdn.microsoft.com/vbasic/default.aspx?pull=/library/en-us/dnadonet/html/gazoutas.asp) by William Vaughn -- Discusses how to capture, interrupt, and handle resultsets and rowsets, as well as the extra information that they return when executing a Microsoft SQL Server query.

Yep... turns out I had goofed up, I was calling the stored proc with ExecuteReader, but I was trying to read those params before I had closed the data reader. So I made one change to my code;

```vb
Dim dr As SqlDataReader = _
    cmdGetPollDetails.ExecuteReader( _
    CommandBehavior.CloseConnection)
If dr.HasRows Then
    Dim po As PollOption
    Do While dr.Read
        po = New PollOption
        po.OptionID = dr.GetInt32(0)
        po.OptionText = dr.GetString(1)
        result.Options.Add(po)
    Loop
    result.ID = pollID
    result.Name = CStr( _
        cmdGetPollDetails.Parameters(<font color="red" family="Microsoft Sans Serif">"@PollName").Value)
    result.Question = CStr( _
        cmdGetPollDetails.Parameters(<font color="red" family="Microsoft Sans Serif">"@PollQuestion").Value)
    dr.Close()
    Return result
Else
    dr.Close()
    Return Nothing
End If
```

I just moved the dr.Close( ) up to right after the end of the Do loop...

```vb
Loop
    dr.Close()
    result.ID = pollID
    result.Name = CStr( _
        cmdGetPollDetails.Parameters(<font color="red" family="Microsoft Sans Serif">"@PollName").Value)
    result.Question = CStr( _
        cmdGetPollDetails.Parameters(<font color="red" family="Microsoft Sans Serif">"@PollQuestion").Value)
    Return result
```
