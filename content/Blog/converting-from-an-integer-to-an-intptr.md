---
date: 2005-03-04T06:05:00+00:00
title: Converting from an Integer to an IntPtr
type: posts
---
A friend of mine at work just asked me this VB question, and it is an interesting one to me because it isn't as simple as it seems...

> How do I cast from Integer to IntPtr?

In the end, I never really found an answer to that question, but I found out how to create a new IntPtr from an existing Integer and that seems close enough. You see, CType doesn't work because there isn't a defined conversion between the two types, and DirectCast only works with object references not value types like IntPtr. There isn't a System.Convert method for IntPtr to Int32... so what can you do? There is one option though, the constructor for IntPtr can accept an Int32 or a Int64 (Integer or Long in VB terms) and will assign the supplied value to the newly created IntPtr.

```vb
Dim x As IntPtr
Dim y As Integer = -1
x = New IntPtr(y)
```

I never asked why there was a need to cast from Integer to IntPtr, but I'm assuming it is for some scenario where a handle/pointer is normally supplied or returned but -1 is used to indicate a special case.

FYI, you can see [the official documentation for this specific constructor here on docs.microsoft.com](https://docs.microsoft.com/en-us/dotnet/api/system.intptr.-ctor).
