---
date: 2004-12-09T18:05:00+00:00
title: Follow up to 'drawing rotated text'
type: posts
tags:
 - Coding
---
The same programmer who asked for [an example of rotated text](http://blogs.duncanmackenzie.net/duncanma/archive/2004/12/02/913.aspx) is back with another interesting request; how to partially fill a circle from the bottom up
as if it was a glass that you've poured water into... so here goes (this is only a snippet of the code, see [the original post ](http://blogs.duncanmackenzie.net/duncanma/archive/2004/12/02/913.aspx)for the rest);

```vb
    Protected Overrides Sub OnPaint( _
            ByVal e As System.Windows.Forms.PaintEventArgs)
        e.Graphics.Clear(Me.BackColor)
        Dim bounds As Rectangle
        Dim g As Graphics
        Dim rotation As Single = 0
        g = e.Graphics
        bounds = New Rectangle(50, 50, _
            Me.Width - 100, Me.Height - 100)
        Dim percentageToFill As Single = 0.75
        Dim fillArea As New Rectangle( _
            50, 50 + ((Me.Height - 100) * (1 - percentageToFill)), _
            Me.Width - 100, ((Me.Height - 100) * percentageToFill))
        Dim oldClip As Region = g.Clip
        g.SetClip(fillArea)
        g.FillEllipse(Brushes.Red, bounds)
        g.Clip = oldClip
        g.DrawEllipse(Pens.Black, bounds)
```

There is probably more than one way to do this, but my code just fills the whole circle, but sets the clip region first so that it only draws within the bounds of a certain rectangle...
