---
date: 2003-03-12T21:09:00+00:00
title: IsNumeric, Microsoft.VisualBasic.dll, etc.
type: posts
---
Sean and Scott's

[

earlier posting

](http://radio.weblogs.com/0117167/2003/03/12.html#a178)

 on IsNumeric has resulted in a few comments... and I just need to chime in here, use Microsoft.VisualBasic! It is all IL in the end, right? This topic comes up over and over again on

[

GotDotNet

](http://www.gotdotnet.com)

, and I just want it to go away! Almost always, someone writes up and posts a C# implementation of IsNumeric that might be useful, but it is not equivalent to the function from this assembly. Why write your own, incorrect or incomplete, implementation when a highly-tested one is shipping with the Framework? Are you going to do the same for all of the functions in the Framework?

**Microsoft.VisualBasic.dll** is an assembly, it ships with .NET, it provides useful functions... the decision to use it or not shouldn't be any more difficult than deciding if you are going to use any other useful assembly. If you dig into the IL and you don't like what it does, fine... but I hope you are applying the same standard to all of the libraries you use.
