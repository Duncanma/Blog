Every day I get from 1 to 10 emails asking me various VB questions&#8230; some I answer by pointing to a link, some by providing code, and sometimes I just point people to the newsgroups or forums that exist for this type of question&#8230; but this time I thought I&#8217;d just post the question and answer into my blog &#8230;

The Question (edited slightly):

> I just want to ask how to make the string in to proper format..
  
> ex&#8230;
  
> input.
  
> gerald
> 
> this must be the output:
  
> Gerald
> 
> and i want it to interactively change when i&#8217;m inputing a string in a textbox.. 

And the answer is to put this code into the TextChanged event of your textbox;

> <pre><font color="Blue" family="Microsoft Sans Serif">Dim</font> ci <font color="Blue" family="Microsoft Sans Serif">As</font> Globalization.CultureInfo = _
    System.Threading.Thread.CurrentThread.CurrentCulture<br />
<br />
<font color="Blue" family="Microsoft Sans Serif">Private</font> <font color="Blue" family="Microsoft Sans Serif">Sub</font> TextBox1_TextChanged(<font color="Blue" family="Microsoft Sans Serif">ByVal</font> sender <font color="Blue" family="Microsoft Sans Serif">As</font> System.<font color="Blue" family="Microsoft Sans Serif">Object</font>, _<br />
        <font color="Blue" family="Microsoft Sans Serif">ByVal</font> e <font color="Blue" family="Microsoft Sans Serif">As</font> System.EventArgs) <font color="Blue" family="Microsoft Sans Serif">Handles</font> TextBox1.TextChanged<br />
    <font color="Blue" family="Microsoft Sans Serif">Dim</font> pos <font color="Blue" family="Microsoft Sans Serif">As</font> <font color="Blue" family="Microsoft Sans Serif">Integer</font> = TextBox1.SelectionStart<br />
    TextBox1.Text = ci.TextInfo.ToTitleCase(TextBox1.Text)<br />
    <font color="Blue" family="Microsoft Sans Serif">If</font> pos &gt; 0 <font color="Blue" family="Microsoft Sans Serif">AndAlso</font> pos &lt;= TextBox1.Text.Length <font color="Blue" family="Microsoft Sans Serif">Then</font><br />
        TextBox1.SelectionStart = pos<br />
    <font color="Blue" family="Microsoft Sans Serif">End</font> <font color="Blue" family="Microsoft Sans Serif">If</font><br />
<font color="Blue" family="Microsoft Sans Serif">End</font> <font color="Blue" family="Microsoft Sans Serif">Sub</font><br />
</pre>

The key is that the **<a href="http://msdn.microsoft.com/library/en-us/cpref/html/frlrfSystemGlobalizationCultureInfoClassTopic.asp" target="_blank" class="broken_link">CultureInfo</a>** class provides a **<a href="http://msdn.microsoft.com/library/default.asp?url=/library/en-us/cpref/html/frlrfsystemglobalizationtextinfoclasstopic.asp" target="_blank">TextInfo</a>** instance, which in turn has a method of &#8220;**ToTitleCase**&#8221; on it&#8230; <a href="http://support.microsoft.com/default.aspx?scid=kb;en-us;312897#3" target="_blank">This KB article</a> provides more info and also shows an alternate method to achieve the same results (**StrConv()**).