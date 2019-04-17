---
date: 2004-12-02T22:06:00+00:00
title: Drawing rotated text...
type: posts
---
A customer emailed me today (via the VB FAQ blog) with a question; "how can I output text at different angles, to write the cardinal points around a compass for example..." so I decided to fire up a quick sample

```vb
 Public Enum Direction As Integer
  N = 0
  NW = 1
  W = 2
  SW = 3
  S = 4
  SE = 5
  E = 6
  NE = 7
 End Enum
 Protected Overrides Sub OnPaint(ByVal e As System.Windows.Forms.PaintEventArgs)
  e.Graphics.Clear(Me.BackColor)
  Dim bounds As Rectangle
  Dim g As Graphics
  Dim rotation As Single = 0
  g = e.Graphics
  bounds = New Rectangle(50, 50, Me.Width - 100, Me.Height - 100)
  Dim rect As System.Drawing.RectangleF
  g.DrawEllipse(Pens.Black, bounds)
  Dim myMatrix As Drawing2D.Matrix
  Dim sf As New StringFormat(StringFormatFlags.NoWrap)
  sf.Alignment = StringAlignment.Center
  myMatrix = g.Transform()
  rect = New System.Drawing.RectangleF(bounds.X, bounds.Y, bounds.Width, bounds.Height)
  For i As Integer = 0 To 7
    If i > 0 Then
      myMatrix.RotateAt(45, New PointF(Me.Width / 2, Me.Height / 2), Drawing.Drawing2D.MatrixOrder.Append)
      g.Transform = myMatrix
    End If
    Dim directionString As String
    directionString = System.Enum.GetName(GetType(Direction), i)
    g.DrawString(directionString, New Font("Arial", 12, FontStyle.Bold), Brushes.Black, rect, sf)
  Next
 End Sub
 ```

If you want to try this code, create a new Windows Forms application in VS.NET 2003, and paste this code into your Form, after the "Windows Form Designer generated code" region.

The result will be an image like this: ![Output sample](http://msdn.microsoft.com/vbasic/art/compass.png)

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
