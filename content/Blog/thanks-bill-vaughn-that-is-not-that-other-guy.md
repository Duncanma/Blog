---
date: 2004-07-22T09:27:00+00:00
title: Thanks Bill&#8230; Vaughn that is, not that other guy&#8230;
type: posts
---
I noticed yesterday that my poll wasn't showing the question on the top of the list of choices, or the list of results. Viewing the source made it pretty obvious the <asp:label> was rendering, but that it was empty. Checking my code everything seemed fine, but when I retrieved the poll details through a Stored Proc I was using an Output param for the question text and it was always blank. Well, I knew there was an entire article on MSDN on this exact topic... and a quick search on “Vaughn” on MSDN took me right to the article I knew would show me exactly what I needed to do.

<blockquote dir="ltr" style="MARGIN-RIGHT: 0px">
  <h4>
    [Retrieving the Gazoutas: Understanding SQL Server Return Codes and Output Parameters](http://msdn.microsoft.com/vbasic/default.aspx?pull=/library/en-us/dnadonet/html/gazoutas.asp)
  </h4>


    William Vaughn<b>Summary:</b> Discusses how to capture, interrupt, and handle resultsets and rowsets, as well as the extra information that they return when executing a Microsoft SQL Server query. (7 printed pages)

</blockquote>

Yep... turns out I had goofed up, I was calling the stored proc with ExecuteReader, but I was trying to read those params before I had closed the data reader. So I made one change to my code;

<blockquote dir="ltr" style="MARGIN-RIGHT: 0px">
  <pre><font color="blue" family="Microsoft Sans Serif">Dim dr <font color="blue" family="Microsoft Sans Serif">As SqlDataReader = _
    cmdGetPollDetails.ExecuteReader( _
    CommandBehavior.CloseConnection)
<font color="blue" family="Microsoft Sans Serif">If dr.HasRows <font color="blue" family="Microsoft Sans Serif">Then
    <font color="blue" family="Microsoft Sans Serif">Dim po <font color="blue" family="Microsoft Sans Serif">As PollOption
    <font color="blue" family="Microsoft Sans Serif">Do <font color="blue" family="Microsoft Sans Serif">While dr.Read
        po = <font color="blue" family="Microsoft Sans Serif">New PollOption
        po.OptionID = dr.GetInt32(0)
        po.OptionText = dr.GetString(1)
        result.Options.<font color="blue" family="Microsoft Sans Serif">Add(po)
    <font color="blue" family="Microsoft Sans Serif">Loop
    result.ID = pollID
    result.Name = <font color="blue" family="Microsoft Sans Serif">CStr( _
        cmdGetPollDetails.Parameters(<font color="red" family="Microsoft Sans Serif">"@PollName").Value)
    result.Question = <font color="blue" family="Microsoft Sans Serif">CStr( _
        cmdGetPollDetails.Parameters(<font color="red" family="Microsoft Sans Serif">"@PollQuestion").Value)
    dr.Close()
    <font color="blue" family="Microsoft Sans Serif">Return result
<font color="blue" family="Microsoft Sans Serif">Else
    dr.Close()
    <font color="blue" family="Microsoft Sans Serif">Return <font color="blue" family="Microsoft Sans Serif">Nothing
<font color="blue" family="Microsoft Sans Serif">End <font color="blue" family="Microsoft Sans Serif">If
</pre>
</blockquote>

I just moved the dr.Close( ) up to right after the end of the Do loop...

<pre><font color="blue" family="Microsoft Sans Serif">Loop
    dr.Close()
    result.ID = pollID
    result.Name = <font color="blue" family="Microsoft Sans Serif">CStr( _
        cmdGetPollDetails.Parameters(<font color="red" family="Microsoft Sans Serif">"@PollName").Value)
    result.Question = <font color="blue" family="Microsoft Sans Serif">CStr( _
        cmdGetPollDetails.Parameters(<font color="red" family="Microsoft Sans Serif">"@PollQuestion").Value)
    <font color="blue" family="Microsoft Sans Serif">Return result
</pre>

<pre> </pre>
