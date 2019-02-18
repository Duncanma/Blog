I received another interesting, and common, question today about using Enter instead of (or in addition to) the Tab key to move the focus between fields on a form. Well, that isn&#8217;t too hard to accomplish, but it can get tricky once you consider all the different situations&#8230;

First, the easy&#8230; set your Form&#8217;s **KeyPreview** property to true, override **OnKeyUp** (or OnKeyDown&#8230; can&#8217;t think of any real reason to use one or the other in this case), check for the Enter key, then call your Form&#8217;s **ProcessTabKey** method.

<pre><font color="Blue" family="Microsoft Sans Serif">Protected</font> <font color="Blue" family="Microsoft Sans Serif">Overrides</font> <font color="Blue" family="Microsoft Sans Serif">Sub</font> OnKeyUp(<font color="Blue" family="Microsoft Sans Serif">ByVal</font> e <font color="Blue" family="Microsoft Sans Serif">As</font> System.Windows.Forms.KeyEventArgs)
        <font color="Blue" family="Microsoft Sans Serif">If</font> e.KeyCode = Keys.Enter <font color="Blue" family="Microsoft Sans Serif">Then</font>
            e.Handled = <font color="Blue" family="Microsoft Sans Serif">True</font>
            <font color="Blue" family="Microsoft Sans Serif">Me</font>.ProcessTabKey(<font color="Blue" family="Microsoft Sans Serif">Not</font> e.Shift)
        <font color="Blue" family="Microsoft Sans Serif">Else</font>
            e.Handled = <font color="Blue" family="Microsoft Sans Serif">False</font>
            <font color="Blue" family="Microsoft Sans Serif">MyBase</font>.OnKeyUp(e)
        <font color="Blue" family="Microsoft Sans Serif">End</font> <font color="Blue" family="Microsoft Sans Serif">If</font>
    <font color="Blue" family="Microsoft Sans Serif">End</font> <font color="Blue" family="Microsoft Sans Serif">Sub</font>

</pre>

Now&#8230; what is wrong with that code?

In the simple case, nothing&#8230; but I found a couple of issues with it.

  * If you have the **AcceptButton** property of your Form set, which means you have a default button on the Form, then your code will never get called&#8230; the key event is handled at some point farther up the chain
  * If you have multiline textboxes on your Form, the enter key will not work within them &#8230; which means your users will not be able to create any new lines in those textboxes.

The first issue is easiest to solve if you just decide not to have a default button set on your form, because any other solution (such as overriding **ProcessDialogKey**) will stop the default button behaviour so that the enter key can be used for moving focus.

The second problem is not too difficult to handle, you can modify your code to check for certain properties of the TextBox control, but this may not work for other controls that also wish to accept the Enter key as input.

<pre><font color="Blue" family="Microsoft Sans Serif">If</font> e.KeyCode = Keys.Enter <font color="Blue" family="Microsoft Sans Serif">Then</font>
            <font color="Blue" family="Microsoft Sans Serif">If</font> <font color="Blue" family="Microsoft Sans Serif">TypeOf</font> <font color="Blue" family="Microsoft Sans Serif">Me</font>.ActiveControl <font color="Blue" family="Microsoft Sans Serif">Is</font> TextBox <font color="Blue" family="Microsoft Sans Serif">Then</font>
                <font color="Blue" family="Microsoft Sans Serif">Dim</font> tb <font color="Blue" family="Microsoft Sans Serif">As</font> TextBox = <font color="Blue" family="Microsoft Sans Serif">DirectCast</font>(<font color="Blue" family="Microsoft Sans Serif">Me</font>.ActiveControl, TextBox)
                <font color="Blue" family="Microsoft Sans Serif">If</font> tb.Multiline <font color="Blue" family="Microsoft Sans Serif">AndAlso</font> tb.AcceptsReturn <font color="Blue" family="Microsoft Sans Serif">Then</font>
                    e.Handled = <font color="Blue" family="Microsoft Sans Serif">False</font>
                    <font color="Blue" family="Microsoft Sans Serif">MyBase</font>.OnKeyUp(e)
                    <font color="Blue" family="Microsoft Sans Serif">Exit</font> <font color="Blue" family="Microsoft Sans Serif">Sub</font>
                <font color="Blue" family="Microsoft Sans Serif">End</font> <font color="Blue" family="Microsoft Sans Serif">If</font>
            <font color="Blue" family="Microsoft Sans Serif">End</font> <font color="Blue" family="Microsoft Sans Serif">If</font>
            e.Handled = <font color="Blue" family="Microsoft Sans Serif">True</font>
            <font color="Blue" family="Microsoft Sans Serif">Me</font>.ProcessTabKey(<font color="Blue" family="Microsoft Sans Serif">Not</font> e.Shift)
        <font color="Blue" family="Microsoft Sans Serif">Else</font>
            e.Handled = <font color="Blue" family="Microsoft Sans Serif">False</font>
            <font color="Blue" family="Microsoft Sans Serif">MyBase</font>.OnKeyUp(e)
        <font color="Blue" family="Microsoft Sans Serif">End</font> <font color="Blue" family="Microsoft Sans Serif">If</font>

</pre>

Oh, and there was another part to the original question&#8230; what if I want to respond to the Enter key to do some processing on the value that was just entered. Well, for that result either with or without the &#8216;enter instead of tab&#8217; code, you would just choose to handle the **KeyDown** event for the control in question.

<pre><font color="Blue" family="Microsoft Sans Serif">Private</font> <font color="Blue" family="Microsoft Sans Serif">Sub</font> TextBox2_KeyDown(<font color="Blue" family="Microsoft Sans Serif">ByVal</font> sender <font color="Blue" family="Microsoft Sans Serif">As</font> <font color="Blue" family="Microsoft Sans Serif">Object</font>, _
            <font color="Blue" family="Microsoft Sans Serif">ByVal</font> e <font color="Blue" family="Microsoft Sans Serif">As</font> System.Windows.Forms.KeyEventArgs) _
            <font color="Blue" family="Microsoft Sans Serif">Handles</font> TextBox2.KeyDown
        <font color="Blue" family="Microsoft Sans Serif">If</font> e.KeyCode = Keys.Enter <font color="Blue" family="Microsoft Sans Serif">Then</font>
            <font color="Blue" family="Microsoft Sans Serif">MsgBox</font>(<font color="Red" family="Microsoft Sans Serif">"do something!"</font>)
        <font color="Blue" family="Microsoft Sans Serif">End</font> <font color="Blue" family="Microsoft Sans Serif">If</font>
    <font color="Blue" family="Microsoft Sans Serif">End</font> <font color="Blue" family="Microsoft Sans Serif">Sub</font>
</pre>

Of course, after your code &#8216;does something&#8217;, the focus will also move to the next control&#8230; both sets of code, the Form&#8217;s **OnKeyUp** routine and the control&#8217;s **KeyDown** event handler, execute when the user hits Enter on this particular control.

I&#8217;ve gotten flack in the past for articles that discuss <a href="http://msdn.microsoft.com/library/default.asp?url=/library/en-us/dncodefun/html/code4fun07012004.asp" target="_blank">&#8216;simple&#8217; topics</a>, but I hope this is useful to some of the folks that find it 🙂