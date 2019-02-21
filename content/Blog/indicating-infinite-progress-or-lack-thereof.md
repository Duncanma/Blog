---
date: 2003-03-20T03:12:00+00:00
title: Indicating Infinite Progress, or lack thereof
type: posts
---
clovett

[

posted this sample

](http://www.gotdotnet.com/Community/UserSamples/Details.aspx?SampleGuid=d2bd8858-97c7-4a77-96eb-5d86d3b022d4)

 of a progress bar **that does not progress** to GDN at some point in the past and I had occasion to use it today. Using irrational coder logic, I decided that converting it to VB, so I could place it directly in my application, was faster than modifying his sample into a component...



<img alt="" hspace="0" src="http://www.duncanmackenzie.net/splash.jpg" align="baseline" border="0" />

Anyway, explanations aside; here is the code in VB

<pre class="code"><font color="#000000"><font color="#0000ff">Imports <font color="#000000">System
<font color="#0000ff">Imports <font color="#000000">System.Drawing
<font color="#0000ff">Imports <font color="#000000">System.Drawing.Drawing2D

<font color="#0000ff">Public Class <font color="#000000">InfiniteProgress
    <font color="#0000ff">Inherits <font color="#000000">System.Windows.Forms.Control
    <font color="#0000ff">Dim WithEvents <font color="#000000">tmr <font color="#0000ff">As <font color="#000000">Timer
    <font color="#0000ff">Dim <font color="#000000">m_Color1 <font color="#0000ff">As <font color="#000000">Color = Color.White
    <font color="#0000ff">Dim <font color="#000000">m_Color2 <font color="#0000ff">As <font color="#000000">Color = Color.Blue
    <font color="#0000ff">Dim <font color="#000000">m_Increment <font color="#0000ff">As Integer <font color="#000000">= 5

    &lt;ComponentModel.Category("Appearance")&gt; _
    <font color="#0000ff">Public Property <font color="#000000">Color1() <font color="#0000ff">As <font color="#000000">Color
        <font color="#0000ff">Get
            Return <font color="#000000">m_Color1
        <font color="#0000ff">End Get
        Set<font color="#000000">(<font color="#0000ff">ByVal <font color="#000000">Value <font color="#0000ff">As <font color="#000000">Color)
            m_Color1 = Value
        <font color="#0000ff">End Set
    End Property

    <font color="#000000">&lt;ComponentModel.Category("Appearance")&gt; _
    <font color="#0000ff">Public Property <font color="#000000">Color2() <font color="#0000ff">As <font color="#000000">Color
        <font color="#0000ff">Get
            Return <font color="#000000">m_Color2
        <font color="#0000ff">End Get
        Set<font color="#000000">(<font color="#0000ff">ByVal <font color="#000000">Value <font color="#0000ff">As <font color="#000000">Color)
            m_Color2 = Value
        <font color="#0000ff">End Set
    End Property

    <font color="#000000">&lt;ComponentModel.Category("Appearance")&gt; _
    <font color="#0000ff">Public Property <font color="#000000">Increment() <font color="#0000ff">As Integer
        Get
            Return <font color="#000000">m_Increment
        <font color="#0000ff">End Get
        Set<font color="#000000">(<font color="#0000ff">ByVal <font color="#000000">Value <font color="#0000ff">As Integer<font color="#000000">)
            m_Increment = Value
        <font color="#0000ff">End Set
    End Property

    Dim <font color="#000000">Position <font color="#0000ff">As Single <font color="#000000">= 0


    <font color="#0000ff">Public Sub New<font color="#000000">()
        <font color="#0000ff">Me<font color="#000000">.SetStyle(ControlStyles.DoubleBuffer, <font color="#0000ff">True<font color="#000000">)

    <font color="#0000ff">End Sub


    Protected Overrides Sub <font color="#000000">OnPaint( _
            <font color="#0000ff">ByVal <font color="#000000">e <font color="#0000ff">As <font color="#000000">System.Windows.Forms.PaintEventArgs)
        <font color="#0000ff">Dim <font color="#000000">b <font color="#0000ff">As New <font color="#000000">LinearGradientBrush( _
            <font color="#0000ff">Me<font color="#000000">.Bounds, <font color="#0000ff">Me<font color="#000000">.Color1, <font color="#0000ff">Me<font color="#000000">.Color2, _
            LinearGradientMode.Horizontal)
        b.WrapMode = Drawing.Drawing2D.WrapMode.TileFlipX
        b.TranslateTransform(Position, 0, MatrixOrder.Append)
        e.Graphics.FillRectangle(b, 0, 0, <font color="#0000ff">Me<font color="#000000">.Width, <font color="#0000ff">Me<font color="#000000">.Height)
        b.Dispose()
        <font color="#0000ff">MyBase<font color="#000000">.OnPaint(e)
    <font color="#0000ff">End Sub

    Private Sub <font color="#000000">tmr_Tick(<font color="#0000ff">ByVal <font color="#000000">sender <font color="#0000ff">As Object<font color="#000000">, _
            <font color="#0000ff">ByVal <font color="#000000">e <font color="#0000ff">As <font color="#000000">System.EventArgs) <font color="#0000ff">Handles <font color="#000000">tmr.Tick
        Position += m_Increment
        <font color="#0000ff">If <font color="#000000">Position &gt; <font color="#0000ff">Me<font color="#000000">.Width <font color="#0000ff">Then
            <font color="#000000">Position = -<font color="#0000ff">Me<font color="#000000">.Width
        <font color="#0000ff">End If
        Me<font color="#000000">.Invalidate()
    <font color="#0000ff">End Sub

    Protected Overrides Sub <font color="#000000">_
            OnVisibleChanged(<font color="#0000ff">ByVal <font color="#000000">e <font color="#0000ff">As <font color="#000000">System.EventArgs)
        <font color="#0000ff">If Me<font color="#000000">.Visible <font color="#0000ff">Then
            If <font color="#000000">tmr <font color="#0000ff">Is Nothing Then
                <font color="#000000">tmr = <font color="#0000ff">New <font color="#000000">Timer()
                tmr.Interval = 20
            <font color="#0000ff">End If
            <font color="#000000">tmr.Start()
        <font color="#0000ff">Else
            If Not <font color="#000000">tmr <font color="#0000ff">Is Nothing Then
                <font color="#000000">tmr.Stop()
            <font color="#0000ff">End If
        End If
        MyBase<font color="#000000">.OnVisibleChanged(e)
    <font color="#0000ff">End Sub
End Class
</pre>
