---
date: 2004-03-03T02:36:00+00:00
title: Paul Vick on two new operators in VB Whidbey
type: posts
tags:
 - Coding
---
In [a recent post to his blog](http://www.panopticoncentral.net/PermaLink.aspx/086feb98-d3d3-4831-a1ba-e8f70c72dac1), Paul Vick discusses the new **IsNot** Operator (and the history/rational behind the **Is** operator), which allows you to write;

> `If myString IsNot Nothing Then`

instead of

> `If Not myString Is Nothing Then`

and then, [in another post](http://www.panopticoncentral.net/PermaLink.aspx/0d6ba439-8126-427e-952e-3f5fbba33904), he covers the new **TryCast** operator (which is like C#'s 'as' operator), which will allow you to save a bit of extra work (and produce a slight perf improvement in some situations) when checking to see if an object can be cast to a specific type .... allowing you to write;

```vb
Sub Print(ByVal o As Object)
    Dim PrintableObject As IPrintable _
        = TryCast(o, IPrintable)
    If PrintableObject IsNot Nothing Then
        PrintableObject.Print()
    End If
    ...
End Sub
```

instead of the slightly less efficient

```vb
Sub Print(ByVal o As Object)
    Dim PrintableObject As IPrintable
    If TypeOf o Is IPrintable Then
        PrintableObject = CType(o, IPrintable)
        PrintableObject.Print()
    End If
    ...
End Sub
```