---
date: 2003-03-22T11:56:00+00:00
title: Macros in VS.NET
type: posts
---
I have to admit I haven't taken advantage of enough of VS.NET's capabilities... the ability to write macros alone should have resulted in a ton of useful little routines, but I have only written a few. One of the ones I use most often converts between a list of my internal member variables in a class...

<pre class="code"><font color="#000000">    <font color="#0000ff">Dim <font color="#000000">m_fred <font color="#0000ff">As String
    Dim <font color="#000000">m_counter <font color="#0000ff">As Integer

</pre>

to the bare-bones properties

<pre class="code"><font color="#000000">    <font color="#0000ff">Public Property <font color="#000000">fred() <font color="#0000ff">As String
        Get
            Return <font color="#000000">m_fred
        <font color="#0000ff">End Get
        Set<font color="#000000">(<font color="#0000ff">ByVal <font color="#000000">Value <font color="#0000ff">As String<font color="#000000">)
            m_fred = Value
        <font color="#0000ff">End Set
    End Property

    Public Property <font color="#000000">counter() <font color="#0000ff">As Integer
        Get
            Return <font color="#000000">m_counter
        <font color="#0000ff">End Get
        Set<font color="#000000">(<font color="#0000ff">ByVal <font color="#000000">Value <font color="#0000ff">As Integer<font color="#000000">)
            m_counter = Value
        <font color="#0000ff">End Set
    End Property

</pre>

It is dependent on my particular hungarian-ish (m_) naming style for internal variables and it doesn't deal well with arrays or variables that get instantiated in their declarations... but I find it a real timesaver to spit out that initial pass at the properties before I go in and add any validation or whatever else I was going to do... On the off chance that you might find it useful as well, or that you want to "finish it up", here is the source of the macro:

<pre class="code"><font color="#000000">
<font color="#0000ff">Sub <font color="#000000">ConvertProperties()
    DTE.UndoContext.Open("ConvertProperties")
    <font color="#0000ff">Try
        Dim <font color="#000000">txt <font color="#0000ff">As <font color="#000000">TextSelection
        txt = DTE.ActiveDocument.Selection

        <font color="#0000ff">Dim <font color="#000000">line, originalCode <font color="#0000ff">As String
        <font color="#000000">originalCode = txt.Text

        <font color="#0000ff">Dim <font color="#000000">lines() <font color="#0000ff">As String
        <font color="#000000">lines = Split(originalCode, vbLf)
        <font color="#0000ff">Dim <font color="#000000">variableName <font color="#0000ff">As String
        Dim <font color="#000000">publicName <font color="#0000ff">As String
        Dim <font color="#000000">dataType <font color="#0000ff">As String
        Dim <font color="#000000">propertyProcedure <font color="#0000ff">As String

        Dim <font color="#000000">r <font color="#0000ff">As <font color="#000000">Regex
        r = <font color="#0000ff">New <font color="#000000">Regex( _
        "(Dim|Private)\s*(?&lt;varname&gt;\S*)\s*As\s*(?&lt;typename&gt;\S*)", _
        RegexOptions.IgnoreCase <font color="#0000ff">Or <font color="#000000">RegexOptions.ExplicitCapture)

        <font color="#0000ff">For Each <font color="#000000">line <font color="#0000ff">In <font color="#000000">lines
            line = line.Trim
            <font color="#0000ff">If Not <font color="#000000">line = "" <font color="#0000ff">Then
                Dim <font color="#000000">mtch <font color="#0000ff">As <font color="#000000">Match
                mtch = r.Match(line)
                <font color="#0000ff">If <font color="#000000">mtch.Success <font color="#0000ff">Then
                    <font color="#000000">variableName = mtch.Groups("varname").Value.Trim
                    dataType = mtch.Groups("typename").Value.Trim
                    publicName = variableName.Substring(2)

                    propertyProcedure = _
                        <font color="#0000ff">String<font color="#000000">.Format("{0}Public Property {1} As {2}{0}" _
                            & "    Get{0}" _
                            & "        Return {3}{0}" _
                            & "    End Get{0}" _
                            & "    Set(ByVal Value As {2}){0}" _
                            & "        {3} = Value{0}" _
                            & "    End Set{0}" _
                            & "End Property", vbCrLf, publicName, _
                            dataType, variableName)

                    txt.Insert(vbCrLf & propertyProcedure, _
                        vsInsertFlags.vsInsertFlagsInsertAtEnd)
                <font color="#0000ff">End If

            End If
        Next
        <font color="#000000">txt.SmartFormat()
    <font color="#0000ff">Catch
        <font color="#008000">'don't do anything
        'but I don't want to see an error!
    <font color="#0000ff">End Try
    <font color="#000000">DTE.UndoContext.Close()
<font color="#0000ff">End Sub

</pre>

Anyone have some real cool/useful VS.NET macros?
