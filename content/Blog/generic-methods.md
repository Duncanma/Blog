---
date: 2004-03-20T10:18:00+00:00
title: Generic Methods...
type: posts
tags:
 - Coding
---
Someone suggested to me that VB.NET Whidbey didn't have support for 'Generic Methods', so I quickly wrote a bit of sample code to check (yes, it does support Generic Methods) and I thought I'd post that test code for your amusement.

```vb
Public Class GenericMethodSample
    Public Sub Swap(Of T)(ByRef i As T, ByRef j As T)
        Dim temp As T
        temp = j
        j = i
        i = temp
    End Sub
End Class

Public Class Sample

    Public Sub TestSwap()
        Dim i, j As Integer
        i = 3
        j = 12

        Debug.WriteLine(i)
        Debug.WriteLine(j)
        Debug.WriteLine("-------")

        Dim gm As New GenericMethodSample
        gm.Swap(Of Integer)(i, j)
        Debug.WriteLine(i)
        Debug.WriteLine(j)


    End Sub

End Class
```

If you need the 'blow-by-blow' explanation of that code... the key lines to notice are;

`Public Sub Swap(Of T)(ByRef i As T, ByRef j As T)`

Which declares a "Generic Method", which is then strongly typed at runtime via code like this;

`gm.Swap(Of Integer)(i, j)`

**[Update]**: [Paul Vick](http://www.panopticoncentral.net/) points out that (Of Integer) can be skipped on the call, making it just

`gm.Swap(i, j)`

because the compiler will infer the correct type argument.
