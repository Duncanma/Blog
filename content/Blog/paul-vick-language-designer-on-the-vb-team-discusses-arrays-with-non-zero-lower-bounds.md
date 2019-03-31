---
date: 2004-03-19T11:04:00+00:00
title: Paul Vick, Language Designer on the VB team, discusses arrays with non-zero lower bounds...
type: posts
---
One of the changes from VB6 to VB.NET was the removal of non-zero lower bounded arrays... a concept discussed by Eric Gunnerson [recently](http://blogs.msdn.com/ericgu/archive/2004/03/16/90724.aspx), and now covered by Paul... giving it a bit of VB perspective.

> **[Non-zero lower bounded arrays (the other side of the coin)](http://www.panopticoncentral.net/PermaLink.aspx/f519385b-45a1-4b48-b85f-681c273e1d24)**

>  _... To finesse this issue, the CLR designers came up with a compromise: there would be two kinds of arrays in the CLR. One kind, which I'll call "arrays," were just like normal VB arrays – they could have non-zero lower bounds. The other kind, which I'll call "vectors," were a restricted type of array: they could only be 1-dimensional, and their lower bound was fixed to be zero. This compromise allowed VB to have its arrays, and also allowed the C-derived languages to optimize the most common array case. Everyone was happy, right? ..._

<div class="media">
  [Listening to: Are You Gonna Be My Girl – [Jet](http://www.windowsmedia.com/mg/search.asp?srch=Jet) – Get Born (03:37)]
</div>
