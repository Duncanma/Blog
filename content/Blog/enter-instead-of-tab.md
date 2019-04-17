---
date: 2004-12-13T19:07:00+00:00
title: Enter Instead of Tab
type: posts
---
I received another interesting, and common, question today about using Enter instead of (or in addition to) the Tab key to move the focus between fields on a form. Well, that isn't too hard to accomplish, but it can get tricky once you consider all the different situations...

First, the easy... set your Form's **KeyPreview** property to true, override **OnKeyUp** (or OnKeyDown... can't think of any real reason to use one or the other in this case), check for the Enter key, then call your Form's **ProcessTabKey** method.

```vb
    Protected Overrides Sub OnKeyUp(ByVal e As System.Windows.Forms.KeyEventArgs)
        If e.KeyCode = Keys.Enter Then
            e.Handled = True
            Me.ProcessTabKey(Not e.Shift)
        Else
            e.Handled = False
            MyBase.OnKeyUp(e)
        End If
    End Sub
```

Now... what is wrong with that code?

In the simple case, nothing... but I found a couple of issues with it.

  * If you have the **AcceptButton** property of your Form set, which means you have a default button on the Form, then your code will never get called... the key event is handled at some point farther up the chain
  * If you have multiline textboxes on your Form, the enter key will not work within them ... which means your users will not be able to create any new lines in those textboxes.

The first issue is easiest to solve if you just decide not to have a default button set on your form, because any other solution (such as overriding **ProcessDialogKey**) will stop the default button behaviour so that the enter key can be used for moving focus.

The second problem is not too difficult to handle, you can modify your code to check for certain properties of the TextBox control, but this may not work for other controls that also wish to accept the Enter key as input.

```vb
        If e.KeyCode = Keys.Enter Then
            If TypeOf Me.ActiveControl Is TextBox Then
                Dim tb As TextBox = DirectCast(Me.ActiveControl, TextBox)
                If tb.Multiline AndAlso tb.AcceptsReturn Then
                    e.Handled = False
                    MyBase.OnKeyUp(e)
                    Exit Sub
                End If
            End If
            e.Handled = True
            Me.ProcessTabKey(Not e.Shift)
        Else
            e.Handled = False
            MyBase.OnKeyUp(e)
        End If
```

Oh, and there was another part to the original question... what if I want to respond to the Enter key to do some processing on the value that was just entered. Well, for that result either with or without the 'enter instead of tab' code, you would just choose to handle the **KeyDown** event for the control in question.

```vb
    Private Sub TextBox2_KeyDown(ByVal sender As Object, _
            ByVal e As System.Windows.Forms.KeyEventArgs) _
            Handles TextBox2.KeyDown
        If e.KeyCode = Keys.Enter Then
            MsgBox("do something!")
        End If
    End Sub
```

Of course, after your code 'does something', the focus will also move to the next control... both sets of code, the Form's **OnKeyUp** routine and the control's **KeyDown** event handler, execute when the user hits Enter on this particular control.

I've gotten flack in the past for articles that discuss ['simple' topics](http://msdn.microsoft.com/library/default.asp?url=/library/en-us/dncodefun/html/code4fun07012004.asp), but I hope this is useful to some of the folks that find it 🙂
