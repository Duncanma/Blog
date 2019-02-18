I noticed yesterday that my poll wasn&#8217;t showing the question on the top of the list of choices, or the list of results. Viewing the source made it pretty obvious the <asp:label> was rendering, but that it was empty. Checking my code everything seemed fine, but when I retrieved the poll details through a Stored Proc I was using an Output param for the question text and it was always blank.&nbsp;Well, I knew there was an entire article on MSDN on this exact topic&#8230; and a quick search on “Vaughn” on MSDN took me right to the article I knew would show me exactly what I needed to do.

<blockquote dir="ltr" style="MARGIN-RIGHT: 0px">
  <h4>
    <a href="http://msdn.microsoft.com/vbasic/default.aspx?pull=/library/en-us/dnadonet/html/gazoutas.asp">Retrieving the Gazoutas: Understanding SQL Server Return Codes and Output Parameters</a>
  </h4>
  
  <p>
    William Vaughn<br /><b><br />Summary:</b> Discusses how to capture, interrupt, and handle resultsets and rowsets, as well as the extra information that they return when executing a Microsoft SQL Server query. (7 printed pages)
  </p>
</blockquote>

Yep&#8230; turns out I had goofed up, I was calling the stored proc with ExecuteReader, but I was trying to read those params before I had closed the data reader. So I made one change to my code;

<blockquote dir="ltr" style="MARGIN-RIGHT: 0px">
  <pre><font color="blue" family="Microsoft Sans Serif">Dim</font> dr <font color="blue" family="Microsoft Sans Serif">As</font> SqlDataReader = _
    cmdGetPollDetails.ExecuteReader( _
    CommandBehavior.CloseConnection)
<font color="blue" family="Microsoft Sans Serif">If</font> dr.HasRows <font color="blue" family="Microsoft Sans Serif">Then</font>
    <font color="blue" family="Microsoft Sans Serif">Dim</font> po <font color="blue" family="Microsoft Sans Serif">As</font> PollOption
    <font color="blue" family="Microsoft Sans Serif">Do</font> <font color="blue" family="Microsoft Sans Serif">While</font> dr.Read
        po = <font color="blue" family="Microsoft Sans Serif">New</font> PollOption
        po.OptionID = dr.GetInt32(0)
        po.OptionText = dr.GetString(1)
        result.Options.<font color="blue" family="Microsoft Sans Serif">Add</font>(po)
    <font color="blue" family="Microsoft Sans Serif">Loop</font>
    result.ID = pollID
    result.Name = <font color="blue" family="Microsoft Sans Serif">CStr</font>( _
        cmdGetPollDetails.Parameters(<font color="red" family="Microsoft Sans Serif">"@PollName"</font>).Value)
    result.Question = <font color="blue" family="Microsoft Sans Serif">CStr</font>( _
        cmdGetPollDetails.Parameters(<font color="red" family="Microsoft Sans Serif">"@PollQuestion"</font>).Value)
    dr.Close()
    <font color="blue" family="Microsoft Sans Serif">Return</font> result
<font color="blue" family="Microsoft Sans Serif">Else</font>
    dr.Close()
    <font color="blue" family="Microsoft Sans Serif">Return</font> <font color="blue" family="Microsoft Sans Serif">Nothing</font>
<font color="blue" family="Microsoft Sans Serif">End</font> <font color="blue" family="Microsoft Sans Serif">If</font>
</pre>
</blockquote>

I just moved the dr.Close( ) up to right after the end of the Do loop&#8230;

<pre><font color="blue" family="Microsoft Sans Serif">Loop</font>
    dr.Close()
    result.ID = pollID
    result.Name = <font color="blue" family="Microsoft Sans Serif">CStr</font>( _
        cmdGetPollDetails.Parameters(<font color="red" family="Microsoft Sans Serif">"@PollName"</font>).Value)
    result.Question = <font color="blue" family="Microsoft Sans Serif">CStr</font>( _
        cmdGetPollDetails.Parameters(<font color="red" family="Microsoft Sans Serif">"@PollQuestion"</font>).Value)
    <font color="blue" family="Microsoft Sans Serif">Return</font> result
</pre>

<pre>&nbsp;</pre>