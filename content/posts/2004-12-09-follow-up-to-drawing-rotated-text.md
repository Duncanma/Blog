The same programmer who ask for <a href="http://blogs.duncanmackenzie.net/duncanma/archive/2004/12/02/913.aspx" target="_blank" class="broken_link">an example of rotated text</a> is back with another interesting request; how to partially fill a circle from the bottom up&#8230; 

![](http://msdn.microsoft.com/vbasic/art/compass_filled.png)

as if it was a glass that you&#8217;ve poured water into&#8230; so here goes (this is only a snippet of the code, see <a href="http://blogs.duncanmackenzie.net/duncanma/archive/2004/12/02/913.aspx" target="_blank" class="broken_link">the original post </a>for the rest);

<pre><font color="Blue" family="Microsoft Sans Serif">Protected</font> <font color="Blue" family="Microsoft Sans Serif">Overrides</font> <font color="Blue" family="Microsoft Sans Serif">Sub</font> OnPaint( _
            <font color="Blue" family="Microsoft Sans Serif">ByVal</font> e <font color="Blue" family="Microsoft Sans Serif">As</font> System.Windows.Forms.PaintEventArgs)
        e.Graphics.<font color="Blue" family="Microsoft Sans Serif">Clear</font>(<font color="Blue" family="Microsoft Sans Serif">Me</font>.BackColor)
        <font color="Blue" family="Microsoft Sans Serif">Dim</font> bounds <font color="Blue" family="Microsoft Sans Serif">As</font> Rectangle
        <font color="Blue" family="Microsoft Sans Serif">Dim</font> g <font color="Blue" family="Microsoft Sans Serif">As</font> Graphics
        <font color="Blue" family="Microsoft Sans Serif">Dim</font> rotation <font color="Blue" family="Microsoft Sans Serif">As</font> <font color="Blue" family="Microsoft Sans Serif">Single</font> = 0
        g = e.Graphics
        bounds = <font color="Blue" family="Microsoft Sans Serif">New</font> Rectangle(50, 50, _
            <font color="Blue" family="Microsoft Sans Serif">Me</font>.Width - 100, <font color="Blue" family="Microsoft Sans Serif">Me</font>.Height - 100)
        <font color="Blue" family="Microsoft Sans Serif">Dim</font> percentageToFill <font color="Blue" family="Microsoft Sans Serif">As</font> <font color="Blue" family="Microsoft Sans Serif">Single</font> = 0.75
        <font color="Blue" family="Microsoft Sans Serif">Dim</font> fillArea <font color="Blue" family="Microsoft Sans Serif">As</font> <font color="Blue" family="Microsoft Sans Serif">New</font> Rectangle( _
            50, 50 + ((<font color="Blue" family="Microsoft Sans Serif">Me</font>.Height - 100) * (1 - percentageToFill)), _
            <font color="Blue" family="Microsoft Sans Serif">Me</font>.Width - 100, ((<font color="Blue" family="Microsoft Sans Serif">Me</font>.Height - 100) * percentageToFill))
        <font color="Blue" family="Microsoft Sans Serif">Dim</font> oldClip <font color="Blue" family="Microsoft Sans Serif">As</font> Region = g.Clip
        g.SetClip(fillArea)
        g.FillEllipse(Brushes.Red, bounds)
        g.Clip = oldClip
        g.DrawEllipse(Pens.Black, bounds)


</pre>

There is probably more than one way to do this, but my code just fills the whole circle, but sets the clip region first so that it only draws within the bounds of a certain rectangle&#8230;