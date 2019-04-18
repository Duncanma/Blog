---
date: 2005-04-14T16:00:00+00:00
title: Quick Windows Forms Control... a Label with a 3D Line...
type: posts
tags:
 - Coding
---
I was mocking up a UI yesterday, and I wanted to produce an interface that looked like Front Page's "New from Template" dialog...

![Front Page Template Dialog](/images/FrontPageTemplates.png)

But I couldn't easily replicate those little dividers (for Options, Description, Preview), so I created a "DividerLabel" with about 10 minutes of VB.NET code (2003)...

![Divider Label Sample](/images/DividerLabelSample.png)

And, if you are so inclined, you can set the text to nothing and you have a line!

![Hey Look, a Line!](/images/HeyLookYouCanMakeALine.png)

## The Code

```vb
Imports System.Drawing
Imports System.Windows.Forms

Public Class DividerLabel Inherits System.Windows.Forms.Label
    Dim m_spacing As Integer
    Dim m_borderStyle As Border3DStyle = Border3DStyle.Etched

    <System.ComponentModel.Category("Appearance")>
    Public Property LineStyle() As Border3DStyle
        Get
            Return m_borderStyle
        End Get

        Set(ByVal Value As Border3DStyle)
            If Value <> m_borderStyle Then
                m_borderStyle = Value Me.Invalidate()
            End If
        End Set
    End Property

    <System.ComponentModel.Category("Appearance")>
    Public Property Spacing() As Integer
        Get
            Return m_spacing
        End Get
        Set(ByVal Value As Integer)
            If Value <> m_spacing Then
                m_spacing = Value
                Me.Invalidate()
            End If
        End Set
    End Property

    Protected Overrides Sub OnPaint(ByVal e As PaintEventArgs)
        Dim g As Graphics = e.Graphics
        Dim f As Font = Me.Font
        Dim b As Brush = New SolidBrush(Me.ForeColor)
        Dim sf As StringFormat = StringFormat.GenericTypographic
        Dim labelBounds As New RectangleF(0, 0, Me.Width, Me.Height)
        Dim textSize As SizeF = g.MeasureString(Me.Text, f, Me.Width)
        g.DrawString(Me.Text, f, b, 0, 0, sf)
        If textSize.Width + Spacing < Me.Width Then
            Dim startingPoint As Point
            startingPoint.X = textSize.Width + Spacing
            startingPoint.Y = textSize.Height \ 2
            ControlPaint.DrawBorder3D(g, startingPoint.X, _ startingPoint.Y, _ Me.Width - startingPoint.X, _ 5, m_borderStyle, Border3DSide.Top)
        End If
    End Sub

    Public Sub New()
        Me.SetStyle(ControlStyles.DoubleBuffer, True)
        Me.SetStyle(ControlStyles.AllPaintingInWmPaint, True)
        Me.SetStyle(ControlStyles.ResizeRedraw, True)
    End Sub
End Class
```