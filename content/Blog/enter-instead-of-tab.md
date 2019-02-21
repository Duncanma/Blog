I received another interesting, and common, question today about using Enter instead of (or in addition to) the Tab key to move the focus between fields on a form. Well, that isn't too hard to accomplish, but it can get tricky once you consider all the different situations...

First, the easy... set your Form's **KeyPreview** property to true, override **OnKeyUp** (or OnKeyDown... can't think of any real reason to use one or the other in this case), check for the Enter key, then call your Form's **ProcessTabKey** method.

<pre><font color="Blue" family="Microsoft Sans Serif">Protected <font color="Blue" family="Microsoft Sans Serif">Overrides <font color="Blue" family="Microsoft Sans Serif">Sub OnKeyUp(<font color="Blue" family="Microsoft Sans Serif">ByVal e <font color="Blue" family="Microsoft Sans Serif">As System.Windows.Forms.KeyEventArgs)
        <font color="Blue" family="Microsoft Sans Serif">If e.KeyCode = Keys.Enter <font color="Blue" family="Microsoft Sans Serif">Then
            e.Handled = <font color="Blue" family="Microsoft Sans Serif">True
            <font color="Blue" family="Microsoft Sans Serif">Me.ProcessTabKey(<font color="Blue" family="Microsoft Sans Serif">Not e.Shift)
        <font color="Blue" family="Microsoft Sans Serif">Else
            e.Handled = <font color="Blue" family="Microsoft Sans Serif">False
            <font color="Blue" family="Microsoft Sans Serif">MyBase.OnKeyUp(e)
        <font color="Blue" family="Microsoft Sans Serif">End <font color="Blue" family="Microsoft Sans Serif">If
    <font color="Blue" family="Microsoft Sans Serif">End <font color="Blue" family="Microsoft Sans Serif">Sub

</pre>

Now... what is wrong with that code?

In the simple case, nothing... but I found a couple of issues with it.

  * If you have the **AcceptButton** property of your Form set, which means you have a default button on the Form, then your code will never get called... the key event is handled at some point farther up the chain
  * If you have multiline textboxes on your Form, the enter key will not work within them ... which means your users will not be able to create any new lines in those textboxes.

The first issue is easiest to solve if you just decide not to have a default button set on your form, because any other solution (such as overriding **ProcessDialogKey**) will stop the default button behaviour so that the enter key can be used for moving focus.

The second problem is not too difficult to handle, you can modify your code to check for certain properties of the TextBox control, but this may not work for other controls that also wish to accept the Enter key as input.

<pre><font color="Blue" family="Microsoft Sans Serif">If e.KeyCode = Keys.Enter <font color="Blue" family="Microsoft Sans Serif">Then
            <font color="Blue" family="Microsoft Sans Serif">If <font color="Blue" family="Microsoft Sans Serif">TypeOf <font color="Blue" family="Microsoft Sans Serif">Me.ActiveControl <font color="Blue" family="Microsoft Sans Serif">Is TextBox <font color="Blue" family="Microsoft Sans Serif">Then
                <font color="Blue" family="Microsoft Sans Serif">Dim tb <font color="Blue" family="Microsoft Sans Serif">As TextBox = <font color="Blue" family="Microsoft Sans Serif">DirectCast(<font color="Blue" family="Microsoft Sans Serif">Me.ActiveControl, TextBox)
                <font color="Blue" family="Microsoft Sans Serif">If tb.Multiline <font color="Blue" family="Microsoft Sans Serif">AndAlso tb.AcceptsReturn <font color="Blue" family="Microsoft Sans Serif">Then
                    e.Handled = <font color="Blue" family="Microsoft Sans Serif">False
                    <font color="Blue" family="Microsoft Sans Serif">MyBase.OnKeyUp(e)
                    <font color="Blue" family="Microsoft Sans Serif">Exit <font color="Blue" family="Microsoft Sans Serif">Sub
                <font color="Blue" family="Microsoft Sans Serif">End <font color="Blue" family="Microsoft Sans Serif">If
            <font color="Blue" family="Microsoft Sans Serif">End <font color="Blue" family="Microsoft Sans Serif">If
            e.Handled = <font color="Blue" family="Microsoft Sans Serif">True
            <font color="Blue" family="Microsoft Sans Serif">Me.ProcessTabKey(<font color="Blue" family="Microsoft Sans Serif">Not e.Shift)
        <font color="Blue" family="Microsoft Sans Serif">Else
            e.Handled = <font color="Blue" family="Microsoft Sans Serif">False
            <font color="Blue" family="Microsoft Sans Serif">MyBase.OnKeyUp(e)
        <font color="Blue" family="Microsoft Sans Serif">End <font color="Blue" family="Microsoft Sans Serif">If

</pre>

Oh, and there was another part to the original question... what if I want to respond to the Enter key to do some processing on the value that was just entered. Well, for that result either with or without the &#8216;enter instead of tab' code, you would just choose to handle the **KeyDown** event for the control in question.

<pre><font color="Blue" family="Microsoft Sans Serif">Private <font color="Blue" family="Microsoft Sans Serif">Sub TextBox2_KeyDown(<font color="Blue" family="Microsoft Sans Serif">ByVal sender <font color="Blue" family="Microsoft Sans Serif">As <font color="Blue" family="Microsoft Sans Serif">Object, _
            <font color="Blue" family="Microsoft Sans Serif">ByVal e <font color="Blue" family="Microsoft Sans Serif">As System.Windows.Forms.KeyEventArgs) _
            <font color="Blue" family="Microsoft Sans Serif">Handles TextBox2.KeyDown
        <font color="Blue" family="Microsoft Sans Serif">If e.KeyCode = Keys.Enter <font color="Blue" family="Microsoft Sans Serif">Then
            <font color="Blue" family="Microsoft Sans Serif">MsgBox(<font color="Red" family="Microsoft Sans Serif">"do something!")
        <font color="Blue" family="Microsoft Sans Serif">End <font color="Blue" family="Microsoft Sans Serif">If
    <font color="Blue" family="Microsoft Sans Serif">End <font color="Blue" family="Microsoft Sans Serif">Sub
</pre>

Of course, after your code &#8216;does something', the focus will also move to the next control... both sets of code, the Form's **OnKeyUp** routine and the control's **KeyDown** event handler, execute when the user hits Enter on this particular control.

I've gotten flack in the past for articles that discuss [&#8216;simple' topics](http://msdn.microsoft.com/library/default.asp?url=/library/en-us/dncodefun/html/code4fun07012004.asp), but I hope this is useful to some of the folks that find it 🙂