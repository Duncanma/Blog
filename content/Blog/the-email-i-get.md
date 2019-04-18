---
date: 2004-08-23T11:53:00+00:00
title: The email I get...
type: posts
tags:
 - Coding
---
Every day I get from 1 to 10 emails asking me various VB questions... some I answer by pointing to a link, some by providing code, and sometimes I just point people to the newsgroups or forums that exist for this type of question... but this time I thought I'd just post the question and answer into my blog ...

The Question (edited slightly):

> I just want to ask how to make the string in to proper format..
> ex...
> input:
> gerald
>
> this must be the output:
> Gerald
>
> and i want it to interactively change when i'm inputing a string in a textbox..

And the answer is to put this code into the TextChanged event of your textbox;

```vb
Dim ci As Globalization.CultureInfo = _
    System.Threading.Thread.CurrentThread.CurrentCulture

Private Sub TextBox1_TextChanged(ByVal sender As System.Object, _
        ByVal e As System.EventArgs) Handles TextBox1.TextChanged
    Dim pos As Integer = TextBox1.SelectionStart
    TextBox1.Text = ci.TextInfo.ToTitleCase(TextBox1.Text)
    If pos &gt; 0 AndAlso pos &lt;= TextBox1.Text.Length Then
        TextBox1.SelectionStart = pos
    End If
End Sub
```

The key is that the **[CultureInfo](http://msdn.microsoft.com/library/en-us/cpref/html/frlrfSystemGlobalizationCultureInfoClassTopic.asp)** class provides a **[TextInfo](http://msdn.microsoft.com/library/default.asp?url=/library/en-us/cpref/html/frlrfsystemglobalizationtextinfoclasstopic.asp)** instance, which in turn has a method of `ToTitleCase` on it... [This KB article](http://support.microsoft.com/default.aspx?scid=kb;en-us;312897#3) provides more info and also shows an alternate method to achieve the same results (`StrConv()`).
