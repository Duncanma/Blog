---
date: 2004-12-09T18:05:00+00:00
title: Follow up to 'drawing rotated text'
type: posts
---
The same programmer who ask for [an example of rotated text](http://blogs.duncanmackenzie.net/duncanma/archive/2004/12/02/913.aspx) is back with another interesting request; how to partially fill a circle from the bottom up...

![](http://msdn.microsoft.com/vbasic/art/compass_filled.png)

as if it was a glass that you've poured water into... so here goes (this is only a snippet of the code, see [the original post ](http://blogs.duncanmackenzie.net/duncanma/archive/2004/12/02/913.aspx)for the rest);

<pre><font color="Blue" family="Microsoft Sans Serif">Protected <font color="Blue" family="Microsoft Sans Serif">Overrides <font color="Blue" family="Microsoft Sans Serif">Sub OnPaint( _
            <font color="Blue" family="Microsoft Sans Serif">ByVal e <font color="Blue" family="Microsoft Sans Serif">As System.Windows.Forms.PaintEventArgs)
        e.Graphics.<font color="Blue" family="Microsoft Sans Serif">Clear(<font color="Blue" family="Microsoft Sans Serif">Me.BackColor)
        <font color="Blue" family="Microsoft Sans Serif">Dim bounds <font color="Blue" family="Microsoft Sans Serif">As Rectangle
        <font color="Blue" family="Microsoft Sans Serif">Dim g <font color="Blue" family="Microsoft Sans Serif">As Graphics
        <font color="Blue" family="Microsoft Sans Serif">Dim rotation <font color="Blue" family="Microsoft Sans Serif">As <font color="Blue" family="Microsoft Sans Serif">Single = 0
        g = e.Graphics
        bounds = <font color="Blue" family="Microsoft Sans Serif">New Rectangle(50, 50, _
            <font color="Blue" family="Microsoft Sans Serif">Me.Width - 100, <font color="Blue" family="Microsoft Sans Serif">Me.Height - 100)
        <font color="Blue" family="Microsoft Sans Serif">Dim percentageToFill <font color="Blue" family="Microsoft Sans Serif">As <font color="Blue" family="Microsoft Sans Serif">Single = 0.75
        <font color="Blue" family="Microsoft Sans Serif">Dim fillArea <font color="Blue" family="Microsoft Sans Serif">As <font color="Blue" family="Microsoft Sans Serif">New Rectangle( _
            50, 50 + ((<font color="Blue" family="Microsoft Sans Serif">Me.Height - 100) * (1 - percentageToFill)), _
            <font color="Blue" family="Microsoft Sans Serif">Me.Width - 100, ((<font color="Blue" family="Microsoft Sans Serif">Me.Height - 100) * percentageToFill))
        <font color="Blue" family="Microsoft Sans Serif">Dim oldClip <font color="Blue" family="Microsoft Sans Serif">As Region = g.Clip
        g.SetClip(fillArea)
        g.FillEllipse(Brushes.Red, bounds)
        g.Clip = oldClip
        g.DrawEllipse(Pens.Black, bounds)


</pre>

There is probably more than one way to do this, but my code just fills the whole circle, but sets the clip region first so that it only draws within the bounds of a certain rectangle...
