---
date: 2004-08-23T11:53:00+00:00
title: The email I get&#8230;
type: posts
---
Every day I get from 1 to 10 emails asking me various VB questions... some I answer by pointing to a link, some by providing code, and sometimes I just point people to the newsgroups or forums that exist for this type of question... but this time I thought I'd just post the question and answer into my blog ...

The Question (edited slightly):

> I just want to ask how to make the string in to proper format..

> ex...

> input.

> gerald
>
> this must be the output:

> Gerald
>
> and i want it to interactively change when i'm inputing a string in a textbox..

And the answer is to put this code into the TextChanged event of your textbox;

> <pre><font color="Blue" family="Microsoft Sans Serif">Dim ci <font color="Blue" family="Microsoft Sans Serif">As Globalization.CultureInfo = _
    System.Threading.Thread.CurrentThread.CurrentCulture

<font color="Blue" family="Microsoft Sans Serif">Private <font color="Blue" family="Microsoft Sans Serif">Sub TextBox1_TextChanged(<font color="Blue" family="Microsoft Sans Serif">ByVal sender <font color="Blue" family="Microsoft Sans Serif">As System.<font color="Blue" family="Microsoft Sans Serif">Object, _
        <font color="Blue" family="Microsoft Sans Serif">ByVal e <font color="Blue" family="Microsoft Sans Serif">As System.EventArgs) <font color="Blue" family="Microsoft Sans Serif">Handles TextBox1.TextChanged
    <font color="Blue" family="Microsoft Sans Serif">Dim pos <font color="Blue" family="Microsoft Sans Serif">As <font color="Blue" family="Microsoft Sans Serif">Integer = TextBox1.SelectionStart
    TextBox1.Text = ci.TextInfo.ToTitleCase(TextBox1.Text)
    <font color="Blue" family="Microsoft Sans Serif">If pos &gt; 0 <font color="Blue" family="Microsoft Sans Serif">AndAlso pos &lt;= TextBox1.Text.Length <font color="Blue" family="Microsoft Sans Serif">Then
        TextBox1.SelectionStart = pos
    <font color="Blue" family="Microsoft Sans Serif">End <font color="Blue" family="Microsoft Sans Serif">If
<font color="Blue" family="Microsoft Sans Serif">End <font color="Blue" family="Microsoft Sans Serif">Sub
</pre>

The key is that the **[CultureInfo](http://msdn.microsoft.com/library/en-us/cpref/html/frlrfSystemGlobalizationCultureInfoClassTopic.asp)** class provides a **[TextInfo](http://msdn.microsoft.com/library/default.asp?url=/library/en-us/cpref/html/frlrfsystemglobalizationtextinfoclasstopic.asp)** instance, which in turn has a method of "**ToTitleCase**" on it... [This KB article](http://support.microsoft.com/default.aspx?scid=kb;en-us;312897#3) provides more info and also shows an alternate method to achieve the same results (**StrConv()**).
