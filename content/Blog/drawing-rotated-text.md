---
date: 2004-12-02T22:06:00+00:00
title: Drawing rotated text&#8230;
type: posts
---
A customer emailed me today (via the VB FAQ blog) with a question; "how can I output text at different angles, to write the cardinal points around a compass for example..." so I decided to fire up a quick sample

<pre><font color="blue" family="Microsoft Sans Serif">Public <font color="blue" family="Microsoft Sans Serif">Enum Direction <font color="blue" family="Microsoft Sans Serif">As <font color="blue" family="Microsoft Sans Serif">Integer  N = 0  NW = 1  W = 2  SW = 3  S = 4  SE = 5  E = 6  NE = 7 <font color="blue" family="Microsoft Sans Serif">End <font color="blue" family="Microsoft Sans Serif">Enum <font color="blue" family="Microsoft Sans Serif">Protected <font color="blue" family="Microsoft Sans Serif">Overrides <font color="blue" family="Microsoft Sans Serif">Sub OnPaint(<font color="blue" family="Microsoft Sans Serif">ByVal e <font color="blue" family="Microsoft Sans Serif">As System.Windows.Forms.PaintEventArgs)  e.Graphics.<font color="blue" family="Microsoft Sans Serif">Clear(<font color="blue" family="Microsoft Sans Serif">Me.BackColor)  <font color="blue" family="Microsoft Sans Serif">Dim bounds <font color="blue" family="Microsoft Sans Serif">As Rectangle  <font color="blue" family="Microsoft Sans Serif">Dim g <font color="blue" family="Microsoft Sans Serif">As Graphics  <font color="blue" family="Microsoft Sans Serif">Dim rotation <font color="blue" family="Microsoft Sans Serif">As <font color="blue" family="Microsoft Sans Serif">Single = 0  g = e.Graphics  bounds = <font color="blue" family="Microsoft Sans Serif">New Rectangle(50, 50, <font color="blue" family="Microsoft Sans Serif">Me.Width - 100, <font color="blue" family="Microsoft Sans Serif">Me.Height - 100)  <font color="blue" family="Microsoft Sans Serif">Dim rect <font color="blue" family="Microsoft Sans Serif">As System.Drawing.RectangleF  g.DrawEllipse(Pens.Black, bounds)  <font color="blue" family="Microsoft Sans Serif">Dim myMatrix <font color="blue" family="Microsoft Sans Serif">As Drawing2D.Matrix  <font color="blue" family="Microsoft Sans Serif">Dim sf <font color="blue" family="Microsoft Sans Serif">As <font color="blue" family="Microsoft Sans Serif">New StringFormat(StringFormatFlags.NoWrap)  sf.Alignment = StringAlignment.Center  myMatrix = g.Transform()  rect = <font color="blue" family="Microsoft Sans Serif">New System.Drawing.RectangleF(bounds.X, bounds.Y, bounds.Width, bounds.Height)  <font color="blue" family="Microsoft Sans Serif">For i <font color="blue" family="Microsoft Sans Serif">As <font color="blue" family="Microsoft Sans Serif">Integer = 0 <font color="blue" family="Microsoft Sans Serif">To 7    <font color="blue" family="Microsoft Sans Serif">If i &gt; 0 <font color="blue" family="Microsoft Sans Serif">Then      myMatrix.RotateAt(45, <font color="blue" family="Microsoft Sans Serif">New PointF(<font color="blue" family="Microsoft Sans Serif">Me.Width / 2, <font color="blue" family="Microsoft Sans Serif">Me.Height / 2), Drawing.Drawing2D.MatrixOrder.Append)      g.Transform = myMatrix    <font color="blue" family="Microsoft Sans Serif">End <font color="blue" family="Microsoft Sans Serif">If    <font color="blue" family="Microsoft Sans Serif">Dim directionString <font color="blue" family="Microsoft Sans Serif">As <font color="blue" family="Microsoft Sans Serif">String    directionString = System.<font color="blue" family="Microsoft Sans Serif">Enum.GetName(<font color="blue" family="Microsoft Sans Serif">GetType(Direction), i)    g.DrawString(directionString, <font color="blue" family="Microsoft Sans Serif">New Font(<font color="red" family="Microsoft Sans Serif">"Arial", 12, FontStyle.Bold), Brushes.Black, rect, sf)  <font color="blue" family="Microsoft Sans Serif">Next <font color="blue" family="Microsoft Sans Serif">End <font color="blue" family="Microsoft Sans Serif">Sub </pre>



If you want to try this code, create a new Windows Forms application in VS.NET 2003, and paste this code into your Form, after the "Windows Form Designer generated code" region.

The result will be an image like this: ![](http://msdn.microsoft.com/vbasic/art/compass.png)

If you are looking for more info on GDI+ drawing in VB.NET, I'd suggest [my article on the subject](http://msdn.microsoft.com/library/en-us/dndotnet/html/designsurface.asp) 🙂 and there is [a good book available from AW](http://www.amazon.com/exec/obidos/ASIN/0321160770/duncanmackenz-20?dev-t=mason-wrapper%26camp=2025%26link_code=xm2)

**Update:** Ugh... I messed up the directions... and didn't even notice (thanks Edward!!)

The enum should be

······· N = 0
······· NE = 1
········E = 2
······· SE = 3
······· S = 4
······· SW = 5
········W = 6
······· NW = 7
